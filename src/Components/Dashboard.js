import React from 'react'
import '../CSS/dashboard.css'
import DashboardSiderbar from './DashboardSiderbar'

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <DashboardSiderbar/>
        <div className='dashboard_content'>
            <h2>Dashboard</h2>
        </div>

    </div>
  )
}

export default Dashboard


