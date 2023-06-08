import React,{createContext,useEffect,useState} from 'react';
import axios from 'axios';
import {LoginEndpoint,SignupEndpoint,UserFile,TokenFile} from '../APIs.js'
import * as FileSystem from 'expo-file-system';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isLoading,setIsLoading]=useState(false)
    const [userToken,setUserToken]=useState('')
    const [user,setUser]=useState({})
    const login = async (data) =>{
        setIsLoading(true)
        try{
            const response = await axios.post(`${LoginEndpoint}`,data)
            await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}${TokenFile}`,response.data.token)
            await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}${UserFile}`,JSON.stringify(response.data.user))
            setUserToken(response.data.token)
            setUser(response.data.user)
        } catch(err){
            console.log(`Login Error: ${err}`)
        }
        setIsLoading(false)
    }
    const logout = async () =>{
        setIsLoading(true)
        await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${TokenFile}`)
        await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${UserFile}`)
        setUserToken(null)
        setIsLoading(false)
    }
    const signup = async (data) =>{
        setIsLoading(true)
        try{
            const response = await axios.post(`${SignupEndpoint}`,data)
            await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}${TokenFile}`,response.data.token)
            await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}${UserFile}`,JSON.stringify(response.data.user))
            setUserToken(response.data.token)
            setUser(response.data.user)
        } catch(err){
            console.log(`Signup Error: ${err}`)
        }
        setIsLoading(false)
    }
    const isLoggedIn = async () =>{
        try{
            const directoryPath = FileSystem.documentDirectory
            const fileNames = await FileSystem.readDirectoryAsync(directoryPath)
            setIsLoading(true)
            if(fileNames.includes(TokenFile)){
                let getCurrentToken = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}${TokenFile}`)
                setUserToken(getCurrentToken)
            }
            setIsLoading(false)
        }
        catch(err){
            console.log(`LoggedIn Error: ${err}`);
        }
    }
    useEffect(()=>{
        isLoggedIn()
    },[])
    return(
        <AuthContext.Provider value={{login,logout,userToken,isLoading,signup}}>
            {children}
        </AuthContext.Provider>
    )
}
