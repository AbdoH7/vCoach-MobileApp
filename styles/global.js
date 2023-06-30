// import { StyleSheet } from "react-native";
// export const global=StyleSheet.create({

// })
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flex:1,
        padding:4,
    },
    titleText:{
        color:'#333',
        fontSize:18,
    },
    text:{
        fontFamily: 'HelveticaNeue-ThinItalic',
        fontSize: 112,
        fontStyle: 'italic',
        fontWeight: '200',
        justifyContent:'center'
    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        padding:10,
        fontSize:18,
        borderRadius:6,
    },
    paragraph:{
        marginVertical:8,
    },
    image:{
        width:100,
        height:100,
    },
    defaultTextColor:{
        color: "#fff"
    },
    defaultBackgroundColor:{
        backgroundColor: "#1B1620"
    },
    defaultTextView:{
        width:'67%',
    },
    seperator:{
        zIndex:-1,
        height:1,
        backgroundColor: 'gray',
        marginBottom:35
    },
    endNoSeperator:{
        display:'none'
    },
    showSeperator:{
        borderBottomWidth:1,
        borderColor:'gray'
    },
    userNameText:{
        fontSize: 20,
    },
    helloText:{
        fontSize: 15,
        borderColor:'#FFF',
        borderWidth:1,
        display:'none'
    },
    userInfo:{
        // paddingLeft:10,
        paddingTop:25,
        // borderColor:'#FFF',
        // borderWidth:1,
        flexDirection:'row',
    },
    userInfoText:{
        // borderColor:'#FFF',
        // borderWidth:1,
        color:'white',
        width:'70%',
    },
    imageContainer:{
        // borderColor:'#FFF',
        // borderWidth:1,
        width:'25%',
        alignItems:'flex-end',
    },
    profileImage:{
        width:60,
        height:60,
        borderRadius:30
    },
    noPatientText:{
        fontSize:20,
        color:'white',
    },
    listTitles:{
        fontSize:20,
        color:'white',
        // marginLeft:10,
    }
});