import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ASSIGN_NEW_PROJECT, GENERATE_REPORT, HOME, PROJECT_DETAILS, REVIEW_AND_APPROVE, SIGN_IN, TEAM_LEADER_DASHBOARD } from '../constants/routes'
const menuList = [
  {
    title:"Home",
    path:HOME
  },
  {
    title:"Assign New Project",
    path:ASSIGN_NEW_PROJECT
  },
  {
    title:"Review and Approve",
    path:REVIEW_AND_APPROVE
  },
  {
    title:"Project Details",
    path:PROJECT_DETAILS
  },
  {
    title:"Generate Report",
    path:GENERATE_REPORT
  },
  {
    title:"Team Leader Dashboard",
    path:TEAM_LEADER_DASHBOARD
  },
]
const SideBar = () => {
  const nav = useNavigate();
  let [activeRoute, setActiveRoute ] = useState(HOME);
  let params = useLocation();

  useEffect(() => {
    setActiveRoute(params.pathname);
  })
  return (
    <div>
      <h2 className='title'>Project <br /> <span>Management System</span></h2>
      <p className='menu-i'>MENU</p>
      <ul>
        {
          menuList.map((item, key) => <li key={key} className={`${activeRoute === item.path && 'active'}`}><Link to={item.path}>{item.title}</Link></li>)
        }
      </ul>
      <button className='log-out' onClick={
        () => {
          window.localStorage.clear()
          nav(SIGN_IN)
        }
      }>Log Out</button>
    </div>
  )
}

export default SideBar