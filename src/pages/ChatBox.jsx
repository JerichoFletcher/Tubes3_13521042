import React from "react";
import ChatInput from "./ChatInput";
import Splash from "./Splash";

const ChatBox = () => {
    return (
      <section className="App-chatbox">
        <header className="App-header">
          <Splash />
          <ChatInput />
        </header>
      </section>
        
    );
}

export default ChatBox