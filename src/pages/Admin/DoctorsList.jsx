import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors=[], aToken, getALlDoctors, changedAvailability} = useContext(AdminContext)

  useEffect(()=>{
    if(aToken && getALlDoctors){
      getALlDoctors()
    }
  },[aToken, getALlDoctors]);
   // Check if doctors array is empty or loading
  if (doctors.length === 0) {
    return <p>No doctors available or failed to load doctors.</p>;
  }
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll' >
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item)=>(
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={item._id}>
              <img className='bg-indigo-50 group-hover:bg-blue-500 transition-all duration-500 block' src={item.image} alt='Doctors images'/>

              <div className='p-4'>
                <p className='text-neutral-800'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
             
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={()=>changedAvailability(item._id)} type='checkbox' checked={item.available}/>
                <p>Available</p>
              </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default DoctorsList;