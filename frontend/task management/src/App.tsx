import { Route, Router, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import SigninPage from "./pages/sigin";
import Signupage from "./pages/signup";
import Home from "./pages/home";
import Topbar from "./components/topbar";
import Taskadd from "./pages/Addtaskpage";
import TaskinDetail from "./pages/task";
export default function App() {
  return (
  <BrowserRouter>
  <Topbar/>
  <Routes>
    <Route path="/" element={<SigninPage/>}></Route>
    <Route path="/signup" element={<Signupage/>}></Route>
    <Route path="/home" element ={<Home/>}></Route>
    <Route path="/add" element ={<Taskadd/>}></Route>
    <Route path="/task/:id" element ={<TaskinDetail/>}></Route>
  </Routes>
  </BrowserRouter>
  ) 
}
