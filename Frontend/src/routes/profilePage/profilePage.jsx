import "./profilePage.scss"
import React from 'react'
import List from '../../components/list/List'
import {listData} from "../../lib/dummydata.js";
import Chat from "../../components/chat/Chat.jsx";

function ProfilePage() {

  const handleLogout = () => {
    
  }


  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar: 
              <img src="/noavatar.jpg" alt="" />
            </span>
            <span>Username: <b>John doe</b></span>
            <span>E-mail: <b>John@gmail.com</b></span>
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