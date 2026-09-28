import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes";

export const register=(userData)=>async(dispatch)=>{
dispatch({type:REGISTER_REQUEST})

const baseUrl="http://localhost:5454"

try{
const respose=await axios.post(`${baseUrl}/auth/signup`,userData);
const user=respose.data;
console.log(user);

dispatch({type:REGISTER_SUCCESS,payload:user.jwt});
localStorage.setItem("jwt",user.jwt);
}catch(error){
dispatch({type:REGISTER_FAILURE,payload:error.message});
console.log(error);
}

};
    export const login=(userData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    
    const baseUrl="http://localhost:5454"
    
    try{
    const respose=await axios.post(`${baseUrl}/auth/signin`,userData.data);
    const user=respose.data;
    console.log(user);

    if(user.twoFactorAuthEnabled){
        return user;
    }
    
    dispatch({type:LOGIN_SUCCESS,payload:user.jwt});
    localStorage.setItem("jwt",user.jwt);
    userData.navigate("/")
    return user;
    }catch(error){
    dispatch({type:LOGIN_FAILURE,payload:error.message});
    console.log(error);
    }
};

export const verifyLoginOtp=({otp,id,navigate})=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    const baseUrl="http://localhost:5454"
    try {
        const response=await axios.post(`${baseUrl}/auth/two-factor/otp/${otp}?id=${id}`)
        localStorage.setItem("jwt",response.data.jwt)
        dispatch({type:LOGIN_SUCCESS,payload:response.data.jwt})
        navigate("/")
        return response.data
    } catch (error) {
        dispatch({type:LOGIN_FAILURE,payload:error.message})
        throw error
    }
}

export const getUser=(jwt)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    
    const baseUrl="http://localhost:5454"
    
    try{
    const respose=await axios.get(`${baseUrl}/api/users/profile`,
    {
        headers:{
            Authorization:`Bearer ${jwt}`
        }
    });

    const user=respose.data;
    console.log(user);
    
    dispatch({type:GET_USER_SUCCESS,payload:user})
    
    }catch(error){
    dispatch({type:GET_USER_FAILURE,payload:error.message});
    console.log(error);
    }
};
export const logout=()=>(dispatch)=>{
    localStorage.clear();
    dispatch({type:LOGOUT});
}
