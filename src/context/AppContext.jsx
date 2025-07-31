import { createContext, useEffect, useState} from "react";
import axios from 'axios';
import {toast} from 'react-toastify';


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currencySymbol = 'Rs.'
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors,setDoctors] = useState([])
  const [token,setToken] = useState('')

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
    }
   }

   const value = { 
    doctors, 
    currencySymbol,
    token,setToken,
    backendUrl
   }

   useEffect(()=>{
    getALlDoctorsData()
   },[])
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
