import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ASSIGN_NEW_PROJECT, GENERATE_REPORT, HOME, PROJECT_DETAILS, REVIEW_AND_APPROVE, SIGN_IN, TEAM_LEADER_DASHBOARD, UPDATE_TASK, VIEW_RESOURCES } from '../constants/routes'
const SideBar = () => {
  let store  = window.localStorage.getItem("user");
  let role = "";
  if(store) role = (JSON.parse(store)).userType;

const menuList = role === "SUPER_ADMIN"?[
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
]: role === "MANAGER"?[
  {
    title:"Home",
    path:HOME
  },
  {
    title:"View Resources",
    path:VIEW_RESOURCES
  },
  {
    title:" Update Task Status",
    path:UPDATE_TASK
  },
  {
    title:"Request for Help or Clarification",
    path:PROJECT_DETAILS
  },
  {
    title:"View Project Timeline",
    path:GENERATE_REPORT
  },
  {
    title:"Submit a Completed Task",
    path:TEAM_LEADER_DASHBOARD
  },
]:[
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
];
  const nav = useNavigate();
  let [activeRoute, setActiveRoute ] = useState(HOME);
  let params = useLocation();

  useEffect(() => {
    setActiveRoute(params.pathname);
  })
  useEffect(() => {}, []);
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