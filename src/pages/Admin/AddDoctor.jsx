import React from 'react'
import assets from '../../assets/assets';

const AddDoctor = () => {
  return (
    <form>
        <p>Add Doctor</p>
        <div>
            <div>
                <label htmlFor=''>
                    <img src={assets.upload_area} alt=''/>
                </label>
                <input type='file' id="doc-img" hidden/>
                <p>Upload doctor<br /> picture</p>
            </div>
            <div>
                <div>
                    <div>
                       <label htmlFor='name'>Doctor Name</label>
                       <input type='text' id='name' name='name'  placeholder='Enter Name' required />
                    </div>

                    <div>
                       <label htmlFor='doctor-email'>Doctor Email</label>
                       <input type='email' id='doctor-email' name='doctor-email'  placeholder='Enter Email' required />
                    </div>

                    <div>
                       <label htmlFor='doctor-password'>Name</label>
                       <input type='password' id='doctor-password' name='doctor-password'  placeholder='Enter Password' required />
                    </div>

                    <div>
                       <label htmlFor='experience'>Experience</label>
                       <select name='experience' id='experience'>
                        <option value="1 year">1 year</option>
                        <option value="2 year">2 year</option>
                        <option value="3 year">3 year</option>
                        <option value="4 year">4 year</option>
                        <option value="5 year">5 year</option>
                        <option value="6 year">6 year</option>
                        <option value="7 year">7 year</option>
                        <option value="8 year">8 year</option>
                       </select>

                       <div>
                       <label htmlFor='doctor-fee'>Fees</label>
                       <input type='number' id='doctor-fee' name='doctor-fee'  placeholder='Enter fees' required />
                    </div>   
                    </div>

                    <div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default AddDoctor;