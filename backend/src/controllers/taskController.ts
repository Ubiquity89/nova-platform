import { Response } from 'express';
import Task from '../models/Task';
import Project from '../models/Project';
import { AuthRequest } from '../middleware/auth';

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, priority, dueDate, project, assignedTo } = req.body;

    const projectDoc = await Project.findById(project);
    if (!projectDoc) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isMember = projectDoc.members.some((member: any) => member.toString() === req.userId);
    if (!isMember && projectDoc.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to add tasks to this project' });
    }

    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      project,
      assignedTo,
      createdBy: req.userId,
    });

    await task.save();
    await task.populate('project', 'name');
    await task.populate('assignedTo', 'name email avatar');
    await task.populate('createdBy', 'name email avatar');

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { search, status, priority, project, assignedTo, sortBy } = req.query;
    const query: any = {
      $or: [
        { createdBy: req.userId },
        { assignedTo: req.userId },
      ],
    };

    if (search) {
      query.$and = [
        ...(query.$and || []),
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (project) {
      query.project = project;
    }

    if (assignedTo) {
      query.assignedTo = assignedTo;
    }

    let sortOptions: any = { createdAt: -1 };
    if (sortBy === 'dueDate') {
      sortOptions = { dueDate: 1 };
    } else if (sortBy === 'priority') {
      sortOptions = { priority: -1 };
    }

    const tasks = await Task.find(query)
      .populate('project', 'name')
      .populate('assignedTo', 'name email avatar')
      .populate('createdBy', 'name email avatar')
      .sort(sortOptions);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'name')
      .populate('assignedTo', 'name email avatar')
      .populate('createdBy', 'name email avatar');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.project);
    const isMember = project?.members.some((member: any) => member.toString() === req.userId);
    if (!isMember && project?.owner.toString() !== req.userId && task.createdBy._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.project);
    const isMember = project?.members.some((member: any) => member.toString() === req.userId);
    if (!isMember && project?.owner.toString() !== req.userId && task.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate('project', 'name')
      .populate('assignedTo', 'name email avatar')
      .populate('createdBy', 'name email avatar');

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
