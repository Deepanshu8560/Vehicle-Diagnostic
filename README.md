# Vehicle Diagnostics Dashboard 🚗⚡

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)

A powerful, real-time dashboard for monitoring electric vehicle telematics. This application simulates and visualizes critical vehicle data including battery health, motor performance, tire pressure, and GPS location for a fleet of vehicles.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Vehicle+Diagnostics+Dashboard+Preview)

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Configuration](#-configuration)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Real-time Monitoring**: Live updates of vehicle telemetry using simulated data streams.
- **Component Analysis**: Detailed breakdown of Battery, Motor, Tires, and GPS health.
- **Interactive Visualizations**: Dynamic charts and graphs powered by Chart.js and Recharts.
- **Vehicle Fleet Management**: Switch between different vehicle models (Model S, 3, X, Y) to view specific data.
- **Responsive Design**: Modern, glassmorphism-inspired UI built with TailwindCSS and Radix UI.
- **Status Alerts**: Automatic categorization of vehicle status (Excellent, Good, Warning) based on diagnostic thresholds.

## 🏗 Architecture

The project follows a modern client-server architecture:

### Tech Stack

**Frontend**
- **Framework**: React 19 with Create React App (CRACO)
- **Styling**: TailwindCSS, Radix UI Primitives, Lucide Icons
- **State Management**: Zustand / React Context
- **Data Fetching**: Axios

**Backend**
- **Framework**: FastAPI (Python)
- **Database**: MongoDB (via Motor async driver)
- **Server**: Uvicorn

### Overview
The **Backend** serves a REST API that generates realistic mock data for vehicle diagnostics. It exposes endpoints for vehicle listing, specific vehicle details, and real-time diagnostic snapshots.
The **Frontend** allows users to select a vehicle and polls the backend to display live updates on the dashboard.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **MongoDB** (running locally on default port 27017)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vehicle-diagnostics-dashboard.git
   cd vehicle-diagnostics-dashboard
   ```

2. **Backend Setup**
   Navigate to the backend directory and create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```
   Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   *Note: If you encounter issues with `emergentintegrations`, it has been removed from the required packages.*

3. **Frontend Setup**
   Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
   Install dependencies (use legacy peer deps if needed for React 19 compatibility):
   ```bash
   npm install --legacy-peer-deps
   # ensure you also have ajv compatible version if needed
   npm install ajv@8 --legacy-peer-deps
   ```

### Running Locally

You need to run the backend and frontend in separate terminals.

**Terminal 1: Backend**
```bash
cd backend
# Make sure your virtual environment is activated
python -m uvicorn server:app --reload
```
The API will be available at `http://localhost:8000`. You can view the automatic API docs at `http://localhost:8000/docs`.

**Terminal 2: Frontend**
```bash
cd frontend
npm start
```
The application will open at `http://localhost:3000`.

## ⚙️ Configuration

### Environment Variables

**Backend (`backend/.env`)**
Create a `.env` file in the `backend` folder:
```ini
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
```

**Frontend (`frontend/.env`)**
(Optional) If you need to change the API URL:
```ini
REACT_APP_API_URL=http://localhost:8000/api
```

## 🧪 Testing

### Backend Tests
The project includes a test suite for the backend logic.
```bash
# Run from the root directory
python backend_test.py
```
Or if using `pytest` within the backend directory:
```bash
cd backend
pytest
```

### Frontend Tests
Run the standard React test suite:
```bash
cd frontend
npm test
```

## 📂 Project Structure

```text
├── backend/
│   ├── server.py             # Main FastAPI application entry point
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # Backend configuration
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── App.js            # Main React component
│   │   └── index.css         # Global styles & Tailwind config
│   ├── public/
│   ├── craco.config.js       # CRA configuration override
│   ├── package.json          # Frontend dependencies
│   └── ...
├── backend_test.py           # Backend integration tests
├── README.md                 # Project documentation
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Authors

- **User Name** - *Initial Work* - [YourProfile](https://github.com/yourprofile)

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives.
- [TailwindCSS](https://tailwindcss.com) for the utility-first CSS framework.
- [FastAPI](https://fastapi.tiangolo.com) for the high-performance Python backend.
