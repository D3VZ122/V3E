import { useEffect, useState } from "react";
import axios from "axios";
import Box from "../components/box";
import { Task } from "../components/task";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(coo);
    if(!cookies.token){
      navigate("/");
    }
    
    const server = import.meta.env.VITE_server_link;
    axios.get(server+"/api/v1/task/tasks",{withCredentials:true}).then((response) => {
      const updatedTasks = response.data.resp.map((task: Task) => {
        const dueDate = new Date(task.Due_at);
        const today = new Date();
        if (task.status=="DONE") {
          task.status = "DONE";
          task.Due_at= dueDate.toLocaleDateString()+" "+dueDate.toLocaleTimeString();
        }
        else if (dueDate.getDate() === today.getDate() && dueDate.getMonth() === today.getMonth() && dueDate.getFullYear() === today.getFullYear()) {
          task.status = "TODO";
          task.Due_at="today"
        }  else {
          task.status = "IN_PROGRESS";
          task.Due_at= dueDate.toLocaleDateString()+" "+dueDate.toLocaleTimeString();
        }
        return task;
      });
      setTasks(updatedTasks);
    });
  }, [tasks]);

  return (
    <div>
      <main className="flex-1 py-8 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Box type="Today" tasks={tasks.filter(task => task.status === "TODO")} />
          <Box type="Pending Task" tasks={tasks.filter(task => task.status === "IN_PROGRESS")} />
          <Box type="Completed Task" tasks={tasks.filter(task => task.status === "DONE")} />
        </div>
      </main>
    </div>
  );
}
