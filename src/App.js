import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from "./compo/home";
import CreatProject from "./compo/createProject";
import DashBoard from './compo/dashboard';
import ProjectList from './compo/projectList';

const App = () => {

  return(
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/createProject' element={<CreatProject />}/>
    <Route path='/dashBoard' element={<DashBoard />} />
    <Route path='/projectList' element={<ProjectList />} />
  </Routes>
  )
  
}

export default App;
