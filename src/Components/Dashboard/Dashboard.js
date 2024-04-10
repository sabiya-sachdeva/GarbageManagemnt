import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import CollectorDashboard from "../Collector/CollectorDashboard";
import DisposerDashboard from "../Disposer/DisposerDashboard";

function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user authentication is verified
    if (!user) {
      setLoading(true); // Set loading to true if user authentication is not verified
    } else {
      setLoading(false); // Set loading to false once user authentication is verified
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while verifying authentication
  }

  return (
    <>
      {user && user.usertype === "collector" ? (
        <CollectorDashboard />
      ) : (
        <DisposerDashboard />
      )}
    </>
  );
}

export default Dashboard;
