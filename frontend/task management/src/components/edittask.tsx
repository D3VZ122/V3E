import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

type TaskData = {
  id: string;
  title: string;
  description: string;
  Priority: string;
  Due_at: string;
};

export default function EditTask() {
  const navigate = useNavigate();
  const {id} = useParams();
  const today = new Date().toISOString().split("T")[0];
  const [inputData, setInputData] = useState<TaskData>({
    id: "",
    title: "",
    description: "",
    Priority: "Low",
    Due_at: today,
  });

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const server = import.meta.env.VITE_server_link;
        const response = await axios.get<TaskData>(
          `${server}/api/v1/task/tasks/${id}`,
          { withCredentials: true }
        );
        setInputData(response.data);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTaskData();
  }, []);

  const handleInputChange = (e: InputEvent | TextAreaEvent) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: ButtonEvent) => {
    e.preventDefault();
    try {
      const server = import.meta.env.VITE_server_link;
      const resp = await axios.put(
        `${server}/api/v1/task/tasks/${inputData.id}`,
        inputData,
        { withCredentials: true }
      );
      if (resp) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
        <form className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              id="title"
              name="title"
              type="text"
              value={inputData.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              id="description"
              name="description"
              rows={3}
              value={inputData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="dueDate"
              >
                Due Date
              </label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                id="dueDate"
                name="Due_at"
                type="date"
                value={inputData.Due_at}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="priority"
              >
                Priority
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                id="priority"
                name="Priority"
                value={inputData.Priority}
                onChange={handleInputChange}
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
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
