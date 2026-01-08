# TrimURL - URL Shortener Service

A modern web application that converts long URLs into short, shareable links with user authentication, click tracking, and a comprehensive dashboard for managing shortened URLs.

## 🚀 Features

-   **User Authentication**: Secure registration and login with email/password and Google OAuth
-   **URL Shortening**: Convert long URLs into short, shareable 6-8 character codes
-   **URL Redirection**: Automatic redirection from short URLs to original URLs with click tracking
-   **Dashboard**: Comprehensive view of all shortened URLs with statistics
-   **Click Tracking**: Monitor total visits for each shortened URL
-   **Copy to Clipboard**: Easy sharing functionality for shortened URLs
-   **Usage Limits**: Free tier with 100 URLs per user with upgrade prompts
-   **Responsive Design**: Mobile-friendly interface with modern UI

## 🛠️ Tech Stack

### Frontend

-   **React 19** with TypeScript
-   **Vite** - Build tool
-   **Redux Toolkit** with RTK Query for state management and API calls
-   **React Router v7** - Routing
-   **React Hook Form** - Form management
-   **Zod** - Schema validation
-   **shadcn/ui** - UI component library
-   **Tailwind CSS** - Styling
-   **Lucide React** - Icons
-   **Firebase** - Google authentication
-   **date-fns** - Date formatting

### Backend

-   **Node.js** with Express
-   **TypeScript**
-   **MongoDB** with Mongoose
-   **JWT** - Authentication
-   **Zod** - Request validation
-   **Bcrypt** - Password hashing
-   **Nodemailer** - Email service (for password reset)

## 📁 Project Structure

```
TrimURL/
├── frontend/
│   ├── src/
│   │   ├── assets/              # Static assets
│   │   ├── components/          # Reusable components
│   │   │   ├── form/           # Form components (SForm, SInput, etc.)
│   │   │   ├── shared/         # Shared components (Header, Footer)
│   │   │   └── ui/             # shadcn UI components
│   │   ├── constants/          # App constants
│   │   ├── firebase/           # Firebase configuration
│   │   ├── helpers/            # Helper functions and axios setup
│   │   ├── layouts/            # Layout components
│   │   ├── pages/              # Page components
│   │   │   ├── auth/          # Authentication pages
│   │   │   ├── home/          # Landing page
│   │   │   ├── my-urls/       # Dashboard page
│   │   │   └── url-short/     # URL shortening page
│   │   ├── redux/              # Redux store and slices
│   │   │   ├── api/           # RTK Query API definitions
│   │   │   └── features/      # Redux slices
│   │   ├── routes/             # Route configurations
│   │   ├── schema/             # Zod validation schemas
│   │   ├── types/              # TypeScript types
│   │   └── utils/              # Utility functions
│   ├── .env                    # Environment variables
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── app/
    │   │   ├── config/         # Configuration files
    │   │   ├── constant/       # Constants
    │   │   ├── errors/         # Error handling
    │   │   ├── interface/      # TypeScript interfaces
    │   │   ├── middlewares/    # Express middlewares
    │   │   ├── modules/        # Feature modules
    │   │   │   ├── auth/      # Authentication module
    │   │   │   ├── url/       # URL shortening module
    │   │   │   └── user/      # User module
    │   │   ├── routes/         # Route definitions
    │   │   └── utils/          # Utility functions
    │   ├── app.ts              # Express app setup
    │   └── server.ts           # Server entry point
    ├── .env                    # Environment variables
    └── package.json
```

## 🔧 Setup Instructions

### Prerequisites

-   Node.js (v18 or higher)
-   npm (comes with Node.js)
-   MongoDB (local or Atlas)
-   Firebase project (for Google authentication)

### 1. Clone the Repository

```bash
git clone https://github.com/SazidulAlam47/TrimURL.git
cd TrimURL
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=mongodb://localhost:27017/trimurl
# Or for MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/trimurl

# JWT Configuration
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_REFRESH_EXPIRES_IN=30d
JWT_RESET_PASSWORD_SECRET=your_jwt_reset_password_secret_key_here
JWT_RESET_PASSWORD_EXPIRES_IN=10m

# Base URL (for generating short URLs)
BASE_URL=http://localhost:5173

# Email Configuration (for password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=TrimURL <your_email@gmail.com>

# Firebase Admin SDK (for Google authentication)
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

#### Run Backend

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Environment Variables

Create a `.env` file in the frontend directory:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:5000/api/v1

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

#### Run Frontend

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run preview
```

The frontend will run on `http://localhost:5173`

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### 1. Register User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!@",
  "profilePhoto": "https://example.com/photo.jpg" // Optional
}
```

**Response (201):**

```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "profilePhoto": "https://example.com/photo.jpg",
        "_id": "6789abcd1234567890abcdef",
        "createdAt": "2026-01-08T10:30:00.000Z",
        "updatedAt": "2026-01-08T10:30:00.000Z"
    }
}
```

#### 2. Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123!@"
}
```

**Response (200):**

```json
{
    "success": true,
    "message": "Logged in successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

**Note:** A `refreshToken` is also set in an HTTP-only cookie.

#### 3. Google Authentication

```http
POST /auth/google
Content-Type: application/json

{
  "idToken": "firebase_id_token_here"
}
```

**Response (200):**

```json
{
    "success": true,
    "message": "Logged in successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

**Note:** A `refreshToken` is also set in an HTTP-only cookie.

#### 4. Forgot Password

```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response (200):**

```json
{
    "success": true,
    "message": "Reset email is sent successfully",
    "data": null
}
```

#### 5. Reset Password

```http
POST /auth/reset-password
Authorization: Bearer <reset_token_from_email>
Content-Type: application/json

{
  "id": "6789abcd1234567890abcdef",
  "password": "NewPassword123!@"
}
```

**Response (200):**

```json
{
    "success": true,
    "message": "Password reset successful",
    "data": null
}
```

#### 6. Change Password

```http
POST /auth/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "oldPassword": "OldPassword123!@",
  "newPassword": "NewPassword123!@"
}
```

**Response (200):**

```json
{
    "success": true,
    "message": "Password is changed successfully",
    "data": null
}
```

#### 7. Set Password (for Google users)

```http
POST /auth/set-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "password": "Password123!@"
}
```

**Response (200):**

```json
{
    "success": true,
    "message": "Password added successfully",
    "data": null
}
```

### URL Shortening Endpoints

#### 1. Create Short URL

```http
POST /url-shortener
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "url": "https://www.example.com/very-long-url-path"
}
```

**Response (201):**

```json
{
    "success": true,
    "message": "Short URL created successfully",
    "data": {
        "shortUrl": "http://localhost:5173/abc123"
    }
}
```

**Error Response (402) - Limit Reached:**

```json
{
    "success": false,
    "message": "You have reached the maximum limit of 100 shortened URLs. Please upgrade your plan to create more URLs.",
    "errorSources": []
}
```

#### 2. Get My URLs

```http
GET /url-shortener
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
    "success": true,
    "message": "URLs fetched successfully",
    "data": [
        {
            "_id": "6789abcd1234567890abcdef",
            "shortId": "abc123",
            "originalUrl": "https://www.example.com/very-long-url-path",
            "user": "6789abcd1234567890abcdef",
            "clicks": 15,
            "isDeleted": false,
            "createdAt": "2026-01-07T10:30:00.000Z",
            "updatedAt": "2026-01-07T10:30:00.000Z",
            "shortUrl": "http://localhost:5173/abc123"
        }
    ]
}
```

#### 3. Redirect to Original URL

```http
GET /:shortId
```

**Response:** 302 Redirect to original URL

-   Increments click counter
-   Redirects user to the original URL

#### 4. Delete URL

```http
DELETE /url-shortener/:id
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
    "success": true,
    "message": "URL deleted successfully",
    "data": {
        "_id": "6789abcd1234567890abcdef",
        "shortId": "abc123",
        "originalUrl": "https://www.example.com/very-long-url-path",
        "user": "6789abcd1234567890abcdef",
        "clicks": 15,
        "isDeleted": true,
        "createdAt": "2026-01-07T10:30:00.000Z",
        "updatedAt": "2026-01-08T12:45:00.000Z"
    }
}
```

### User Endpoints

#### Get Current User

```http
GET /user/me
Authorization: Bearer <access_token>
```

**Response (200):**

```json
{
    "success": true,
    "message": "User fetched successfully",
    "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "profilePhoto": "https://example.com/photo.jpg",
        "hasPassword": true
    }
}
```

### Error Responses

#### 400 Bad Request

```json
{
    "success": false,
    "message": "Validation error",
    "errorSources": [
        {
            "path": "email",
            "message": "Invalid email format"
        }
    ]
}
```

#### 401 Unauthorized

```json
{
    "success": false,
    "message": "Unauthorized access",
    "errorSources": []
}
```

#### 404 Not Found

```json
{
    "success": false,
    "message": "URL not found",
    "errorSources": []
}
```

#### 500 Internal Server Error

```json
{
    "success": false,
    "message": "Internal server error",
    "errorSources": []
}
```

## 🎨 Design Decisions

### Architecture

-   **Modular Structure**: Both frontend and backend follow a modular architecture, separating concerns into distinct modules (auth, url, user)
-   **Type Safety**: TypeScript is used throughout the project for type safety and better developer experience
-   **State Management**: Redux Toolkit with RTK Query provides centralized state management and automatic caching
-   **Component Architecture**: React components follow a clear hierarchy with reusable form components

### Authentication

-   **JWT Tokens**: Used for stateless authentication with access tokens stored in localStorage
-   **Dual Authentication**: Support for both email/password and Google OAuth provides flexibility
-   **Protected Routes**: Client-side route protection ensures only authenticated users access protected pages
-   **Password Security**: Bcrypt hashing with salt rounds for secure password storage

### URL Shortening Algorithm

-   **Short ID Generation**: Random alphanumeric characters (uppercase, lowercase, and numbers) for collision-resistant short codes
-   **6-8 Character Length**: Balances memorability with uniqueness (billions of possible combinations)
-   **Database Indexing**: Unique index on `shortId` field ensures fast lookups and prevents duplicates
-   **Click Tracking**: Atomic increment operation ensures accurate click counting even under concurrent access

### User Experience

-   **shadcn/ui Components**: Modern, accessible UI components that follow best practices
-   **Form Validation**: Client-side validation with Zod schemas provides immediate feedback
-   **Toast Notifications**: User-friendly notifications for all actions (success, error, loading states)
-   **Responsive Design**: Mobile-first approach with Tailwind CSS ensures compatibility across devices
-   **Loading States**: All buttons disable during operations to prevent duplicate submissions

### Database Design

-   **MongoDB**: NoSQL database chosen for flexibility and scalability
-   **Soft Deletes**: URLs are marked as deleted rather than removed, preserving data integrity
-   **User Reference**: Foreign key relationship between URLs and users for ownership tracking
-   **Timestamps**: Automatic createdAt and updatedAt timestamps for audit trails

### Security

-   **Input Validation**: All inputs validated on both client and server using Zod schemas
-   **CORS**: Configured to allow requests only from trusted origins
-   **Password Requirements**: Enforced strong password policies (minimum 6 characters, mix of letters and numbers)
-   **Firebase Token Verification**: Google authentication tokens verified server-side for security

## ⚠️ Known Limitations

1. **URL Validation**: Basic URL validation is performed, but some edge cases (unusual TLDs, internationalized domains) may not be fully supported

2. **Click Analytics**: Only total click count is tracked. Advanced analytics (geographic location, referrer, device type) are not implemented

3. **Custom Short Codes**: Users cannot choose custom short codes; they are auto-generated

4. **Email Service**: Email functionality requires SMTP configuration and may not work with all email providers without app-specific passwords

5. **Rate Limiting**: No rate limiting is implemented. Production deployment should add rate limiting middleware

6. **URL Expiration**: Shortened URLs do not expire. A TTL (Time To Live) feature could be added in the future

7. **Bulk Operations**: No support for bulk URL creation or deletion

8. **Search/Filter**: Dashboard does not include search or filter functionality for URLs

9. **Upgrade Functionality**: The 100 URL limit shows an upgrade prompt, but no actual payment/upgrade system is implemented

10. **Link Preview**: No preview of destination URL before redirect

## 🔐 Environment Variables Example

### Backend (.env.example)

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/trimurl
JWT_ACCESS_SECRET=your_secret_here
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_secret_here
JWT_REFRESH_EXPIRES_IN=30d
JWT_RESET_PASSWORD_SECRET=your_secret_here
JWT_RESET_PASSWORD_EXPIRES_IN=10m
BASE_URL=http://localhost:5173
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=TrimURL <your_email@gmail.com>
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nkey\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@project.iam.gserviceaccount.com
```

### Frontend (.env.example)

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=sender_id
VITE_FIREBASE_APP_ID=app_id
```

## 🧪 Testing

To test the application:

1. Start both backend and frontend servers
2. Register a new user account
3. Create a shortened URL
4. Copy and visit the short URL to verify redirection
5. Check dashboard to see click count increment
6. Test all authentication flows (login, logout, password reset)
7. Create 100 URLs to test the usage limit
