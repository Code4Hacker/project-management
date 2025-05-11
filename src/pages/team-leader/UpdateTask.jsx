import React from 'react'
import TopNav from '../../components/top-nav/TopNav'
const UpdateTask = ({ children }) => {
    return (
        <div className="reviews with-side-layout">
            <div className="">
                {children}
            </div>

            <div>
                <TopNav />
                <div className="main-page update">
                    <h2><b>Update Task Status</b></h2>
                    <div className="grid-flow" style={{
                        "--template": "auto"
                    }}>
                        <div className="grid-flow-item">
                            <br />
                            <h4><b>Update Your Task Status</b></h4>
                            <br />
                            {

                                [1, 2, 3, 5, 6, 7, 8].map((i, k) => <div className='review_card' key={k}>
                                    <h4><b>HomePage Design</b></h4>
                                    <p className='gray-text'>
                                        <b>Category:</b> Documantation <br />
                                        <b>Uploaded:</b> April 1, 2025
                                    </p>
                                    <span>Comment</span> <br />
                                    <textarea name="" id="" placeholder='Enter project description'></textarea>
                                    <br />
                                    <div className="flex">
                                        <button className='btn-primary' style={{
                                            backgroundColor: "rgb(43 176 79)"
                                        }}>Approve</button>
                                        <button className='btn-primary' style={{
                                            backgroundColor: "rgb(225 61 79)"
                                        }}>Reject</button>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateTask