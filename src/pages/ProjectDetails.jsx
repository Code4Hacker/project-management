import React, { useState, useEffect } from 'react';
import TopNav from '../components/top-nav/TopNav';
import { ProgressBar } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import axios from 'axios';
import useFetch from '../hooks/useFetch';

const ProjectDetails = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const { fetchData, loading } = useFetch();

    useEffect(() => {

        const fetchProjects = async () => {
            try {
    
                const { code, message, content } = await fetchData({
                    reqType: "get",
                    api: "/projects"
                });
                console.log(content);
                setProjects(content);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching projects:', err);
            }
        };
        fetchProjects();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="reviews with-side-layout">
            <div className="">
                {children}
            </div>

            <div>
                <TopNav />
                <div className="main-page">
                    <div className="grid-flow" style={{ "--template": "auto" }}>
                        <div className="grid-flow-item">
                            <br />
                            <h4><b>Project Details</b></h4>
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
                            <div className="project_grid header">
                                <div className="">
                                    <p><b>Project Title</b></p>
                                </div>
                                <div className="">
                                    <p><b>Status</b></p>
                                </div>
                                <div className="">
                                    <p><b>Team Leader</b></p>
                                </div>
                                <div className="">
                                    <p><b>Progress</b></p>
                                </div>
                                <div className="">
                                    <p><b>Action</b></p>
                                </div>
                            </div>
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;