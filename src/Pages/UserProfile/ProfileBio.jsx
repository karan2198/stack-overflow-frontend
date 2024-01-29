import React from "react";
import "./UsersProfile.css";
const ProfileBio = ({ currentProfile , isDay }) => {
  return (
    <div>
      <div>
        {currentProfile?.tags.length !== 0 ? (
          <>
            <h4 className={`td ${isDay ? 'day' : 'night'}`}>Tags watched</h4>
            {currentProfile?.tags.map((tag) => (
              <p className={`tdt ${isDay ? 'day' : 'night'}`} key={tag}>{tag}</p>
            ))}
          </>
        ) : (
          <p className={`td ${isDay ? 'day' : 'night'}`}>0 tags watched</p>
        )}
      </div>
      <div>
        {currentProfile?.about ? (
          <>
            <h4 className={`Ad ${isDay ? 'day' : 'night'}`}>About</h4>
            <p className={`AdA ${isDay ? 'day' : 'night'}`}>{currentProfile?.about}</p>
          </>
        ) : (
          <p className={`Ad ${isDay ? 'day' : 'night'}`}>No bio found</p>
        )}
      </div>
    </div>
  );
};

export default ProfileBio;
