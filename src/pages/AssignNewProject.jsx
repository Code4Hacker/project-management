import React from 'react'
import TopNav from '../components/top-nav/TopNav'
const AssignNewProject = ({ children }) => {
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
                            <h4><b>Assign New Project</b></h4>
                            <br />
                            <span>
                                Project Title
                            </span>
                            <br />
                            <input type="text" placeholder='Enter project title' />
                            <br />
                            <br />
                            <span>
                                Description
                            </span>
                            <br />
                            <textarea name="" id="" placeholder='Enter project description' rows={4}></textarea>
                            <br />
                            <br />
                            <span>
                                Start Date
                            </span>
                            <br />
                            <input type="date" />
                            <br />
                            <br />
                            <span>
                                End Date
                            </span>
                            <br />
                            <input type="date" />
                            <br />
                            <br />
                            <span>
                                Assign Team Leader
                            </span>
                            <br />
                            <select name="" id="">
                                <option value="">High</option>
                            </select>
                            <br />
                            <br />
                            <button className='btn-primary'>Assign Project</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignNewProject