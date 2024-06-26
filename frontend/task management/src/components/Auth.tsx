import { useEffect, useState } from "react";
import Button from "./button";
import LabbeledInputs from "./input";
import axios from "axios";
import { useNavigate } from "react-router";
import {  useCookies } from "react-cookie";
import { Link } from "react-router-dom";

interface AuthType {
    type: string;
}

interface UserDataType {
    Email: string;
    name: string;
    password: string;
}



export default function Auth({ type }: AuthType) {
    const navigate = useNavigate();
    const [cookie,setcookie] =useCookies();
    const [userData, setUserData] = useState<UserDataType>({
        Email: "",
        name: "",
        password: "",
    }); 

    useEffect(()=>{
        if(cookie.isauthenticated==true){
            navigate("/home");
        }
    })
    const server = import.meta.env.VITE_server_link
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
                const resp = await axios.post(server+"/api/v1/user/"+type, userData,{
                    withCredentials:true
                });
                
           if(type=="signin"&&resp.data.success==true){
            setcookie("isauthenticated",true);
            navigate("/home");
           }
           else{
            navigate("/")
           }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.error("An error occurred:", error);
            if (error.response && error.response.data && error.response.data.message) {
            
                alert(error.response.data.message);
            } else {
                alert("An error occurred while processing your request.");
            }
        }
    };
    
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-200">
                <div className="bg-white p-8 rounded-md border border-gray-300">
                    <div className="text-2xl font-bold mb-5">
                        {type === "signin" ? (
                            <div>Login To TaskMaster</div>
                        ) : (
                            <div>Sign Up for TaskMaster</div>
                        )}
                    </div>
                    <form onSubmit={handleSubmit}>
                        {type === "signup" ? (
                            <LabbeledInputs
                                type="text"
                                label="Name"
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Dev Pratap Singh"
                            />
                        ) : null}
                        <LabbeledInputs
                            type="text"
                            label="Email"
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    Email: e.target.value,
                                })
                            }
                            placeholder="abc@gmail.com"
                        />
                        <LabbeledInputs
                            type="password"
                            label="Password"
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    password: e.target.value,
                                })
                            }
                            placeholder="*****"
                        />
                        {type === "signin" ? (
                            <Button
                                name="LOGIN"
                                size="large"
                                onclick={()=>{}}
                            />
                        ) : (
                            <Button
                                name="Register"
                                size="large"
                                onclick={()=>{}}
                            />
                        )}
                        {type === "signin" ? (
                                <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
                            ) : (
                                <span>Already have an account? <Link to="/">Sign in</Link></span>
                            )}

                    </form>
                </div>
            </div>
        </>
    );
}
