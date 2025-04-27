import React from 'react'
import TopNav from '../components/top-nav/TopNav'
import { Check, Files, Folder, Folder2, Folder2Open, Speedometer } from 'react-bootstrap-icons'
const ReviewApprove = ({ children }) => {
    return (
        <div className="reviews with-side-layout">
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
                            <h4><b>Review & Approve</b></h4>
                            <br />
                            <div className="flex">
                                <select name="" id="">
                                    <option value="">Filter by Project</option>
                                </select>
                                <select name="" id="">
                                    <option value="">Filter by Status</option>
                                </select>
                            </div>
                            <br />
                            {

                                [1, 2, 3, 5, 6, 7, 8].map((i, k) => <div className='review_card'>
                                    <h6><b>Website Redesign - Login Page</b></h6>
                                    <p className='gray-text'>
                                        <b>Submited By:</b> Alice Johnson <br />
                                        <b>Status:</b> Pending
                                    </p>
                                    <span>Comment</span> <br />
                                    <textarea name="" id="" placeholder='Enter project description'></textarea>
                                    <br />
                                    <div className="flex">
                                        <button className='btn-primary' style={{
                                            backgroundColor:"rgb(43 176 79)"
                                        }}>Approve</button>
                                        <button className='btn-primary' style={{
                                            backgroundColor:"rgb(225 61 79)"
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

export default ReviewApprove