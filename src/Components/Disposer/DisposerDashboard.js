import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import FirstNavbar from "../Navbars/FirstNavbar";
import TrashDetailsForm from "./TrashDetailsForm";

function DisposerDashboard() {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (user.firstName) {
        setFirstName(user.firstName);
      }
    }
  }, [user, navigate]);

  return (
    <>
      <FirstNavbar />
      {firstName && <SecondNavbardropdown username={firstName} />}
      <TrashDetailsForm />
    </>
  );
}

export default DisposerDashboard;
