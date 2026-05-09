import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './store'
import Layout from './components/Layout'
import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import TaskExecute from './pages/TaskExecute'
import Charity from './pages/Charity'
import Profile from './pages/Profile'
import Auth from './pages/Auth'

function App() {
  const isLoggedIn = !!localStorage.getItem('user')

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={isLoggedIn ? <Layout /> : <Navigate to="/auth" />}>
            <Route index element={<Home />} />
            <Route path="create" element={<CreateTask />} />
            <Route path="task/:id" element={<TaskExecute />} />
            <Route path="charity" element={<Charity />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App