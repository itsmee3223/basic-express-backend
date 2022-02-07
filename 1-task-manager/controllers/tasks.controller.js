const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ messeage: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ messeage: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).json({
        messeage: `No task with id ${taskId}`,
      });
    }
    res.status(200).json({
      task,
    });
  } catch (error) {
    res.status(500).json({ messeage: error });
  }
};

const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const tak = await Task.findOneAndUpdate(
      {
        _id: taskId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        messeage: `No task with id ${taskId}`,
      });
    }

    tus(200).json({
      task,
    });
  } catch (error) {
    res.status(500).json({ messeage: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });

    if (!task) {
      return res.status(404).json({
        messeage: `No task with id ${taskId}`,
      });
    }

    res.status(200).json({
      task,
    });
  } catch (error) {
    res.status(500).json({ messeage: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
