import React, { useState } from 'react'
import axios from "axios"

const PassImages = () => {
    const [passdata, setPassdata] = useState([]);

    const handleAudit = async (e) => {
        // const newData = [...data];
        // newData[index].status = status;
        // setData(newData);
        const passed=await axios.get("/audit");
        const passedData=passed.item
        setPassdata(passdata);
        
      
      };


  return (
    <div>
        {passdata}

    </div>
  )
}

export default PassImages