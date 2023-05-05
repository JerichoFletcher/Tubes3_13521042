import React from "react";

const Bubble = ({text, type}) => {
    return (
        <div className="bubble">
            {type==="Q" ?
                <p className="bubble-date" style={{textAlign: "right"}}>
                    {text.timestamp.toLocaleDateString()} {text.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
            :
                null
            }
            {type==="Q" ?
                <div className="bubble-text" style={{backgroundColor: type==="Q" ? '#FB9EBD' : '#FFC4D8',
                    textAlign: "left",
                    left: type==="Q" ? '' : 0,
                    right: type==="Q" ? 0 : '',
                }}>
                    {text.question}
                </div>
            :
                <div className="bubble-text" style={{backgroundColor: type==="Q" ? '#FB9EBD' : '#FFC4D8',
                    textAlign: "left",
                    left: type==="Q" ? '' : 0,
                    right: type==="Q" ? 0 : '',
                }}>
                    {text.answer}
                </div>
            }
            {type==="Q" ?
                null
            :
                <p className="bubble-date" style={{textAlign: "left"}}>
                    {text.algorithm}{'\n'}
                    {text.timestamp.toLocaleDateString()} {text.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
            }
        </div>
    );
}

const ChatBubble = ({chats}) => {
    return (
        chats.map((chat) => (
            <div className="chat-bubble" key={chat.timestamp}>
                <div className="chat-bubble-q">
                    <Bubble text={chat} type="Q" />
                </div>
                <div className="chat-bubble-a">
                    <Bubble text={chat} type="A" />
                </div>
            </div>
        ))
    );
}

export default ChatBubble;