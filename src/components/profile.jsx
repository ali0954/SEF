import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/profile.css"; // Make sure you have this import to load your styles

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>; // Or any other message you prefer
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <img src={user.picture} alt={user.name} className="profile-img" />
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Nickname:</strong> {user.nickname}</p>
    </div>
  );
};

export default Profile;
