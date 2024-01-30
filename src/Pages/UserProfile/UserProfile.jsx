import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UsersProfile.css";

const UserProfile = ({ slideIn, handleSlideIn, isDay }) => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);
  const [loginHistory, setLoginHistory] = useState([]);


  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        const response = await fetch(`https://stack-overflow-backend-qf3u.onrender.com/user/history/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch login history');
        }
        const data = await response.json();
        const latestEntry = data[0];
        console.log('Login history data:', data);
        setLoginHistory([latestEntry]);
      } catch (error) {
        console.error('Error fetching login history:', error);

      }
    };

    fetchLoginHistory();
  }, [id]);

  const renderLoginHistory = () => {
    return (
      <div className={` lgh ${isDay ? 'day' : 'night'}`}>
        <h2>Login History</h2>
        <ul>
          {loginHistory.map((entry) => (
            <li key={entry._id}>
              <p>Timestamp: {moment(entry.timestamp).format("LLL")}</p>
              <p>Browser: {entry.browser}</p>
              <p>Device: {entry.device}</p>
              <p>OS: {entry.os}</p>
              <p>IP: {entry.ipAddress}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} isDay={isDay}/>
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className={`user-name ${isDay ? 'day' : 'night'} `}>
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result._id === id && (
              <button
                type="button"
                onClick={() => setSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
          <>
            {Switch ? (
              <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} isDay={isDay}/>
            ) : (
              <>
                <ProfileBio currentProfile={currentProfile} isDay={isDay} />
                {renderLoginHistory()}

              </>
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
