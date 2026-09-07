import { Response } from 'express';
import Project from '../models/Project';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/auth';

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, status, priority, startDate, endDate } = req.body;

    const project = new Project({
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
      owner: req.userId,
      members: [req.userId],
    });

    await project.save();
    await project.populate('owner', 'name email avatar');
    await project.populate('members', 'name email avatar');

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const { search, status, priority } = req.query;
    const query: any = {
      $or: [
        { owner: req.userId },
        { members: req.userId },
      ],
    };

    if (search) {
      query.$and = [
        ...(query.$and || []),
        {
          $or: [
            { name: { $regex: search, $options: 'i' } },
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

    const projects = await Project.find(query)
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isMember = project.members.some((member: any) => member._id.toString() === req.userId);
    if (!isMember && project.owner._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar');

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Task.deleteMany({ project: req.params.id });
    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addMember = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (project.members.includes(userId as any)) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    project.members.push(userId);
    await project.save();
    await project.populate('members', 'name email avatar');

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeMember = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    project.members = project.members.filter((member: any) => member.toString() !== userId);
    await project.save();
    await project.populate('members', 'name email avatar');

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
