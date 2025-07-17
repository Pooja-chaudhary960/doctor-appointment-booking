import React from 'react'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-color-gary-500'>
        <p>About <span className='text-gray-600 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className="w-full md:max-w-[360px]" src="/Images/about_us.jpg" alt='about us images' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>CarePoint Hospital is committed to providing quality, affordable healthcare in a safe and caring environment.</p>
          <p>Our expert doctors and staff use modern technology to offer accurate diagnosis and personalized treatment. We focus on patient comfort, trust, and long-term health for individuals and families across all age groups.
          </p>
          <b className='text-gray-600'> Our Vision</b>
          <p>To be a trusted healthcare leader, delivering compassionate care with advanced medical excellence and promoting healthier communities.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'> CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-black-300 cursor-pointer '>
          <b>Experienced Doctors:</b>
          <p>Our skilled and certified doctors provide expert care across various specialties.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-black-300 cursor-pointer '>
           <b>Patient-Centered Care:</b>
          <p>We focus on your comfort, safety, and satisfaction at every step of treatment.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-black-300 cursor-pointer '>
          <b>Modern Facilities:</b>
          <p>Equipped with advanced medical technology for accurate diagnosis and effective treatment.</p>
        </div>
      </div>
    </div>
  )
}

export default About