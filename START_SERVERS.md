# How to Start the Job Portal Application

## Prerequisites
- Python 3.8+ installed
- Node.js 14+ installed
- pip (Python package manager)
- npm (Node package manager)

## Backend Setup (Django)

### 1. Navigate to the backend directory
```powershell
cd backend
```

### 2. Install Python dependencies
```powershell
pip install -r requirements.txt
```

### 3. Run database migrations
```powershell
python manage.py migrate
```

### 4. Create a superuser (optional, for admin access)
```powershell
python manage.py createsuperuser
```

### 5. Start the Django development server
```powershell
python manage.py runserver
```

The backend will start on **http://localhost:8000**

## Frontend Setup (React)


The frontend will start on **http://localhost:3000**

## Verifying Everything Works

1. Both servers should be running in separate terminal windows
2. Open your browser and go to **http://localhost:3000**
3. You should see the Job Portal homepage without any "Failed to fetch" errors
4. The backend API should be accessible at **http://localhost:8000/api/**

## Troubleshooting

### If you see "Failed to fetch" errors:
- Make sure the Django backend is running on port 8000
- Check the Django terminal for any error messages
- Verify CORS settings in `backend/core/settings.py`

### If the frontend won't start:
- Make sure you're in the root directory (not in `backend/`)
- Try deleting `node_modules` and running `npm install` again
- Check for port conflicts (port 3000 should be free)

### If you get Python module errors:
- Make sure you're using Python 3.8 or higher: `python --version`
- Reinstall requirements: `pip install -r requirements.txt`
- Consider using a virtual environment:
  ```powershell
  python -m venv venv
  .\venv\Scripts\Activate.ps1
  pip install -r requirements.txt
  ```

## What Was Fixed

### 1. Tailwind Configuration
- Fixed empty `content` paths in `tailwind.config.js`
- Added proper color themes and animations

### 2. API Service
- Created centralized API service (`src/services/api.js`)
- Proper error handling for all API calls
- Better user feedback for network errors

### 3. Component Updates
- Updated `Header.jsx` to use the new API service
- Updated `Login.jsx` with loading states and better error messages
- Updated `Register.jsx` with loading states and better error messages
- Updated `Dashboard.jsx` with proper error handling
- Updated `ApplicationsList.jsx` with loading states
- Updated `JobsList.jsx` to use the API service

### 4. Error Prevention
- All fetch calls now check `response.ok` before parsing JSON
- Network errors are caught and displayed to users
- Loading states prevent multiple simultaneous requests
- Token is not removed on every error (backend might be temporarily down)

## Next Steps

After starting both servers, you can:
1. Register a new account
2. Login with your credentials
3. Browse jobs
4. Submit job applications
5. Post new ideas
6. Admin users can access the dashboard at `/dashboard`
