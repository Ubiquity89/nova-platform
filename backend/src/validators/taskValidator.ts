import { body, validationResult } from 'express-validator';

export const taskValidation = [
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('status').isIn(['todo', 'in-progress', 'review', 'completed']).withMessage('Invalid status'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('project').isMongoId().withMessage('Invalid project ID'),
];

export const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
