import { body, validationResult } from 'express-validator';

export const projectValidation = [
  body('name').trim().notEmpty().withMessage('Project name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('status').isIn(['active', 'completed', 'on-hold']).withMessage('Invalid status'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('startDate').isISO8601().withMessage('Invalid start date'),
];

export const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
