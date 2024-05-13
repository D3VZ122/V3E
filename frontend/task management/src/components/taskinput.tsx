  import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

  
  type InputEvent = React.ChangeEvent<HTMLInputElement>;
  type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>; 
  type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

  

  export default function Addtask() {
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
  const [inputdata,setdata] = useState({
    title:"",
    description:"",
    Priority:"Low",
    Due_at:""
  })
  

    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Add Task</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                Title
              </label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                id="title"
                placeholder="Enter task title"
                type="text"
                onChange={(e:InputEvent)=> {
                  setdata({ ...inputdata, title: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                id="description"
                placeholder="Enter task description"
                rows={3}
                onChange={(e: TextAreaEvent)=> {
                  setdata({ ...inputdata, description: e.target.value });
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="dueDate">
                  Due Date
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  id="dueDate"
                  type="date"
                  min={today}
                  onChange={(e:InputEvent)=> {
                    const dateTimeString = e.target.value + "T00:00:00Z"; 
                   setdata({ ...inputdata, Due_at: dateTimeString });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="priority">
                  Priority
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  id="priority" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setdata({ ...inputdata, Priority: e.target.value });
                  }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <button
              className="w-full rounded-md bg-blue-400 px-4 py-2 text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              type="submit"
              onClick={async(e:ButtonEvent)=>{
                e.preventDefault();
                
                const server = import.meta.env.VITE_server_link
              const resp = await axios.post(server+"/api/v1/task/tasks",inputdata,{
                withCredentials:true
              });
              if(resp){
                navigate("/home")
              }
            
              }}
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    );
  }
