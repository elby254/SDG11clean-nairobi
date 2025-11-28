## CleanNairobi — a MERN-based platform that helps Nairobi residents request waste collection, report dumpsites, and track pickup status in real time.

Frontend (React + Clerk + Tailwind v4)

# Folder Structure (src/)

src/
├─ components/
│   ├─ Navbar.jsx
│   ├─ GarbageRequestForm.jsx
│   └─ ReportDumpForm.jsx
├─ pages/
│   ├─ Home.jsx
│   ├─ Login.jsx
│   ├─ Dashboard.jsx
│   ├─ GarbageRequest.jsx
│   └─ IllegalDump.jsx
├─ index.css          // Tailwind v4 styles
├─ main.jsx           // React entry, ClerkProvider, BrowserRouter
└─ App.jsx            // Routes and SignedIn/SignedOut logic


## Functionalities Implemented on Frontend

Authentication

Clerk handles authentication for both citizens and admins.

Citizens must log in to submit requests/reports.

SignedIn vs SignedOut routes ensure restricted access.

# Pages & Components

Home.jsx: Landing page with welcome message.

Login.jsx: Redirect/login page via Clerk.

Dashboard.jsx: Admin panel showing garbage requests and illegal dump reports.

GarbageRequest.jsx: Citizen form to request garbage collection.

IllegalDump.jsx: Citizen form to report illegal dumpsites with image upload.

Navbar.jsx: Navigation component.

# Styling

Tailwind v4 provides responsive, utility-first styling.

Current dashboard background: gray-100, cards: white with shadow and rounded corners.

# API Integration (Axios)

axios.defaults.baseURL = "http://localhost:5000"

## Frontend makes HTTP requests to:

/api/requests → Garbage collection requests.

/api/reports → Illegal dumpsite reports.


### Backend (Node + Express + MongoDB)

# Folder Structure (server/src/)

src/
├─ config/
│   └─ db.js          // MongoDB connection
├─ models/
│   ├─ GarbageRequest.js
│   └─ IllegalDumpReport.js
├─ routes/
│   ├─ requests.js
│   └─ reports.js
└─ server.js          // Express app, Socket.io, route setup


## Functionalities Implemented on Backend

Database

MongoDB stores requests and reports.

# Models:

GarbageRequest: { userId, description, date }

IllegalDumpReport: { userId, location, image, date }

# Routes

POST /api/requests → Add new garbage request.

POST /api/reports → Add new illegal dump report.

GET /api/requests → Get all requests (admin).

GET /api/reports → Get all reports (admin).

# Real-time Updates

Socket.io is set up for emitting new requests/reports to all connected clients.

Current Dashboard fetches via HTTP; Socket.io integration optional but ready.

#### SDG 11 Alignment

The app directly supports SDG 11 (Sustainable Cities and Communities) in these ways:

Citizen Participation

Citizens can actively report illegal dumpsites or request garbage collection.

Encourages community involvement in sustainable urban waste management.

Cleaner Urban Environment

Admin can monitor reports efficiently, helping Nairobi’s neighborhoods stay cleaner.

Real-time updates enable faster response to urban waste issues.

Waste Management Efficiency

Centralized admin dashboard allows coordinated response from collectors.

Data-driven approach supports sustainable urban planning.

Digital Awareness

Encourages the use of technology to improve city living standards.