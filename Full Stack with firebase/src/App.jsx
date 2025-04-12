import React from 'react'
import Home from './Home'
import Signup from './pages/signup'
import Login from './pages/login'
import RecruiterDashboard from './components/recruiterDashboard'
import CandidateDashboard from './components/candidateDashboard'
import MySubmissions from './components/allSubmission'
import Dashboard from './components/dashboard'
import AllJobsPage from './pages/jobs'
import {Route, Routes} from "react-router-dom"
import GithubReview from './pages/githubReview'
import FAQPage from './pages/faq'
import ContactPage from './pages/contact'
import ProtectedRoute from './utils/ProtectedRoute'

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/recruiterDashboard' element={<ProtectedRoute><RecruiterDashboard/></ProtectedRoute> }/>
            <Route path='/challenges' element={<ProtectedRoute> <CandidateDashboard/> </ProtectedRoute> }/>
            <Route path='/submission' element={<ProtectedRoute> <MySubmissions/> </ProtectedRoute> }/>
            <Route path='/dashboard' element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
            <Route path='/company' element={<AllJobsPage/>}/>
            <Route path='/github-review' element={<GithubReview/>}/>
            <Route path='/faq' element={<FAQPage/>}/>
            <Route path='/contact' element={<ContactPage/>}/>
        </Routes>
      
    </div>
  )
}

export default App
