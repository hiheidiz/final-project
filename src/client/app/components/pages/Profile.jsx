import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../utilities";
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = "Profile Page";
  }, []);

  let userid = useParams().userId;
  useEffect(() => {
    get("/api/user", { userid: userid }).then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      {!user ? (
        <div> Loading! </div>
      ) : (
        <>
          <div className="Profile-avatarContainer">
            <div className="Profile-avatar" />
          </div>
          <h1 className="Profile-name u-textCenter">{user.name}</h1>
          <hr className="Profile-line" />
          <div className="u-flex">
            <div className="Profile-subContainer u-textCenter">
              <h4 className="Profile-subTitle">About Me</h4>
              <div id="profile-description">
                I am really allergic to cats I don't know why I have a catbook
              </div>
            </div>
            <div className="Profile-subContainer u-textCenter">
              <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
              <div id="favorite-cat">corgi</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
