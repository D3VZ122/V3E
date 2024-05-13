import { useNavigate, useParams } from "react-router"
import Button from "../components/button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskinDetail() {
  const { id } = useParams();
  const [task, settask] = useState({
    title: "",
    description: "",
    status: "",
    completed_at: "",
    Due_at: ""
  });
  const server = import.meta.env.VITE_server_link;
  const navigate = useNavigate();
  useEffect(() => {

    axios.get(server + "/api/v1/task/tasks/" + id, { withCredentials: true }).then((response) => {

      settask(response.data.respbyid);
    })
  }, [])
  return (

    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col w-full mb-12 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">Task Details</h1>
          <p className="mx-auto text-base leading-relaxed lg:w-2/3">
            Detailed information about the task you selected.
          </p>
        </div>
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-3 text-2xl font-semibold">{task.title}</h2>
          <p className="mb-6 text-gray-700">
            {task.description}
          </p>
          <div className="mb-6">
            {task.status === "DONE" ? <strong>Completed At</strong> : <strong>Due Date:</strong>}
            <p>{task.status === "DONE" ?  new Date(task.completed_at).toLocaleDateString()+"  "+new Date(task.completed_at).toLocaleTimeString():new Date(task.Due_at).toLocaleDateString()+" " +new Date(task.Due_at).toLocaleTimeString()}</p>
          </div>
          {task.status != "DONE" ? <div>  <div className="flex justify-between">
            <Button name="Edit" size="large" onclick={()=>{}} />
            <Button name="complete" size="large" onclick={async () => {
              const resp = await axios.put(server + "/api/v1/task/tasks/" + id, {
                status: "DONE"
              }, {
                withCredentials: true
              });
              if (resp) {
                navigate("/home");
              }
            }} />
            <Button name="DELETE TASK" size="large" onclick={async()=>{
              const resp = await axios.delete(server+"/api/v1/task/tasks/"+id,{
                withCredentials:true
              });
              if(resp){
                navigate("/home");
              }
              
          }}/>
          </div></div> :<div><Button name="DELETE TASK" size="large" onclick={
            
            async()=>{
              const resp = await axios.delete(server+"/api/v1/task/tasks/"+id,{
                withCredentials:true
              });
              if(resp){
                navigate("/home");
              
              }
          }}/></div>}
          

        </div>
      </div>
    </div>

  )
}