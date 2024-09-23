import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Toaster } from 'react-hot-toast'
import Sidebar from './components/common/SideBar.jsx'
import RightPanel from './components/common/RightPanel.jsx'
import LoginPage from './pages/auth/login/LoginPage.jsx'
import SignUpPage from './pages/auth/signup/SignUpPage.jsx'
import HomePage from './pages/home/HomePage.jsx'
import NotificationPage from './pages/notifications/NotificationPage.jsx'
import ProfilePage from './pages/profile/ProfilePage.jsx'  

import './index.css'




function App() {
  return (
    <BrowserRouter>
      <div className='flex max-w-6xl mx-auto'>
        {/* Common component, bc it's not wrapped with Routes */}
        {/* {authUser && } */}
        <Sidebar/>
        <Routes>
          <Route path='/' element={ <HomePage/>}/>
          <Route path='/login' element={ <LoginPage /> }/>
          <Route path='/signup' element={ <SignUpPage /> } />
           <Route path='/notifications' element={<NotificationPage/>} />
           <Route path='/profile/:username' element={ <ProfilePage />} /> 
        </Routes>
        <RightPanel/>
        {/* {authUser && } */}
        {/* <Toaster /> */}
      </div>
    </BrowserRouter>
  )
}

export default App
