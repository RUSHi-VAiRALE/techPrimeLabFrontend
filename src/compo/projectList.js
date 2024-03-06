import React from "react";
import { useEffect,useState } from "react";
import SideNav from "./sideNav";
import HeaderBg from "../drive-download-20240208T081504Z-001/Header-bg.svg"
import BackArrow from "../drive-download-20240208T081504Z-001/back arrow.svg"
import Logo from "../drive-download-20240208T081504Z-001/Logo.svg"
import axios from "axios";
import TableCreate from "./tableComp";
import MobileCard from "./mobileCard";
import LogoutImg from "../drive-download-20240208T081504Z-001/Logout.svg";
import Pagination from '@mui/material/Pagination';
import { useNavigate } from "react-router-dom";
const limitPage = 8;
let newData = [];

const CreateTable = (info) => {

    return(
        <TableCreate 
            key = {info._id}
            Id = {info._id}
            ProjectTheme = {info.ProjectTheme}
            StartDate = {info.StartDate}
            EndDate = {info.EndDate}
            Reason = {info.Reason}
            Type = {info.Type}
            Division = {info.Division}
            Category = {info.Category}
            Priority = {info.Priority}
            Department = {info.Department}
            ProjectLoc = {info.ProjectLoc}
            Status = {info.Status}
        />
    )
    }

const CreateCard = (info) => {

    return(
        <MobileCard 
            key = {info._id}
            Id = {info._id}
            ProjectTheme = {info.ProjectTheme}
            StartDate = {info.StartDate}
            EndDate = {info.EndDate}
            Reason = {info.Reason}
            Type = {info.Type}
            Division = {info.Division}
            Category = {info.Category}
            Priority = {info.Priority}
            Department = {info.Department}
            ProjectLoc = {info.ProjectLoc}
            Status = {info.Status}
        />
    )
    }


const ProjectList = () =>{

    const [data, setData] = useState([]);
    const [size, setSize] = useState();
    const navigate = useNavigate()

    const arrayHeading = ["Project Name", "Reason", "Type", "Division", "Category", "Priority", "Dept.", "Location", "Status"];


    useEffect(()=>{
        const user = localStorage.getItem("UserName");
        if(user === null){
            alert("Please Login first");
            navigate("/")
        }else{
        axios.get("http://localhost:8000/getProject")
        .then((res)=>{
            let endIndex = 8;
            const demo = res.data
            newData = demo
            if(limitPage > demo.length){
                endIndex = demo.length
            }
            setData(demo.slice(0,endIndex))
            let s = res.data.length
            let ss = Math.ceil(s/8)
            setSize(ss)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    },[])

    const handlePagination = (e,p) =>{
        let startIndex = (p-1) * limitPage
        let endIndex = p * limitPage
        if(endIndex > newData.length){
            endIndex = startIndex + ((newData.length)%8)
        }   

        setData(newData.slice(startIndex,endIndex))
    }

    const handleChange = async(e) =>{
        axios.get("http://localhost:8000/sort/"+e.target.value)
        .then((res)=>{
            let endIndex = 8;
            const demo = res.data
            newData = demo
            if(limitPage > demo.length){
                endIndex = demo.length
            }
            setData(demo.slice(0,endIndex))
            let len = res.data.length
            let ss = Math.ceil(len/8)
            setSize(ss)
        })

    }


    const handleChangeSearch = (e) =>{
        const tmp = filterArray(newData,e.target.value)
        let endIndex = 8;
            // const demo = res.data
            // newData = demo
            if(limitPage > tmp.length){
                endIndex = tmp.length
            }
            setData(tmp.slice(0,endIndex))
            let len = tmp.length
            let ss = Math.ceil(len/8)
            setSize(ss)
    }

    function filterArray(arr,query){
        return arr.filter((el) => el.ProjectTheme.toLowerCase().includes(query.toLowerCase()) || el.Priority.toLowerCase().includes(query.toLowerCase()) || el.Type.toLowerCase().includes(query.toLowerCase()) || el.Division.toLowerCase().includes(query.toLowerCase()) || el.Department.toLowerCase().includes(query.toLowerCase()) || el.ProjectLoc.toLowerCase().includes(query.toLowerCase()) || el.Reason.toLowerCase().includes(query.toLowerCase()) || el.Category.toLowerCase().includes(query.toLowerCase())||el.Status.toLowerCase().includes(query.toLowerCase()));
    }

    const handleLogout = () =>{
        localStorage.clear()
        navigate("/")
    }

    return (
        <div className="projListContainer" style={{"display":"flex"}}>
            <SideNav />
            <div style={{"width":"100%"}}>
                <img className="dashImg" src={HeaderBg} alt="HeaderBg"/>
                <img onClick={handleLogout} className="logoutImg" src={LogoutImg} alt="LogoutImg"/>
                <img className="dashLogo" src={Logo} alt="Logo"/>
                <div className="createProjText"><span><img src={BackArrow} alt="BackArrow"/></span>Project Listing</div>
                <div className="createProjListCont">
                    <div className="listDiv1">
                            <input className="searchBox" onChange={handleChangeSearch} type="search" name="searchRes" placeholder="Search"/>
                        <div>
                            <span>Sort By: </span>
                            <select className="sortBy" onChange={handleChange} name="sortBy" style={{"border":"none"}}>
                                <option value="Priority">Priority</option>
                                <option value="Category">Category</option>
                                <option value="Reason">Reason</option>
                                <option value="Division">Division</option>
                                <option value="Department">Department</option>
                                <option value="Location">Location</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="cardContainer">
                            {data.map(CreateCard)}
                            <div style={{"display":"flex","justifyContent":"center","marginBottom":"10px","marginTop":"10px"}}>
                        <Pagination  count={size} showFirstButton showLastButton onChange={handlePagination} color="primary" />
                    </div>
                        </div>
                        
                        <table>
                            <tr style={{"backgroundColor":"#EBF5FF","height":"40px"}}>
                                {arrayHeading.map((data)=>{
                                    return(
                                        <th>{data}</th>
                                    )
                                })}
                                <th></th>
                            </tr>
                            {data.map(CreateTable)}
                        </table>
                        <div className="pagiDiv" style={{"display":"flex","justifyContent":"center","marginBottom":"10px","marginTop":"10px"}}>
                        <Pagination  count={size} showFirstButton showLastButton onChange={handlePagination} color="primary" />
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProjectList;