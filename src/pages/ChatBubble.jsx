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

const ChatBubble = ({props}) => {
    // const chatHistory = [
    //     {
    //        history_id: 1,
    //        timestamp: new Date(2023, 5, 3, 10, 15, 23),
    //        question: "Ini apa?",
    //        answer: "Ini itu",
    //        algorithm: "KMP"
    //     },
    //     {
    //         history_id: 1,
    //         timestamp: new Date(2023, 5, 3, 10, 16, 23),
    //         question: "Itu apa?",
    //         answer: "Itu ini",
    //         algorithm: "BM"
    //     },
    //     {
    //         history_id: 1,
    //         timestamp: new Date(2023, 5, 3, 10, 18, 46),
    //         question: "1Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
    //         answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
    //         algorithm: "KMP"
    //     },
    //     {
    //         history_id: 1,
    //         timestamp: new Date(2023, 5, 3, 13, 18, 6),
    //         question: "2Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
    //         answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
    //         algorithm: "KMP"
    //     },
    //     {
    //         history_id: 1,
    //         timestamp: new Date(2023, 5, 3, 22, 0, 11),
    //         question: "3Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
    //         answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
    //         algorithm: "KMP"
    //     },
    //     {
    //         history_id: 1,
    //         timestamp: new Date(2023, 5, 3, 22, 18, 46),
    //         question: "4Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
    //         answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
    //         algorithm: "KMP"
    //     },
    //     {
    //         history_id: 1,
    //         timestamp: new Date(2023, 5, 3, 23, 23, 23),
    //         question: "5Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
    //         answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
    //         algorithm: "KMP"
    //     },
    //     {
    //         history_id: 1,
    //         timestamp: new Date(2023, 5, 4, 22, 18, 46),
    //         question: "6Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
    //         answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
    //         algorithm: "KMP"
    //     },
    //     {
    //         history_id: 1,
    //         timestamp: new Date(2023, 5, 5, 22, 18, 46),
    //         question: "7Mengapa apa bagaimana siapa kapan di mana ke mana aku siapa aku siapa aku siapa aing maung rawr ini dummy buat question lebih dari satu baris aja sih?",
    //         answer: "Lorem ipsum dolor sit amet bla bla bla stima menyenangkan wow keren bentar lagi UAS wow sebenernya ini dummy text buat ngetest bubble chat lebih dari satu baris sih wkwk",
    //         algorithm: "KMP"
    //     }
    // ];

    return (
        props.chat.map((chat) => (
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