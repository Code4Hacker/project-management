import React, { useState } from 'react'
import TopNav from '../components/top-nav/TopNav'
import { ProgressBar } from 'react-bootstrap';
const TeamMembers = ({ children }) => {
    const [option, setOption] = useState("-- Choose a Leader --");
    return (
        <div className="assigning with-side-layout">
            <div className="">
                {children}
            </div>

            <div>
                <TopNav />
                <div className="main-page">
                    <div className="grid-flow" style={{
                        "--template": "auto"
                    }}>
                        <div className="grid-flow-item">
                            <br />
                            <h4><b>Team Leader Dashboard</b></h4><br />
                            <span>
                                Select Team Leader
                            </span>
                            <br />
                            <select name="" id="" value={option} onChange={(e) => setOption(e.target.value)}>
                                <option value="-- Choose a Leader --">-- Choose a Leader -- </option>
                                <option value="Alice Johnson">Alice Johnson </option>
                            </select>
                            <br />
                            <br />
                           { option === "-- Choose a Leader --"? <i className='gray-text text-small p-2'>Please select ateam leader to view their dashboard</i>:
                           "seven".split("").map((i, k) => <div className='progress-card' key={k}>
                            <span><b>Website Redesign</b></span><br />
                            <span>Status: In Progress</span>
                            <br />
                            <br />
                            <ProgressBar now={(k+1)*10}/>
                           </div>)
                           }
                            {/* <button className='btn-primary'>Assign Project</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamMembers