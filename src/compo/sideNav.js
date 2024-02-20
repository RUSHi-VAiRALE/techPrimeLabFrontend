import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import createPro from "../drive-download-20240208T081504Z-001/create-project.svg"
import createAct from "../drive-download-20240208T081504Z-001/create-project-active.svg"
import DashBoard from "../drive-download-20240208T081504Z-001/Dashboard.svg"
import DashBoardAct from "../drive-download-20240208T081504Z-001/Dashboard-active.svg"
import ProList from "../drive-download-20240208T081504Z-001/Project-list.svg"
import ProListAct from "../drive-download-20240208T081504Z-001/Project-list-active.svg"
import LogoutImg from "../drive-download-20240208T081504Z-001/Logout.svg";


const SideNav = () =>{
    const navigate = useNavigate()
    const [proList , setProList] = useState(ProList)
    const [dashBrd, setDashBrd] = useState(DashBoard)
    const [crtProj, setCrtProj] = useState(createPro)
    const handleLogout = () =>{
        localStorage.clear()
        navigate("/")
    }
    return(
        <div className="sideNavBar">
                <div className="iconContNav">
                    <img onClick={()=>{setProList(ProListAct);navigate("/projectList")}} src={proList} />
                    <img onClick={()=>{setDashBrd(DashBoardAct);navigate("/dashBoard")}} src={dashBrd} />
                    <img onClick={()=>{setCrtProj(createAct);navigate("/createProject")}} src={crtProj} />
                </div>
                <div className="logoutDesk">
                    <img onClick={handleLogout} src={LogoutImg} />
                </div>
            </div>
    )
}

export default SideNav;