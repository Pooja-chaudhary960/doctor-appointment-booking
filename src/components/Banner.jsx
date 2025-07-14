import React from 'react'

const Banner = () => {
  return (
    <div className='flex bg-primar rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 '>
        {/* --Left Side --*/}
        <div>
            <div>
                <p>Book Appointment</p>
                <p>With 100+ Trusted Doctors</p>
            </div>
            <button>Create account</button>
        </div>
          {/* --Left Side --*/}
          <div>
            <img src="/Images/banner.jpg"/>
          </div>
    </div>
  )
}

export default Banner