import { Response } from 'express';
import User from '../models/User';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/auth';

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password').sort({ name: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const assignedTasks = await Task.find({ assignedTo: req.params.id });
    const completedTasks = await Task.find({ assignedTo: req.params.id, status: 'completed' });

    res.json({
      user,
      stats: {
        totalTasks: assignedTasks.length,
        completedTasks: completedTasks.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { name, avatar } },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
