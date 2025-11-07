import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onToggleStatus }) => {
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;
