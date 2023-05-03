import React from "react";
import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatBubble from "./ChatBubble";
import Splash from "./Splash";

const ChatBox = (/*{onHistoryTabClick}*/) => {
    const [showSplash, setShowSplash] = useState(true);

    const handleSendClick = () => {
        setShowSplash(false);
    }
    
    // const handleHistoryTabClick = () => {
    //   setShowSplash(false);
    // }
    
    // if (onHistoryTabClick){
    //     onHistoryTabClick = {handleHistoryTabClick};
    // }

    return (
        <section className="App-chatbox">
            {/* {showSplash && <Splash />} */}
            <div className="chat-bubble-container">
                <ChatBubble />
            </div>
            <ChatInput onSendClick={handleSendClick} />
        </section>
    );
}

export default ChatBox