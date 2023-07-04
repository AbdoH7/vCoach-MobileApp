import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, TouchableOpacity } from 'react-native';
import {CountDown} from 'react-native-countdown-component';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import * as posedetection from '@tensorflow-models/pose-detection';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  cameraWithTensors,
} from '@tensorflow/tfjs-react-native';
import Svg, { Circle } from 'react-native-svg';
import { postGlobal,modelEndPoint } from '../../APIs';
// "expo-gl": "^11.4.0",
// "react-native-fs": "2.14.1" both of these needs to be added manually other than those different things in package.json in main app

// tslint:disable-next-line: variable-name
const TensorCamera = cameraWithTensors(Camera);

const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

// Camera preview size.
//
// From experiments, to render camera feed without distortion, 16:9 ratio
// should be used fo iOS devices and 4:3 ratio should be used for android
// devices.
//
// This might not cover all cases.
const CAM_PREVIEW_WIDTH = Dimensions.get('window').width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

// The score threshold for pose detection results.
const MIN_KEYPOINT_SCORE = 0.3;

// The size of the resized output from TensorCamera.
//
// For movenet, the size here doesn't matter too much because the model will
// preprocess the input (crop, resize, etc). For best result, use the size that
// doesn't distort the image.
const OUTPUT_TENSOR_WIDTH = 180;
const OUTPUT_TENSOR_HEIGHT = OUTPUT_TENSOR_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

// Whether to auto-render TensorCamera preview.
const AUTO_RENDER = false;

// Whether to load model from app bundle (true) or through network (false).
const LOAD_MODEL_FROM_BUNDLE = true;

export default function ModelScreen({navigation}) {
  const cameraRef = useRef(null);
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState();
  const [poses, setPoses] = useState();
  const [fps, setFps] = useState(0);
  const [orientation, setOrientation] = useState();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  // Use `useRef` so that changing it won't trigger a re-render.
  //
  // - null: unset (initial value).
  // - 0: animation frame/loop has been canceled.
  // - >0: animation frame has been scheduled.
  const rafId = useRef(null);

  useEffect(() => {
    async function prepare() {
      rafId.current = null;

      // Set initial orientation.
      const curOrientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(curOrientation);

      // Listens to orientation change.
      ScreenOrientation.addOrientationChangeListener((event) => {
        setOrientation(event.orientationInfo.orientation);
      });

      // Camera permission.
      await Camera.requestCameraPermissionsAsync();

      // Wait for tfjs to initialize the backend.
      await tf.ready();

      // Load movenet model.
      // https://github.com/tensorflow/tfjs-models/tree/master/pose-detection
      const movenetModelConfig = {
        modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        enableSmoothing: true,
      };
      const model = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        movenetModelConfig
      );
      setModel(model);

      // Ready!
      setTfReady(true);
    }

    prepare();
  }, []);

  useEffect(() => {
    // Called when the app is unmounted.
    return () => {
      if (rafId.current != null && rafId.current !== 0) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
  }, []);

  const handleCameraStream = async (
    images,
    updatePreview,
    gl
  ) => {
    const loop = async () => {
      // Get the tensor and run pose detection.
      const imageTensor = images.next().value;

      const startTs = Date.now();
      const poses = await model.estimatePoses(
        imageTensor,
        undefined,
        Date.now()
      );
      const latency = Date.now() - startTs;
      setFps(Math.floor(1000 / latency));
      setPoses(poses);
      tf.dispose([imageTensor]);

      if (rafId.current === 0) {
        return;
      }

      // Render camera preview manually when autorender=false.
      if (!AUTO_RENDER) {
        updatePreview();
        gl.endFrameEXP();
      }

      rafId.current = requestAnimationFrame(loop);
    };

    loop();
  };
  const [counter, setCounter] = React.useState(3);
  const [pushUpCount, setPushUpCount] = React.useState(0);
  const [flag,setFlag] = React.useState(0);
  const [stage,setStage] = React.useState('up');
  const [triggerStart,setTriggerStart] = React.useState(0);
  const [hideCounter,setHideCounter] = React.useState(0);
  const [hideText,setHideText] = React.useState(0);
  const showPushUpCount = () =>{
    setTriggerStart(1);
    setHideCounter(1);
    setHideText(1);
  }
  const calculate_angle = (A,B,C) =>{  
    const rad= Math.atan2(C.y-B.y,C.x-B.x)-Math.atan2(A.y-B.y,A.x-B.x)
    const angle = Math.abs(rad*180/Math.PI)
    if (angle > 180)
      return 360-angle
    return angle
  }
  const [completed,setComplete] = React.useState(true);
  const [results,setResults] = React.useState([1,2,3]);
  const [timer1, setTimer1] = React.useState(true);
  const [timer2, setTimer2] = React.useState(false);
  const [frames,setFrames] = React.useState({frames:[]});
  const renderPose = () => {
    if (poses != null && poses.length > 0) {
      // const lines = drawLines(poses[0])
      let RShoulder= poses[0].keypoints[6]
      let RElbow= poses[0].keypoints[8]
      let RWrist= poses[0].keypoints[10]
      let angle = calculate_angle(RShoulder,RElbow,RWrist)
      const keypoints = poses[0].keypoints
        .filter((k) => (k.score ?? 0) > MIN_KEYPOINT_SCORE)
        .map((k) => {
          // Flip horizontally on android or when using back camera on iOS.
          const flipX = IS_ANDROID || cameraType === Camera.Constants.Type.back;
          const x = flipX ? getOutputTensorWidth() - k.x : k.x;
          const y = k.y;
          const cx =
            (x / getOutputTensorWidth()) *
            (isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT);
          const cy =
            (y / getOutputTensorHeight()) *
            (isPortrait() ? CAM_PREVIEW_HEIGHT : CAM_PREVIEW_WIDTH);     
          return (
            <Circle
              key={`skeletonkp_${k.name}`}
              cx={cx}
              cy={cy}
              r='4'
              strokeWidth='2'
              fill='#00AA00'
              stroke='white'
            />
          );
        });
        if(triggerStart == 1 && pushUpCount < 10){
          if(timer1){
            setTimer1(false)
            T1 = setInterval(()=>{
            setFrames({frames:[...frames.frames,poses[0]]})
            setTimer2(true)
            },100)
          }
          if(timer2){
            setTimer2(false)
            clearInterval(T1)
            T2 = setInterval(()=>{
              setTimer1(true)
              clearInterval(T2)
            },100)
          }
          if (angle > 150 && flag == 1){
            setFlag(0)
            setStage('up')
            setPushUpCount(pushUpCount+1) 
          }
          if (angle < 130 && flag ==0){
            setFlag(1)
            setStage('down')
          }
          if (pushUpCount>=5){
            setTriggerStart(0)
            setPushUpCount(0);
            clearInterval(T1)
            clearInterval(T2)
            //here need to send the request to whatever the backend is
            postGlobal(modelEndPoint,frames)// need to store the response here
            setCompleted(true)
          }
        }
      return <Svg style={styles.svg}>{keypoints}{angle > 150 && triggerStart!= 1 ? 
        (hideCounter == 1 ? <View></View> : <CountDown style={{paddingTop:50}} until={counter} size={20} timeToShow={['S']} onFinish={()=> showPushUpCount()} />)
        : (hideText == 1 ? <View></View>:<Text style={{position:'absolute',paddingTop:10,marginLeft:"30%",fontSize:20,color:'red',fontWeight:'bold'}}>Not-Positioned</Text>)}</Svg>;
    } else {
      return <View>
      </View>;
    }
  };


  const renderFps = () => {
    return (
      <>
      <View style={styles.fpsContainer}>
        <Text>FPS: {fps}</Text>
      </View>
      {triggerStart == 1 ? 
      <View>
        <View style={styles.State}>
          <Text>State: {stage}</Text>
        </View>
        <View style={styles.CountPushUp}>
          <Text>Push-up Counts: {pushUpCount}</Text>
        </View>
      </View> : <View></View>}
      </>
    );
  };
  const isPortrait = () => {
    return (
      orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
      orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
    );
  };

  const getOutputTensorWidth = () => {
    // On iOS landscape mode, switch width and height of the output tensor to
    // get better result. Without this, the image stored in the output tensor
    // would be stretched too much.
    //
    // Same for getOutputTensorHeight below.
    return isPortrait() || IS_ANDROID
      ? OUTPUT_TENSOR_WIDTH
      : OUTPUT_TENSOR_HEIGHT;
  };

  const getOutputTensorHeight = () => {
    return isPortrait() || IS_ANDROID
      ? OUTPUT_TENSOR_HEIGHT
      : OUTPUT_TENSOR_WIDTH;
  };

  const getTextureRotationAngleInDegrees = () => {
    // On Android, the camera texture will rotate behind the scene as the phone
    // changes orientation, so we don't need to rotate it in TensorCamera.
    if (IS_ANDROID) {
      return 0;
    }

    // For iOS, the camera texture won't rotate automatically. Calculate the
    // rotation angles here which will be passed to TensorCamera to rotate it
    // internally.
    switch (orientation) {
      // Not supported on iOS as of 11/2021, but add it here just in case.
      case ScreenOrientation.Orientation.PORTRAIT_DOWN:
        return 180;
      case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
        return cameraType === Camera.Constants.Type.front ? 270 : 90;
      case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
        return cameraType === Camera.Constants.Type.front ? 90 : 270;
      default:
        return 0;
    }
  };
  const completeTraining = () => {
    return(
      <TouchableOpacity style={styles.completeBtn} onPress={()=>{navigation.navigate("ResultsScreen",{results:results})}}>
        <Text style={styles.title}>
          Complete Training
        </Text>
      </TouchableOpacity>
    )
  }
  if (!tfReady) {
    return (
      <View style={styles.loadingMsg}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      // Note that you don't need to specify `cameraTextureWidth` and
      // `cameraTextureHeight` prop in `TensorCamera` below.
      <View
        style={
          isPortrait() ? styles.containerPortrait : styles.containerLandscape
        }
      >
        <TensorCamera
          ref={cameraRef}
          style={styles.camera}
          autorender={AUTO_RENDER}
          type={cameraType}
          // tensor related props
          resizeWidth={getOutputTensorWidth()}
          resizeHeight={getOutputTensorHeight()}
          resizeDepth={3}
          rotation={getTextureRotationAngleInDegrees()}
          onReady={handleCameraStream}
        />
        {renderPose()}
        {renderFps()}
        {/* {renderCameraTypeSwitcher()} */}
        {completed && completeTraining()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title:{
    paddingTop:5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  completeBtn:{
    marginTop:10,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    borderRadius: 15,
    width:"50%",
    height:"7%",
    alignSelf: 'center',
  },
  containerPortrait: {
    position: 'relative',
    width: CAM_PREVIEW_WIDTH,
    height: CAM_PREVIEW_HEIGHT,
    marginTop: Dimensions.get('window').height / 2 - CAM_PREVIEW_HEIGHT / 2,
  },
  containerLandscape: {
    position: 'relative',
    width: CAM_PREVIEW_HEIGHT,
    height: CAM_PREVIEW_WIDTH,
    marginLeft: Dimensions.get('window').height / 2 - CAM_PREVIEW_HEIGHT / 2,
  },
  loadingMsg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  svg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 30,
  },
  fpsContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 80,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
  CountPushUp:{
    position: 'absolute',
    top: 60,
    left: 10,
    width: 80,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
  State:{
    position: 'absolute',
    top: 180,
    left: 10,
    width: 80,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
  cameraTypeSwitcher: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 180,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
});
