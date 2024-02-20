import logo from './logo.svg';
import './App.css';
import { Route,Routes, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from "./compo/home";
import CreatProject from "./compo/createProject";
import DashBoard from './compo/dashboard';
import ProjectList from './compo/projectList';


const App = () => {
const user = localStorage.getItem("UserName")
  return(
  <Routes>
    {(user === null)&&<Route path='/' element={<Home />} />}
    {(user) && <Route path='/createProject' element={<CreatProject />}/>}
    {(user) && <Route path='/dashBoard' element={<DashBoard />}/>}
    {(user) && <Route path='/projectList' element={<ProjectList />}/>}
  </Routes>
  )
  
}

export default App;
