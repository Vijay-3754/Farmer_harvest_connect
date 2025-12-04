# Farmer Harvest Connect

A digital B2B market solution that connects Farmers and Industrial Buyers. This platform enables farmers to market their crops directly to buyers, eliminating intermediaries and ensuring fair pricing.

## Features

- **User Authentication**: Secure login and registration system for farmers, buyers, and sellers
- **Dashboard**: Intuitive dashboards for different user roles
- **Order Management**: Comprehensive order processing and status tracking
- **Product Management**: Tools for sellers to add, update, and manage agricultural inputs
- **Educational Resources**: Access to farming educational resources and best practices
- **Agricultural Market**: Marketplace for farmers to browse and purchase agricultural inputs

## Tech Stack

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Directory Structure

```
src_mern/
├── backend/           # Backend API code
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── helpers/       # Helper functions
│   └── app.js         # Main server file
├── client/            # React frontend
│   ├── public/        # Static files
│   └── src/           # React components and logic
│       ├── components/# React components
│       └── App.jsx    # Main React component
└── scripts/           # Utility scripts
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/farmer-harvest-connect.git
   cd farmer-harvest-connect
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../client
   npm install
   ```

4. Create a `.env` file in the backend directory with your MongoDB connection string and JWT secret:
   ```
   CONNECTION_STRING=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   API_URL=/api/v1
   PORT=4000
   LICENSE_CODE=your_license_code           # optional: overrides helpers/config.json
   LICENSE_DEVICE_ID=your_license_device_id # optional: overrides helpers/config.json
   LICENSE_CHECK_DISABLED=false             # set true to bypass license gate (e.g. on Render)
   ```

5. Start the backend server:
   ```
   npm start
   ```

6. In a new terminal, start the React frontend:
   ```
   cd ../client
   npm start
   ```

## Deploying the Backend to Render

1. Push the latest code to GitHub.
2. In the Render dashboard, create a **Web Service** pointing to this repo and set the root directory to `backend`.
3. Use `npm install` as the build command and `npm start` as the start command.
4. In the Render Environment tab, add the variables listed above (`CONNECTION_STRING`, `JWT_SECRET`, `API_URL`, optional license variables, and `LICENSE_CHECK_DISABLED=true` if you want to bypass the machine check in the cloud).
5. Deploy the service. Render assigns a public URL such as `https://your-app.onrender.com`; use that URL for the frontend’s API base.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Indian Council of Agricultural Research for educational resources
- Access Agriculture for agroecological learning videos 