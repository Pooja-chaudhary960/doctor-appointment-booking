import { createContext, useEffect, useState} from "react";
import axios from 'axios';
import {toast} from 'react-toastify';


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currencySymbol = 'Rs.'
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors,setDoctors] = useState([])
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):null);
  const [userData, setUserData]= useState(false)

   const getALlDoctorsData = async()=>{
    try{
      const {data} = await axios.get(backendUrl + '/api/doctor/list')
      if(data.success){
        setDoctors(data.doctors)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
   }

   const loadUserProfileData = async () =>{
    try{
      const { data } = await axios.get("http://localhost:4000/api/user/get-profile", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});


     if(data.success){
       setUserData(data.userData)
     }else{
      toast.error(data.message)
     }

    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
   }

   const value = { 
    doctors, getALlDoctorsData,
    currencySymbol,
    token,setToken,
    backendUrl,
    userData, setUserData,
    loadUserProfileData,
   }

   useEffect(()=>{
    getALlDoctorsData()
   },[])

   useEffect(()=>{
    if(token){
      loadUserProfileData()
    }else{
      setUserData(false)
    }
   })
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
