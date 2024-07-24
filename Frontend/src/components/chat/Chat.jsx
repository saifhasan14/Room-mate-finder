import { useState } from "react";
import "./chat.scss";

function Chat() {
    const [chat, setChat] = useState(true)

  return (
    <div className="chat">
        <div className="messages">
            <h1>Messages</h1>
            <div className="message">
                <img src="/noavatar.jpg" alt="" />
                <span>John doe</span>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. A temporibus, 
                </p>
            </div>
            <div className="message">
                <img src="/noavatar.jpg" alt="" />
                <span>John doe</span>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. A temporibus, 
                </p>
            </div>
            <div className="message">
                <img src="/noavatar.jpg" alt="" />
                <span>John doe</span>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. A temporibus, 
                </p>
            </div>
            <div className="message">
                <img src="/noavatar.jpg" alt="" />
                <span>John doe</span>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. A temporibus, 
                </p>
            </div>
            <div className="message">
                <img src="/noavatar.jpg" alt="" />
                <span>John doe</span>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. A temporibus, 
                </p>
            </div>
        </div>
        { chat && (<div className="chatBox">
            <div className="top">
                <div className="user">
                    <img src="" alt="" />
                    John doe
                </div>
                <span className="close" onClick={() => setChat(null)}>X</span>
            </div>
            <div className="center">
                <div className="chatMessage">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage own">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage own">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage ">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage own">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <span>1 hour ago</span>
                </div>
            </div>
            <div className="bottom">
                <textarea ></textarea>
                <button>Send</button>
            </div>
        </div>)}
    </div>
  )
}

export default Chat