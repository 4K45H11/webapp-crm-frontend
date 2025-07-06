import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import LeadList from './pages/LeadList'
import SalesAgentManagement from './pages/SalesAgentManagement'
import Report from './pages/Report'
import AddLead from './pages/AddLead'
import AddAgent from './pages/AddAgent'
import LeadManagement from './pages/LeadManagement'
function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/leads' element={<LeadList/>}/>
        <Route path='/leads/:id' element={<LeadManagement/>}/>
        <Route path='/leads/new' element={<AddLead/>}/>
        <Route path='/agents' element={<SalesAgentManagement/>}/>
        <Route path='/agents/new' element={<AddAgent/>}/>
        <Route path='/reports' element={<Report/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
