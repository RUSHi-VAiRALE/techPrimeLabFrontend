import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
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
    const [validEmail, setValidEmail] = useState(false)
    const [isUserValid, setisUserValid] = useState(false);
    const navigate = useNavigate();
    const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputsLogin(values => ({...values, [name]: value}))

    }

    const handleClick = () =>{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(inputsLogin.email === "" || inputsLogin.password === ""){
            seterrorMsg(true)
        }
        else if(!regex.test(inputsLogin.email)){
            seterrorMsg(false)
            setisUserValid(false)
            setValidEmail(true);
        }
        else{
            axios.post("http://localhost:8000",inputsLogin)
            .then((res)=>{
                if(res.data === "invalid user" || res.data === "user does not exist"){
                    seterrorMsg(false)
                    setValidEmail(false)
                    setisUserValid(true)
                }
                else{
                    localStorage.setItem("UserName",inputsLogin.email)
                    navigate("/createProject")
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    useEffect (()=>{
        const user = localStorage.getItem("UserName");
        if(user !== null){
            navigate("/createProject")
            alert("Action not allowed")
        }
    },[])

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
                        <div>
                            <input onChange={handleChange} className={(errorMsg)?"inputDivError":"inputDiv"} name="email" type="email" />
                        </div>
                        {(errorMsg) && <p style={{"color":"red","position":"relative"}}>Email is required</p>}
                        {(validEmail) && <p style={{"color":"red","position":"relative"}}>Enter Valid Email</p>}
                    </div>
                    <div className="labelDiv">
                        <label className={(errorMsg)?"labelError":""}>Password</label>
                        <div>
                            <input onChange={handleChange} className={(errorMsg)?"inputDivError":"inputDiv"} name="password" type={(pass)?"password":""}/>
                            <img onClick={()=>{
                            setPass(!pass)
                        }} className="hidePassword" src={hidePassword} />
                        </div>
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