import React from 'react'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* ---- Left section----- */}
            <div>
                <p className='mb-2 text-xl'>CarePoint</p>
                <p className='w-full md:w-2/3 text-gray leading-6 '>Our hospital is committed to delivering compassionate, patient-centered care with advanced medical expertise. We strive to ensure every individual receives timely, respectful, and high-quality treatment for a healthier tomorrow.</p>
            </div>
            {/* ---- Center section----- */}
            <div>
                <p className='mb-2 text-xl'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            {/* ---- Right section----- */}
            <div>
                <p className='mb-2 text-xl'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+977 9822345678</li>
                    <li>healthcare@gmail.com</li>
                    <li>Kathmandu, Nepal</li>
                </ul>
            </div>
        </div>
        <div>
            {/* ---- CopyRight Text----- */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@  CarePoint - All Right Reserved.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer