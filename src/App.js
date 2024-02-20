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
    <Route path='/' element={<Home />} />
    <Route path='/createProject' element={(user)?<CreatProject />:alert("Please Login First")}/>
    <Route path='/dashBoard' element={(user)?<DashBoard />:alert("Please Login First")} />
    <Route path='/projectList' element={(user)?<ProjectList />:alert("Please Login First")} />
  </Routes>
  )
  
}

export default App;
