import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

const ProjectCard = ({ project }) => {
    const [show, setShow] = useState(false);
    
    const progress = project.days_until_deadline 
        ? Math.max(0, 100 - (project.days_until_deadline / 30 * 100)) 
        : Math.random(90, 900);
        console.log(project)
    const formatDate = (dateString) => {
        if (!dateString) return 'No deadline';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div className="project_grid item">
            <div className="">
                <p>{project.name || 'Untitled Project'}</p>
            </div>
            <div className="">
                <p>{project.status_display || project.status || 'No status'}</p>
            </div>
            <div className="">
                <p>{project.team_lead_id != null ? project.team_lead_id?.firstName + " " + project.team_lead_id?.lastName : 'No team leader'}</p>
            </div>
            <div className="">
                <ProgressBar 
                    now={progress} 
                    className='progress' 
                    label={`${Math.round(progress)}%`}
                    variant={
                        progress > 70 ? 'success' :
                        progress > 30 ? 'warning' : 'danger'
                    }
                />
            </div>
            <div className="">
                <button 
                    className='btn-primary' 
                    style={{
                        backgroundColor: !show ? "var(--blue-color)" : "gray",
                        padding: "8px",
                        marginBottom: "8px"
                    }} 
                    onClick={() => setShow(show ? false : true)}
                >
                    {show ? "Collapse View" : "View Details"}
                </button>
            </div> 
            
            {show && (
                <div className="full-details">
                    <p><b>Project:</b> {project.name || 'Untitled Project'}</p>
                    <p><b>Deadline:</b> {formatDate(project.deadline)}</p>
                    <p><b>Description:</b> {project.description || 'No description available'}</p>
                    
                    <p><b>Status Details:</b></p>
                    <ul>
                        <li>Priority: {project.priority_display || project.priority || 'Not specified'}</li>
                        <li>Start Date: {formatDate(project.start_date)}</li>
                        <li>End Date: {formatDate(project.end_date)}</li>
                        <li>Days Remaining: {project.days_until_deadline || 'N/A'}</li>
                    </ul>

                    <p><b>Team Members</b></p>
                    <ul>
                        {project.team_lead_id && (
                            <li>{project.team_lead_id?.firstName + " " + project.team_lead_id?.lastName} (Team Lead)</li>
                        )}
                        {
                            project.members.map((item, key)  => <li key={key}>Jasmin Adam</li>)
                        }
                    </ul>

                    <p><b>Project Created:</b> {formatDate(project.created_at)}</p>
                    {project.client && (
                        <p><b>Client:</b> {project.client.name || 'No client specified'}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProjectCard;
