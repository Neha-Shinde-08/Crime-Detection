import React from 'react'
import '../CSS/dashsiderow.css'

const DashSideRow = ({Sideicon,sidetitle}) => {
  return (
    <div className='DashSideRow'>
       
        <Sideicon className="dashsiderow_icon"  />
    <h3 className='dashsiderow_title'>{sidetitle}</h3>
    
    </div>
  )
}

export default DashSideRow