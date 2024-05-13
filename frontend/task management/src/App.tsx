import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil'; // Import RecoilRoot

import Topbar from "./components/topbar";
import { Route, Routes } from "react-router";
import SigninPage from "./pages/sigin";
import Signupage from "./pages/signup";
import Home from "./pages/home";
import Taskadd from "./pages/Addtaskpage";
import TaskinDetail from "./pages/task";

export default function App() {
  return (
    <RecoilRoot> 
      <BrowserRouter>
        <Topbar/>
        <Routes>
          <Route path="/" element={<SigninPage/>}></Route>
          <Route path="/signup" element={<Signupage/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/add" element={<Taskadd/>}></Route>
          <Route path="/task/:id" element={<TaskinDetail/>}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  ) 
}
