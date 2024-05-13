import {  useCookies } from "react-cookie";
import Button from "./button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Topbar() {
  const [cookies, , removeCookie] = useCookies();
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      setLogin(true);
    }
  }, [cookies.token, navigate]);

  return (
    <div className="block md:flex justify-between items-center w-full p-4 bg-gray-900 text-white">
      <div className="text-center text-3xl">
        <Link to={"/home"}>
        <h1>TASK MASTER</h1>
        </Link>
    
        
      </div>
      
      <div className="text-center">
        <div style={{ display: "inline-block" }}>
          {login === false ? (
            <Button
              name="Login"
              size="small"
              onclick={() => {
                navigate("/");
              }}
            />
          ) : (
            <Button
              name="Logout"
              size="small"
              onclick={() => {
                removeCookie("token");
                removeCookie("name ");
                setLogin(false);
                navigate("/");
              }}
            />
          )}
        </div>
        {login === true ? (
          <div style={{ display: "inline-block", marginLeft: "10px" }}>
            <Button name="Add Task" size="small" onclick={()=>{navigate("/add")}} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
