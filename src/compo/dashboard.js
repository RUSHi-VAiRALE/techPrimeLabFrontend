

import React, { useState ,PureComponent} from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SideNav from "./sideNav";
import HeaderBg from "../drive-download-20240208T081504Z-001/Header-bg.svg"
import BackArrow from "../drive-download-20240208T081504Z-001/back arrow.svg"
import Logo from "../drive-download-20240208T081504Z-001/Logo.svg"
import { useEffect } from "react";
import axios from "axios";
import logoutImg from "../drive-download-20240208T081504Z-001/Logout.svg"


const DashBoard = () =>{

    
    const [data , setData] = useState([]);
    const [countData, setCountData] = useState([])

    

    const [dataDash , setDataDash] = useState([]);
    useEffect (()=>{
        axios.get("http://localhost:8000/dashBoardData")
        .then((res)=>{
            setCountData(res.data.CountData)
            setData(res.data.GraphData)
        })
    },[])


    return(
        <div className=".dashContainer">
        <div style={{"display":"flex"}}>
            <SideNav />
            <div style={{"width":"100%"}}>
                <img className="dashImg" src={HeaderBg} />
                <img className="logoutImg" src={logoutImg} />
                <img className="dashLogo" src={Logo} />
                <div className="createProjText"><span><img src={BackArrow}/></span>Dashboard</div>
                <div className="dashFlex">
                    {countData.map((info)=>{
                        return(
                            <div className="dashCont">
                                <div style={{"fontSize":"18px"}}>{info._id}</div>
                                <div style={{"fontSize":"30px","fontWeight":"bold"}}>{info.Status}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="chartCont">
                    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Closed" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
                </div>

            </div>
        </div>
    </div>
    )
}

export default DashBoard;