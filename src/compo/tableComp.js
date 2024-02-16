import React, { useState } from "react";
import axios from "axios";
const arrayMonth = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


const TableCreate = (props) =>{

    const [Tp, setTp] =useState(true)

    const handleClick = (e) =>{
        console.log(e.target.value)
        try {
            axios.put("http://localhost:8000/update/"+props.Id,{change:e.target.value})
            .then((res)=>{
                console.log(res.data)
                setTp(!Tp)
            })
            .catch((err)=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const datemani = (dat) =>{
        let l = "" + String(dat);
        let a = l.split("-")
        let c = a[2]
        let d = ""+c[0]+c[1];
        return ""+arrayMonth[Number(a[1])]+'-'+d + ", " + a[0];
    }

    return(
                                    <tr key={props._id}>
                                        <td style={{"fontWeight":"bold"}}>{props.ProjectTheme}<div><span style={{"color":"grey","fontWeight":"lighter"}}>{datemani(props.StartDate)} to {datemani(props.EndDate)}</span></div></td>
                                        <td>{props.Reason}</td>
                                        <td>{props.Type}</td>
                                        <td>{props.Division}</td>
                                        <td>{props.Category}</td>
                                        <td>{props.Priority}</td>
                                        <td>{props.Department}</td>
                                        <td>{props.ProjectLoc}</td>
                                        <td style={{"fontWeight":"bold"}}>{props.Status}</td>
                                        <td>
                                            <div className="buttonContlist">
                                                <button onClick={handleClick} value="Running" style={{"backgroundColor":"#025AAB","color":"white"}} className="buttonList">Start</button>
                                                <button onClick={handleClick} value="Closed" className="buttonList">Close</button>
                                                <button onClick={handleClick} value="Cancelled" className="buttonList">Cancel</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
}

export default TableCreate