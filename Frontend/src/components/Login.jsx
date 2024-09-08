import React, { useState } from 'react'
import "./Login.css"
import login_bg from "../assets/login_bg.png"
import login_bg_2 from "../assets/login_bg_2.png"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username,setusername]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const navigate=useNavigate();
    const [error,seterror]=useState('');
    const[success,setsuccess]=useState('');


    const handleToggle = () => {
        setIsLogin(!isLogin);
    };
    const handleLogin = async(e)=>{
        e.preventDefault()
        try {const response=await axios.post('http://localhost:8800/api/auth/login',{
            email,
            password
        });
        const data=response.data;
        localStorage.setItem('userdata',JSON.stringify(data));
        setsuccess('Successfully Login');
        navigate('/');
            
        } catch (error) {
            console.error(error);
            alert(error);
            seterror(error.response?.data?.message||'unable to login');
            
            
        }

    }
    const handleRegister=async(e)=>{

        e.preventDefault()
        try {const response=await axios.post('http://localhost:8800/api/auth/register',{
            username,
            email,
            password
        });
        setsuccess('Successfully Registered');
        navigate('/');
            
        } catch (error) {
            console.error(error);
            alert(error);
            seterror(error.response?.data?.message||'unable to register');
            
            
        }

    }

    return (
        <div className='main_login_div'>
            <img className="login_bg" src={login_bg}></img>
            <div className='login_box'>

                <div className='login_box_left' >
                    <img src={login_bg_2} className='login_bg_2'></img>

                </div>
                <div className='login_box_right'>
                    <div className='toggle_bar'>

                        <button onClick={handleToggle} className={isLogin ? 'active' : ''}>
                            Login
                        </button>
                        <button onClick={handleToggle} className={!isLogin ? 'active' : ''}>
                            Registration
                        </button>


                    </div>
                    {isLogin ? (
                        <>
                            <h1 className='wlc'>Welcome</h1>
                            <p className='pls'>Please login to your account</p>
                            <form>
                                <label for="email_id">Email</label>
                                <input type='email' id='email_id' onChange={(e)=>setemail(e.target.value)}></input>
                                <label for="pass_id">Password</label>
                                <input type='password' id='pass_id' onChange={(e)=>setpassword(e.target.value)}></input>
                                

                            </form>
                            <a href='#'>Forget Password?</a>
                            <button className='ok_btn' onClick={handleLogin}>Ok</button>
                        </>
                    ) : (
                        <>
                            <h1 className='wlc'>Register</h1>
                            <p className='pls'>Please create a new account</p>
                            <form>
                            <label for="username_id">Username</label>
                            <input type='text' id='username_id' onChange={(e)=>setusername(e.target.value)}></input>
                                <label for="email_id">Email</label>
                                <input type='email' id='email_id'  onChange={(e)=>setemail(e.target.value)}></input>
                                <label for="pass_id">Password</label>
                                <input type='password' id='pass_id' onChange={(e)=>setpassword(e.target.value)}></input>

                            </form>
                            <button className='reg_btn' onClick={handleRegister}>Register</button>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Login