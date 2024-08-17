# React Chat Application

This is a React-based chat application with authentication and chat features, utilizing Firebase for backend services.

## Features

- User authentication via email/password and Google Sign-In
- User registration with profile picture upload
- Real-time chat functionality
- Protected routes to ensure users are authenticated

## Technologies Used

- **React**: Front-end library for building user interfaces
- **Firebase**: Backend services for authentication, Firestore (NoSQL database), and storage
- **React Router**: For navigation and routing
- **FontAwesome**: For Google Sign-In button icon
- **Firebase Storage**: For storing user profile pictures

## Components

- **Home**: Main page of the chat application with a sidebar and chat window.
- **Login**: Page for user authentication with email/password or Google Sign-In.
- **Register**: Page for user registration with profile picture upload.
- **ProtectedRoute**: Component to handle route protection for authenticated users only.
## Sending and Previewing Files
The application allows users to send and preview image and PDF files within the chat.

- **Image Files**:
Users can upload and send image files, which are then displayed in the chat window. The application supports common image formats (e.g., JPEG, PNG).

- **PDF Files**:
Users can also upload and send PDF files. Thumbnails of the PDF files are previewed in the chat window, allowing users to view the first page of the PDF directly in the chat.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/kalyannadella/chat_application-using-React.git
2. Navigate to the project directory:
   ```bash
   cd chat_application-using-React
3. Install Dependencies
   ```bash
   npm install
4. Run the application
    ```bash
    npm run dev


## Set up Firebase:

- Create a Firebase project and configure authentication, Firestore, and storage.
- Replace the Firebase configuration in src/firebase.js with your project credentials.

## Firebase Configuration

- Make sure to replace the placeholder Firebase configuration in src/firebase.js with your own Firebase project credentials.

## Utility Functions

- formatTime: Formats timestamps to a human-readable format (e.g., "just now", "5 minutes ago", etc.).


