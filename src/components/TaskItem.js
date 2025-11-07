import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete, onToggleStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    onUpdate(task._id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Task description"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="task-display">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggleStatus(task._id, e.target.checked)}
          />
          <div className="task-content">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
          </div>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
