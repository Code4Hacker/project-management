import React from 'react'
import TopNav from '../../components/top-nav/TopNav'
const ViewResources = ({ children }) => {
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
                            <h4><b>Resources</b></h4>
                            <br />
                            {

                                [1, 2, 3, 5, 6, 7, 8].map((i, k) => <div className='review_card resources' key={k}>
                                    <div className="">
                                        <h4><b>Project Guidelines</b></h4>
                                        <p className='gray-text'>
                                            <b>Category:</b> Documantation <br />
                                            <b>Uploaded:</b> April 1, 2025
                                        </p>
                                    </div>

                                    <button className='btn-primary' style={{
                                        backgroundColor: "rgb(43 176 79)"
                                    }}>Download</button>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewResources