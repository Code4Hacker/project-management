import React from 'react'
import TopNav from '../components/top-nav/TopNav'
import { Check, Files, Folder, Folder2, Folder2Open, Speedometer } from 'react-bootstrap-icons'
import ApexChart from '../components/ProjectGraph'

const summaryList = [
    {
      title:"Active Projects",
      counts:12,
      icon: <Folder2Open />,
      color: "royalblue",
      path:"/"
    },
    {
      title:"Pending Approval",
      counts:3,
      icon: <Speedometer />,
      color: "red",
      path:"/"
    },
    {
      title:"Completed Projects",
      counts:18,
      icon: <Check />,
      color: "green",
      path:"/"
    },
  ]
  const meetingSummary = [
    {
      title:"All-Hands Meeting",
      date:"24th June 2025",
      time: "12:34AM",
      status: "completed",
    },
    {
      title:"All-Hands Meeting",
      date:"24th June 2025",
      time: "11:34AM",
      status: "completed",
    },
    {
      title:"Project Kickoff",
      date:"24th June 2025",
      time: "10:34AM",
      status: "postponed",
    },
    {
      title:"Client Review",
      date:"24th June 2025",
      time: "10:34AM",
      status: "cancelled",
    },
    {
      title:"Analysis Meeting",
      date:"24th June 2025",
      time: "09:44AM",
      status: "completed",
    },
    ]
const Dashboard = ({ children }) => {
    return (
        <div className="homepage with-side-layout">
            <div className="">
                {children}
            </div>

            <div>
                <TopNav />
                <div className="main-page">
                    <h1 className='pb-3'>Home</h1>
                    <div className="flex_summary">
                        {
                            summaryList.map((i,k) => <div key={k} className='card-summary'>
                                <div className='circle' style={{
                                    backgroundColor:i.color
                                }}>
                                    {i.icon}
                                </div>
                                <div className="">
                                    <span>{i.title}</span>
                                    <h2>{i.counts}</h2>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className="grid-flow" style={{
                        "--template":"auto 35%"
                    }}>
                        <div className="grid-flow-item">
                            <h5>Project Overview</h5>
                            <ApexChart/>
                        </div>
                        <div className="grid-flow-item">
                            
                        <h5>Timeline Schedules</h5>
                        <div className="timeline">
                            {
                                meetingSummary.map((i, k) => <div className='flex-flow-two'>
                                    <div className="dot" style={{
                                        "--color": i.status === "completed" ? "royalblue" : i.status === "cancelled" ? "red" : "yellow"
                                    }}></div>

                                    <div className="">
                                        <span>{i.title}</span>
                                        <div className="flex">

                                        <span>{i.date}</span>
                                        <span>{i.time}</span>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard