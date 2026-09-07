import { Response } from 'express';
import Project from '../models/Project';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/auth';

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const totalProjects = await Project.countDocuments({
      $or: [
        { owner: req.userId },
        { members: req.userId },
      ],
    });

    const activeProjects = await Project.countDocuments({
      $or: [
        { owner: req.userId },
        { members: req.userId },
      ],
      status: 'active',
    });

    const totalTasks = await Task.countDocuments({
      $or: [
        { createdBy: req.userId },
        { assignedTo: req.userId },
      ],
    });

    const completedTasks = await Task.countDocuments({
      $or: [
        { createdBy: req.userId },
        { assignedTo: req.userId },
      ],
      status: 'completed',
    });

    const recentTasks = await Task.find({
      $or: [
        { createdBy: req.userId },
        { assignedTo: req.userId },
      ],
    })
      .populate('project', 'name')
      .populate('assignedTo', 'name email avatar')
      .sort({ createdAt: -1 })
      .limit(5);

    const upcomingDeadlines = await Task.find({
      $or: [
        { createdBy: req.userId },
        { assignedTo: req.userId },
      ],
      dueDate: { $gte: new Date() },
      status: { $ne: 'completed' },
    })
      .populate('project', 'name')
      .populate('assignedTo', 'name email avatar')
      .sort({ dueDate: 1 })
      .limit(5);

    const projectProgress = await Project.find({
      $or: [
        { owner: req.userId },
        { members: req.userId },
      ],
    })
      .select('name _id')
      .lean();

    const projectProgressData = await Promise.all(
      projectProgress.map(async (project) => {
        const tasks = await Task.find({ project: project._id });
        const completed = tasks.filter((t) => t.status === 'completed').length;
        return {
          name: project.name,
          progress: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0,
        };
      })
    );

    res.json({
      stats: {
        totalProjects,
        activeProjects,
        totalTasks,
        completedTasks,
      },
      recentTasks,
      upcomingDeadlines,
      projectProgress: projectProgressData,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
