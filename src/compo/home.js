import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginBg from "../drive-download-20240208T081504Z-001/login-bg-1.svg"
import Logo from "../drive-download-20240208T081504Z-001/Logo.svg"
import axios from "axios";
import hidePassword from "../drive-download-20240208T081504Z-001/hide-password.svg"


const Home = () => {
    const [inputsLogin, setInputsLogin] = useState({
        email : "",
        password : ""
    });
    
    const [pass, setPass] = useState(true)
    const [errorMsg , seterrorMsg] = useState(false);
    const [isUserValid, setisUserValid] = useState(false);
    const navigate = useNavigate();
    const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputsLogin(values => ({...values, [name]: value}))

    }

    const handleClick = () =>{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(inputsLogin.email === "" || inputsLogin.password === "" || !regex.test(inputsLogin.email)){
            seterrorMsg(true)
        }
        else{
            axios.post("http://localhost:8000",inputsLogin)
            .then((res)=>{
                if(res.data === "invalid user" || res.data === "user does not exist"){
                    setisUserValid(true)
                }
                else{
                    navigate("/createProject")
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    return (
        <div className="homeDiv">
            <div className="loginImgCont">
                <img className="loginImg" src={LoginBg} />
            </div>
            
            <div className="homeGrid">
                <img className="logo" src={Logo}/>
                <div className="homeText">Online Project Management</div>
                <div className="loginDiv">
                    <div className="loginText">Login to get started</div>
                    <div className="labelDiv">
                        <label className={(errorMsg)?"labelError":""} >Email</label>
                        <input onChange={handleChange} className={(errorMsg)?"inputDivError":"inputDiv"} name="email" type="email" />
                        {(errorMsg) && <p style={{"color":"red","position":"relative"}}>Email is required</p>}
                    </div>
                    <div className="labelDiv">
                        <label className={(errorMsg)?"labelError":""}>Password</label>
                        <input onChange={handleChange} className={(errorMsg)?"inputDivError":"inputDiv"} name="password" type={(pass)?"password":""}></input> <img onClick={()=>{
                            setPass(!pass)
                        }} className="hidePassword" src={hidePassword} />
                        {(errorMsg)&& <p style={{"color":"red"}}>Password is required</p>}
                        <p style={{"display":"flex","flexDirection":"row-reverse","color":"#6B9ECE","fontSize":"13px","fontWeight":"bold"}}>Forgot Password?</p>
                    </div>
                    <button onClick={handleClick} className="loginButton">Login</button>
                    {(isUserValid)&&<p style={{"color":"red"}}>invalid user</p>}
                </div>
            </div>
            
        </div>
    )
}

export default Home;