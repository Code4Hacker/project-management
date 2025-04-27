import React from 'react'
import TopNav from '../components/top-nav/TopNav'

const GenerateReport = ({children}) => {
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
                    <h4><b>Generate Report</b></h4>
                    
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default GenerateReport