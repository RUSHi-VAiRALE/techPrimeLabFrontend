import React from "react";
import { useState,useEffect } from "react";
import SideNav from "./sideNav";
import HeaderBg from "../drive-download-20240208T081504Z-001/Header-bg.svg"
import BackArrow from "../drive-download-20240208T081504Z-001/back arrow.svg"
import Logo from "../drive-download-20240208T081504Z-001/Logo.svg"
import axios from "axios";
import LogoutImg from "../drive-download-20240208T081504Z-001/Logout.svg"
import { useNavigate } from "react-router-dom";
import { error } from "highcharts";



const CreateProject = () =>{ 
    const [inputs, setInputs] = useState({
        projectTheme : "",
        Reason : "",
        Type : "",
        Division : "",
        Category : "",
        Priority : "",
        Department : "",
        projectLoc :""
    });
    const [isThemeError, setisThemeError] = useState(false)
    const [isError, setIsError] = useState(false)
    const [DateError, setDateError] = useState(false)
    const navigate = useNavigate();
    const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

    const optionArray = [
        {
            id : 1,
            optionHeading:"Reason",
            options : ["Business","Personal","Dealership","Transport"]
        },
        {
            id : 2,
            optionHeading:"Type",
            options : ["Internal","External","Vendor"]
        },
        {
            id : 3,
            optionHeading : "Division",
            options : ["Filters","Pumps","Compressor","Water Heater","Glass"]
        },
        {
            id : 4,
            optionHeading : "Category",
            options : ["Quality A","Quality B","Quality C","Quality D"]
        },
        {
            id : 5,
            optionHeading : "Priority",
            options : ["Low", "Medium", "High"]
        },
        {
            id : 6,
            optionHeading : "Department",
            options : ["Strategy", "Finance", "HR", "Quality", "Maintenance","Stores"]
        }
    ]

    const handleClick = () => {
        if(inputs.projectTheme === ""){
            setisThemeError(true)
        }
        else if(inputs.Category === "" || inputs.Division === "" || inputs.Department==="" || inputs.Reason==="" || inputs.projectLoc === "" || inputs.Priority===""|| inputs.projectLoc===""){
            setisThemeError(false)
            setIsError(true)
        }
        else if(inputs.endDate < inputs.startDate){
            setDateError(true)
        }
        else{
            console.log("first")
            axios.post("http://localhost:8000/createProject",inputs)
        .then((res)=>{
            console.log(res)
            navigate("/projectList")
        })
        .catch((error)=>{
            console.log(error)
        })
        }
    }

    const handleLogout = () =>{
        localStorage.clear()
        navigate("/")
    }

    useEffect(()=>{
        const user = localStorage.getItem("UserName");
        if(user === null){
            alert("Please Login first");
            navigate("/")
        }
    },[])

    return(
        <div style={{"display":"flex"}}>
            <div>
                <SideNav />
            </div>
            <div style={{"flex":"1"}}>
                <div className="creatProjContainer">
            <img className="dashImg" src={HeaderBg} />
            <img onClick={handleLogout} className="logoutImg" src={LogoutImg} />
                   <img className="dashLogo" src={Logo} />
               <div className="createProjText"><span><img src={BackArrow}/></span>Create Project</div>
            <div style={{"padding":"5px","width":"100%"}}>
                <div className="createProjInfoCont desktopProjInfo">
                <div className="desktopProjTheme mobileProjDiv">
                        <input style={(isThemeError)?{"border":"solid 1px red"}:null} onChange={handleChange} className="createTheme" name="projectTheme" type="text" placeholder="Enter Project Theme" />
                        
                        <button onClick={handleClick} className="saveButton isButtonVisUp">Save Project</button>
                </div>
                {(isThemeError)&&<p style={{"color":"red"}}>Project Theme required</p>}
                <div className="optionContainer">
                    {optionArray.map((opt)=>{
                                return(
                                <div className="mobileProjDiv" key={opt.id}>
                                    <label>{opt.optionHeading}</label>
                                        <select style={(isError)?{"border":"solid 1px red"}:null} onChange={handleChange} name={opt.optionHeading} className="createOption">
                                        <option selected>Choose...</option>
                                                {opt.options.map((op)=>{
                                                return(<option value={op}>{op}</option>)
                                                })}
                                        </select>
                                </div>
                                )
                            })}
                            <div className="mobileProjDiv">
                                <p>Start Date as per Project Plan</p>
                                <input style={(isError)?{"border":"solid 1px red"}:{"border":"solid 1px gray"}} onChange={handleChange}  className="createOption" type="date" name="startDate" />
                            </div>
                            <div className="mobileProjDiv">
                                <p>End Date as per Project Plan</p>
                                <input style={(isError)||(DateError)?{"border":"solid 1px red"}:{"border":"solid 1px gray"}} onChange={handleChange}className="createOption" type="date" name="endDate" />
                                {(DateError)&&<p style={{"color":"red"}}>end date must be greater than start date</p>}
                            </div>
                            <div className="mobileProjDiv" style={{"border":"none"}}>
                                <p><strong>Location</strong></p>
                                <select style={(isError)?{"border":"solid 1px red"}:null} onChange={handleChange} name="projectLoc" className="createOption">
                                    <option selected>Choose...</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Nashik">Nashik</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Nagpur">Nagpur</option>
                                    <option value="Delhi">Delhi</option>
                                </select>
                            </div>
                            <div className="statusCont">
                                Status : <strong>Registered</strong>
                            </div>
                            {/* <div className="createOption">

                            </div> */}
                            <button onClick={handleClick} className="saveButton isButtonVisDown">Save Project</button>
                            <div className="createOption">

                            </div>
                </div>
                
                </div>
            </div>
        </div>
            </div>
        </div>
    )
}

export default CreateProject;