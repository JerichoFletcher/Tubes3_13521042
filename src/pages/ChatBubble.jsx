import React from "react";

const Bubble = ({text, type}) => {
    return (
        <div className="bubble"
            style={{backgroundColor: type==="Q" ? '#FB9EBD' : '#FFC4D8',
                textAlign: type==="Q" ? "right" : "left",
                left: type==="Q" ? '' : 0,
                right: type==="Q" ? 0 : '',
            }}
        >
            {type==="Q" ? <p>{text.question}</p> : <p>{text.answer}</p>}
        </div>
    );
}

const ChatBubble = () => {
    const chatHistory = [
        {
           history_id: 1,
           timestamp: new Date(2023, 5, 3, 10, 15, 23),
           question: "Ini apa?",
           answer: "Ini itu",
           algorithm: "KMP"
        },
        {
            history_id: 1,
            timestamp: new Date(2023, 5, 3, 10, 16, 23),
            question: "Itu apa?",
            answer: "Itu ini",
            algorithm: "BM"
        },
        {
            history_id: 1,
            timestamp: new Date(2023, 5, 3, 10, 18, 46),
            question: "Apakah ini adalah itu?",
            answer: "Tidak, ini bukan itu",
            algorithm: "KMP"
        }
    ];

    return (
        chatHistory.map((chat) => (
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