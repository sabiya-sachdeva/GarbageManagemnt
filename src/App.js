import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import WasteProvider from "./Components/Contexts/WasteContext";
import WasteSorting from "./Components/WasteSorting/WasteSorting";
import Home from "./Components/Home";
import CTA from "./Components/Login/CTA";
import Signup from "./Components/Login/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import CollectorDashboard from "./Components/Collector/CollectorDashboard";
import DisposerDashboard from "./Components/Disposer/DisposerDashboard";
import Profile from "./Components/Profile/Profile";
import TrackOrder from "./Components/TrackOrder/TrackOrder";
import Login from "./Components/Login/Login";
import PrivacyPolicy from "./Components/Login/PrivacyPolicy";
import CollectTrash from "./Components/Collector/CollectTrash";
import ForgetPassword from "./Components/Login/ForgetPassword";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";
import Blog from "./Components/Blogs/Blog";

function App() {
  return (
    <WasteProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<WasteSorting />} />
        <Route path="/cta" element={<CTA />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/forgotpass" element={<ForgetPassword />} />
        <Route path="/collecttrash" element={<CollectTrash />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/collector-dashboard" element={<CollectorDashboard />} />
        <Route path="/seller-dashboard" element={<DisposerDashboard />} />
        <Route path="/collector-dashboard" element={<CollectorDashboard />} />
        <Route path="/seller-dashboard" element={<DisposerDashboard />} />
        <Route path="/blog"  element={<Blog/>} />
      </Routes>
    </WasteProvider>
  );
}

export default App;
