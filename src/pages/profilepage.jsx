import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../components/profile.jsx"; // Ensure correct path
import ScreenReaderControls from "../components/ScreenReaderControls.jsx";

const ProfilePage = () => {
  console.log("ProfilePage is rendering"); // Debugging statement
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
              <ScreenReaderControls /> 
      {isAuthenticated ? <Profile /> : <p>Please log in to view your account details.</p>}


      

    </div>

    
  );
};

export default ProfilePage;
