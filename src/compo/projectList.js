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
import Stack from '@mui/material/Stack';
const limitPage = 8;
let newData = new Array();

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
    // const handleClick = (p) =>{
    //     console.log("uyuikjh")
    // }

    // const datemani = (dat) =>{
    //     let l = "" + String(dat);
    //     let a = l.split("-")
    //     let c = a[2]
    //     let d = ""+c[0]+c[1];
    //     return ""+arrayMonth[Number(a[1])]+'-'+d + ", " + a[0];
    // }

    // return(
    //                                 <tr key={info._id}>
    //                                     <td style={{"fontWeight":"bold"}}>{info.ProjectTheme}<div><span style={{"color":"grey","fontWeight":"lighter"}}>{datemani(info.StartDate)} to {datemani(info.EndDate)}</span></div></td>
    //                                     <td>{info.Reason}</td>
    //                                     <td>{info.Type}</td>
    //                                     <td>{info.Division}</td>
    //                                     <td>{info.Category}</td>
    //                                     <td>{info.Priority}</td>
    //                                     <td>{info.Department}</td>
    //                                     <td>{info.ProjectLoc}</td>
    //                                     <td style={{"color":"blue","fontWeight":"bold"}}>{info.Status}</td>
    //                                     <td>
    //                                         <div className="buttonContlist">
    //                                             <button onClick={handleClick(info._id)} className="buttonList">Start</button>
    //                                             <button onClick={handleClick(info._id)} className="buttonList">Close</button>
    //                                             <button onClick={handleClick(info._id)} className="buttonList">Cancel</button>
    //                                         </div>
    //                                     </td>
    //                                 </tr>
    //                             )


const ProjectList = () =>{

    const [data, setData] = useState([]);
    const [size, setSize] = useState();
    const [isUse, setUse] = useState(true)

    const arrayHeading = ["Project Name", "Reason", "Type", "Division", "Category", "Priority", "Dept.", "Location", "Status"];


    useEffect(()=>{
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
    },[isUse])

    const handlePagination = (e,p) =>{
        // console.log(p)
        // let startIndex = (p-1) * limitPage
        // let endIndex = p * limitPage
        // if(endIndex > data.length){
        //     endIndex = startIndex + ((data.length)%8)
        // }
        let startIndex = (p-1) * limitPage
        let endIndex = p * limitPage
        if(endIndex > newData.length){
            endIndex = startIndex + ((newData.length)%8)
        }   

        setData(newData.slice(startIndex,endIndex))
            // let s = res.data.length
            // let ss = Math.ceil(s/8)
            // setSize(ss)
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

    return (
        <div className="projListContainer" style={{"display":"flex"}}>
            <SideNav />
            <div style={{"width":"100%"}}>
                <img className="dashImg" src={HeaderBg} />
                <img className="logoutImg" src={LogoutImg} />
                <img className="dashLogo" src={Logo} />
                <div className="createProjText"><span><img src={BackArrow}/></span>Project Listing</div>
                <div className="createProjListCont">
                    <div className="listDiv1">
                        <input type="search" name="searchRes" placeholder="Search"/>
                        <div>
                            <span>Sort By: </span>
                            <select onChange={handleChange} name="sortBy" style={{"border":"none"}}>
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
                        <div style={{"display":"flex","justifyContent":"center"}}>
                        <Pagination  count={size} showFirstButton showLastButton onChange={handlePagination} color="primary" />
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProjectList;