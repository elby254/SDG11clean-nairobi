import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import GarbageRequest from "./pages/GarbageRequest";
import IllegalDump from "./pages/IllegalDump";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <>
      <SignedIn>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request" element={<GarbageRequest />} />
          <Route path="/report" element={<IllegalDump />} />
        </Routes>
      </SignedIn>

      <SignedIn>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request" element={<GarbageRequest />} />
          <Route path="/report" element={<IllegalDump />} />
          <Route path="/admin" element={<AdminDashboard />} /> {/* New */}
        </Routes>
      </SignedIn>

      <SignedOut>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </SignedOut>
    </>
  );
}
