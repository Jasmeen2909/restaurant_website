import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import contact_bg from "../assets/contact_bg.png"
import "./Contact.css"


const Contact = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='contact_div'>
                <div className='contact_box'>
                    <div className='left_box'>
                        <h1 className='CU'>Contact Us</h1>
                        <p className='CP'>Feel free to share your reviews with us or contact us if you have any queries</p>
                        <form>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-field">
                                        <label htmlFor="first_name">First Name</label>
                                        <input type='text' id='first_name'></input>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="last_name">Last Name</label>
                                        <input type='text' id='last_name'></input>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div className="input-field">
                                        <label htmlFor="phone_no">Phone No</label>
                                        <input type='text' id='phone_no'></input>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="email_info">Email</label>
                                        <input type='email' id='email_info'></input>
                                    </div>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="cmt">Comment/Question</label>
                                    <input type='textarea' id='cmt'></input>
                                </div>
                                <button className='Contact_sub'>Submit</button>
                            </div>

                        </form>

                    </div>
                    <div className='right_box'>
                        {/* Right box content */}
                    </div>
                </div>
                <img className="contact_img" src={contact_bg}></img>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Contact;
