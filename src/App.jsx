import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SideBar from './components/SideBar'
import { ASSIGN_NEW_PROJECT, GENERATE_REPORT, HOME, PROJECT_DETAILS, REVIEW_AND_APPROVE, SIGN_IN, SIGN_UP, TEAM_LEADER_DASHBOARD, UPDATE_TASK, VIEW_RESOURCES } from './constants/routes'
import AssignNewProject from './pages/AssignNewProject'
import ReviewApprove from './pages/ReviewApprove'
import ProjectDetails from './pages/ProjectDetails'
import GenerateReport from './pages/GenerateReport'
import TeamMembers from './pages/TeamLeaderDashboard'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import ViewResources from './pages/team-leader/ViewResources'
import UpdateTask from './pages/team-leader/UpdateTask'

function App() {
  
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route path={SIGN_UP} element={<Signup />} />
          <Route path={SIGN_IN} element={<Login />} />
          <Route element={
            <Dashboard>
              <SideBar />
            </Dashboard>
          } path={HOME} />
          <Route element={
            <AssignNewProject>
              <SideBar />
            </AssignNewProject>
          } path={ASSIGN_NEW_PROJECT} />
          <Route element={
            <ReviewApprove>
              <SideBar />
            </ReviewApprove>
          } path={REVIEW_AND_APPROVE} />
          <Route element={<ProjectDetails>
            <SideBar />
          </ProjectDetails>} path={PROJECT_DETAILS} />
          <Route element={<GenerateReport>
            <SideBar />
          </GenerateReport>} path={GENERATE_REPORT} />
          <Route element={<TeamMembers>
            <SideBar />
          </TeamMembers>} path={TEAM_LEADER_DASHBOARD} />
          <Route element={<ViewResources>
            <SideBar />
          </ViewResources>} path={VIEW_RESOURCES} />
          <Route element={<UpdateTask>
            <SideBar />
          </UpdateTask>} path={UPDATE_TASK} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
