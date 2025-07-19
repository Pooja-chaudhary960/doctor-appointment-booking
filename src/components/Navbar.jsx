import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false)
    const [token, setToken] = useState(true)

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <img className="w-12 md:w-16" src="/Images/Hlogo.png" alt="Health logo" />
                <span className="text-lg md:text-2xl font-bold text-green-600">CarePoint</span>
            </div>

            <ul className='hidden md:flex items-start gap-5 '>
                <NavLink to='/'>
                    <li className='py-1 '>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1 '>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to="/about">
                    <li className='py-1 '>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1 '>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token ?
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-10 rounded-full' src={'/Images/profile.png'} />
                            <img className='w-3' src='/Images/dropdown.png' alt='Dropdown icon' />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>

                        : <button onClick={() => navigate('/login')} className='bg-primary text-white p-2 px-8 rounded-full font-light hidden md:block'>Create account</button>
                }
                <img onClick={() => setShowMenu(true)} className="w-10 md:hidden cursor-pointer" src="/Images/menu-icon.png" alt="" />

{/*----Mobile Menu----- */}
<div className={`fixed top-0 right-0 bottom-0 w-64 bg-white z-20 md:hidden shadow-lg transform transition-transform duration-300
  ${showMenu ? 'translate-x-0' : 'translate-x-full'}
`}>
  <div className="flex items-center justify-between p-4 border-b border-gray-300">
    <div className="flex items-center gap-2 cursor-pointer">
      <img className="w-10" src="/Images/Hlogo.png" alt="Health logo" />
      <span className="text-xl font-bold text-green-600">CarePoint</span>
    </div>
    <img onClick={() => setShowMenu(false)} className="w-6 cursor-pointer" src="/Images/cross-icon.png" alt="Close icon" />
  </div>

  <ul className="flex flex-col p-4 gap-4 text-gray-700 text-base font-medium">
    <NavLink to="/" onClick={() => setShowMenu(false)}><p>Home</p></NavLink>
    <NavLink to="/doctors" onClick={() => setShowMenu(false)}><p>All Doctors</p></NavLink>
    <NavLink to="/about" onClick={() => setShowMenu(false)}><p>About</p></NavLink>
    <NavLink to="/contact" onClick={() => setShowMenu(false)}><p>Contact</p></NavLink>
  </ul>
</div>

            </div>
        </div>
    )
}

export default Navbar