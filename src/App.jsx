import React, { useContext } from 'react'
import Login from './pages/login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
const App = () => {
  const {aToken} = useContext(AdminContext)
  return aToken?(
    <div>
      
      <ToastContainer/>
    </div>
  ):(
    <>
     <Login />
      <ToastContainer/>
    </>
  )
}

export default App;