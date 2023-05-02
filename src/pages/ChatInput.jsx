import React from "react";
import icon_sendbutton from './../resources/assets/icon_sendbutton.png'

const ChatInput = () => {
    return (
        <div className="chat-input-box">
            <input type="text" rows="1" className="chat-input-textarea" placeholder="Send a message..." />
            <div className="chat-input-send">
                <button>
                <img src={icon_sendbutton} className="chat-send-button" alt="send-button" />
                </button>
            </div>
        </div>
    );
}

export default ChatInput;