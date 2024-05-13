import TaskHome from "./taskshome";




import { Task } from "./task";

interface BoxProps {
  type: string;
  tasks: Task[];
}




export default function Box({ type, tasks }: BoxProps) {
   
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">{type}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskHome key={task.id} title={task.title} due={task.Due_at} link={task.id} type={type}/>
        ))}
      </div>
    </div>
  );
}
