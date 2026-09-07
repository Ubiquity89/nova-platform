# NOVA – Team Productivity Platform

A complete full-stack project management application built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes and API endpoints
- Password hashing with bcrypt

### Dashboard
- Overview of total and active projects
- Task statistics (total and completed)
- Recent tasks display
- Upcoming deadlines
- Project progress visualization

### Projects
- Create, edit, and delete projects
- Project status tracking (active, completed, on-hold)
- Priority levels (low, medium, high)
- Team member management
- Search and filter projects
- Project due dates

### Tasks
- Create, edit, and delete tasks
- Task status workflow (todo, in-progress, review, completed)
- Priority assignment
- Due date tracking
- User assignment
- Search, filter, and sort functionality
- Kanban board view

### Team
- View all team members
- Member task statistics
- Role-based access (admin, member)

### Profile
- View and edit user profile
- Update name and avatar
- Email and role display

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query (React Query)
- Axios
- React Hook Form
- Zod
- date-fns

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-validator
- CORS

## Project Structure

```
nova-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── dashboardController.ts
│   │   │   ├── projectController.ts
│   │   │   ├── taskController.ts
│   │   │   └── userController.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── errorHandler.ts
│   │   ├── models/
│   │   │   ├── Project.ts
│   │   │   ├── Task.ts
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── dashboard.ts
│   │   │   ├── projects.ts
│   │   │   ├── tasks.ts
│   │   │   └── users.ts
│   │   ├── validators/
│   │   │   ├── authValidator.ts
│   │   │   ├── projectValidator.ts
│   │   │   └── taskValidator.ts
│   │   ├── types/
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   └── utils.ts
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Tasks.tsx
│   │   │   └── Team.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env.example
│   ├── components.json
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nova
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nova
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects (with search/filters)
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get a single project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project
- `POST /api/projects/:id/members` - Add member to project
- `DELETE /api/projects/:id/members/:userId` - Remove member from project

### Tasks
- `GET /api/tasks` - Get all tasks (with search/filters)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a single task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user with stats
- `PUT /api/users/profile` - Update user profile

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Deployment

### Backend Deployment (Render)

1. Create a new account on [Render](https://render.com)

2. Create a new Web Service

3. Connect your GitHub repository

4. Configure build settings:
```
Build Command: npm install && npm run build
Start Command: npm start
```

5. Add environment variables in Render dashboard:
```
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-production-secret-key
NODE_ENV=production
```

6. Deploy!

### Frontend Deployment (Vercel)

1. Create a new account on [Vercel](https://vercel.com)

2. Create a new project

3. Import your GitHub repository

4. Configure build settings:
```
Framework Preset: Vite
Build Command: npm install && npm run build
Output Directory: dist
```

5. Add environment variable:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

6. Deploy!

### MongoDB Atlas Setup

1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Create a new cluster

3. Create a database user

4. Whitelist IP addresses (use 0.0.0.0/0 for development)

5. Get your connection string

6. Update your `.env` file with the connection string

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## Security Notes

- Change the `JWT_SECRET` in production to a strong, random string
- Use environment variables for all sensitive data
- Enable MongoDB Atlas IP whitelisting for production
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Add input validation and sanitization

## Development

### Running Backend Tests
```bash
cd backend
npm test
```

### Running Frontend Tests
```bash
cd frontend
npm test
```

### Building for Production

Backend:
```bash
cd backend
npm run build
```

Frontend:
```bash
cd frontend
npm run build
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or Atlas credentials are correct
- Check IP whitelist settings in MongoDB Atlas
- Verify connection string format

### CORS Issues
- Ensure backend CORS is configured correctly
- Check that frontend API URL matches backend URL

### Authentication Issues
- Clear browser localStorage
- Verify JWT_SECRET is consistent
- Check token expiration

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue on the GitHub repository.
