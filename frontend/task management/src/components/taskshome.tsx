import  { memo } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface TaskHomeProps {
    title: string;
    due: string;
    link: string;
    type: string;
}

const TaskHome = memo(function TaskHome({ title, due, link, type }: TaskHomeProps) {
    const server = import.meta.env.VITE_server_link;
    const navigate = useNavigate();

    const titleClassName = type === 'Completed Task' ? 'font-medium line-through' : 'font-medium';

    const completeTask = async () => {
        const resp = await axios.put(
            server + '/api/v1/task/tasks/' + link,
            {
                status: 'DONE',
                completed_at: new Date(),
            },
            {
                withCredentials: true,
            }
        );
        if (resp) {
            navigate('/home', { state: { key: Math.random().toString() } });
        }
    };

    const undoTask = async () => {
        const resp = await axios.put(
            server + '/api/v1/task/tasks/' + link,
            {
                status: 'TODO',
            },
            {
                withCredentials: true,
            }
        );
        
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
                <Link to={'/task/' + link}>
                    <h3 className={titleClassName}>{title}</h3>
                    <p className="text-gray-500 text-sm">{due}</p>
                </Link>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
                {type !== 'Completed Task' ? (
                    <div>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded"
                            onClick={completeTask}
                        >
                            Complete
                        </button>
                        <Link to={"/edit/"+link}>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-3 rounded">
                            Edit
                        </button>
                        </Link>
                    </div>
                ) : (
                    <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-3 rounded"
                        onClick={undoTask}
                    >
                        UNDO
                    </button>
                )}
            </div>
        </div>
    );
});

export default TaskHome;
