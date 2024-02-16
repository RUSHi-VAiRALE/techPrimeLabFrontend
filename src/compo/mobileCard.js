import React from "react";
import axios from "axios";
const arrayMonth = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const MobileCard = (props) => {
    const handleClick = (e) =>{
        console.log(e.target.value)
        try {
            axios.put("http://localhost:8000/update/"+props.Id,{change:e.target.value})
            .then((res)=>{
                console.log(res.data)
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
        <div className="cardList">
                            <div style={{"margin":"3px"}} className="nameCont">
                                <div className="projName">{props.ProjectTheme}</div>
                                <div className="projStatus">{props.Status}</div>
                            </div>
                            <div style={{"margin":"3px"}}>
                                <span style={{"color":"grey","fontWeight":"lighter"}}>{datemani(props.StartDate)} to {datemani(props.EndDate)}</span>
                            </div>
                            <div style={{"margin":"3px"}} className="projField">
                                Reason : <span style={{"color":"black"}}>{props.Reason}</span>
                            </div>
                            <div style={{"margin":"3px"}} className="projField">
                                Type: <span style={{"color":"black"}}>{props.Type} .</span> <span className="projField">Category: <span style={{"color":"black"}}>{props.Category}</span></span>
                            </div>
                            <div style={{"margin":"3px"}} className="projField">
                                Div: <span style={{"color":"black"}}>{props.Division} .</span> <span className="projField">Dept: <span style={{"color":"black"}}>{props.Department}</span></span>
                            </div>
                            <div style={{"margin":"3px"}} className="projField">
                                Location : <span style={{"color":"black"}}>{props.ProjectLoc}</span>
                            </div>
                            <div style={{"margin":"3px"}} className="projField">
                                Priority : <span style={{"color":"black"}}>{props.Priority}</span>
                            </div>
                                <div style={{"margin":"3px"}} className="buttonContlist">
                                                <button onClick={handleClick} value="Running" style={{"backgroundColor":"#025AAB","color":"white"}} className="buttonList">Start</button>
                                                <button onClick={handleClick} value="Closed" className="buttonList">Close</button>
                                                <button onClick={handleClick} value="Cancelled" className="buttonList">Cancel</button>
                                            </div>
                        </div>
    )
}

export default MobileCard;