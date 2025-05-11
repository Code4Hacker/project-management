import React, { useEffect, useState } from 'react'
import TopNav from '../components/top-nav/TopNav'
import useFetch from '../hooks/useFetch';
import toast from 'react-hot-toast';
const AssignNewProject = ({ children }) => {
    const { fetchData, loading } = useFetch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");
    const [teamleader, setteamLeader] = useState("");
    const [id, setId] = useState({
        manager_id: -1,
        leaders: []
    });

    const getUserDetails = async () => {

        const { code, message, data } = await fetchData({
            reqType: "get",
            api: "/me"
        });
        console.log(code)
        if (code !== 9000) {
            toast.error(message);
            return;
        }
        setId((prev) => ({
            ...prev,
            manager_id: data.id
        }));
    }
    const getTeamLeaders = async () => {

        const { content } = await fetchData({
            reqType: "get",
            api: "/users/MANAGER"
        });
        console.log(content)
        setId((prev) => ({
            ...prev,
            leaders: content
        }));
    }


    const onSubmit = async (obj) => {
        const loadingToast = toast.loading('Adding new Project...');
        let project = {
            name: name,
            description: description,
            manager_id: id.manager_id,
            start_date: startdate,
            end_date: enddate
        };
        try {
            const { code, message, data } = await fetchData({
                reqType: "post",
                api: "/projects",
                body: project
            });
            if (code !== 9000) {
                toast.dismiss(loadingToast);
                toast.error(message);
            } else {
                console.log(data.id);
                toast.dismiss(loadingToast);
                const loadingTeam = toast.loading('Adding new Assigning team leader...');
                try {
                    console.log(teamleader);
                    const user = await fetchData({
                        reqType: "put",
                        api: `/projects/${data.id}/assign-team-lead?userUuid=${teamleader}`,
                    });
                    console.log(user.data)
                    toast.dismiss(loadingTeam);
                    toast.success(user.message);
                } catch (error) {
                    toast.dismiss(loadingTeam);
                    toast.error(error);

                }
                toast.success(message);
                // navigate(SIGN_IN);
                setDescription("");
                setName("");
            }
        } catch (error) {
            toast.dismiss(loadingToast);

            // Log the full error response for debugging
            console.error('Full error response:', error);

            if (error.response) {
                // Server responded with error status
                if (error.response.data) {
                    // Handle validation errors
                    if (typeof error.response.data === 'object') {
                        // Convert object errors to string
                        const errorMessages = Object.entries(error.response.data)
                            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(' ') : errors}`)
                            .join('\n');
                        toast.error(errorMessages);
                    } else {
                        toast.error(error.response.data.detail || 'Registration failed');
                    }
                } else {
                    toast.error('Registration failed. Please try again.');
                }
            } else if (error.request) {
                toast.error('No response from server. Please check your connection.');
            } else {
                toast.error(`Request error: ${error.message}`);
            }
        }
    };
    useEffect(() => {
        getUserDetails();
        getTeamLeaders();
    }, []);

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
                            <input type="text" placeholder='Enter project title' value={name} onChange={(e) => setName(e.target.value)} />
                            <br />
                            <br />
                            <span>
                                Description
                            </span>
                            <br />
                            <textarea name="" id="" placeholder='Enter project description' rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            <br />
                            <br />
                            <span>
                                Start Date
                            </span>
                            <br />
                            <input type="date" value={startdate} onChange={(e) => setStartdate(e.target.value)} />
                            <br />
                            <br />
                            <span>
                                End Date
                            </span>
                            <br />
                            <input type="date" value={enddate} onChange={(e) => setEnddate(e.target.value)} />
                            <br />
                            <br />
                            <span>
                                Assign Team Leader
                            </span>
                            <br />
                            <select name="" value={teamleader} onChange={(e) => setteamLeader(e.target.value)}>
                                {
                                    id.leaders?.length > 0 && id.leaders.map((val, key) => <option value={val.uuid} key={key}>{val.firstName} {val.lastName}</option>)
                                }
                            </select>
                            <br />
                            <br />
                            <button className='btn-primary' onClick={onSubmit}>Assign Project</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignNewProject