const Task = require('../models/Task');

class TaskService {
  async getAllTasks() {
    return await Task.find().sort({ createdAt: -1 });
  }

  async getTaskById(id) {
    const task = await Task.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async createTask(taskData) {
    const task = new Task(taskData);
    return await task.save();
  }

  async updateTask(id, updateData) {
    const task = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async deleteTask(id) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async updateTaskStatus(id, completed) {
    const task = await Task.findByIdAndUpdate(id, { completed }, {
      new: true,
      runValidators: true
    });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async searchTasks(query) {
    return await Task.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
  }
}

module.exports = new TaskService();
