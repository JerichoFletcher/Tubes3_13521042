import React, {Component} from "react";
import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatBubble from "./ChatBubble";
import Splash from "./Splash";

/*
export default class ChatBox extends Component {
    render() {
        return (
            <section className="App-chatbox">
                { this.props.page==='chats' ?
                    <div className="chat-bubble-container">
                        <ChatBubble />
                    </div>
                :
                    <Splash />
                }
                <ChatInput onSendClick={() => this.props.changePage('chats')} />
            </section>
        )
    }
}

*/

/*
const ChatBox = () => {
    // const [showSplash, setShowSplash] = useState(true);
    const [isSendButtonClicked, setIsSendButtonClicked] = useState(false);

    const handleSendClick = () => {
        setIsSendButtonClicked(true);
        // setShowSplash(false);
    }

    return (
        <section className="App-chatbox">
            {isSendButtonClicked ? null :
                <div className="chat-bubble-container">
                    <ChatBubble />
                </div>
            }
            <ChatInput onSendClick={handleSendClick} />
        </section>
    );
}

export default ChatBox
*/