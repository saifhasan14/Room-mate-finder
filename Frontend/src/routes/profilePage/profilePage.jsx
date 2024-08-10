import "./profilePage.scss"
import React, { useContext } from 'react'
import List from '../../components/list/List'
import {listData} from "../../lib/dummydata.js";
import Chat from "../../components/chat/Chat.jsx";
import apiRequest from "../../lib/apiRequest.js";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../../context/AuthContext.jsx";

function ProfilePage() {
  
  // const {updateUser, currentUser} = useContext(AuthContext)
  const {updateUser, currentUser} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      await apiRequest.post("/auth/logout");
      // localStorage.removeItem("user");
      updateUser(null);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar: 
              <img src={ currentUser?.avatar|| "/noavatar.jpg"} alt="" />
            </span>
            <span>Username: <b>{currentUser?.username}</b></span>
            <span>E-mail: <b>{currentUser?.email}</b></span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Profile</button>
          </div>
          <List posts={listData}/>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List posts={listData} />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage