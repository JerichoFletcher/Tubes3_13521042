import React, { useEffect, useState } from "react";
import icon_sendbutton from './../resources/assets/icon_sendbutton.png'
import { publish } from "../event";

const ChatInput = ({onSendClick}) => {
    const [value, setValue] = useState('');

    const handleClick = () => {
        setValue('');
        onSendClick(value);
        publish('onChatListUpdate', []);
    }

    const handleTextChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="chat-input-box">
            <input type="text" rows="1" className="chat-input-textarea" placeholder="Send a message..." value={value} onChange={handleTextChange}/>
            <div className="chat-input-send">
                <button onClick={handleClick}>
                <img src={icon_sendbutton} className="chat-send-button" alt="send-button" />
                </button>
            </div>
        </div>
    );
}

export default ChatInput;