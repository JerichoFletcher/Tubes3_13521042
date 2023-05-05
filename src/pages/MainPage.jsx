import React, { useEffect, useState } from "react";
import Sidemenu from "./Sidemenu";
import Splash from "./Splash";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { subscribe, unsubscribe } from "../event";

// const updatePage = (props, historyId = undefined) => {
//     if(typeof props.chat !== 'object' || !(props.chat instanceof Array))throw new TypeError(`Expected Array, got ${typeof props.chat}`);
//     console.log(`[PAGE] Selected history of ID '${historyId}' with length ${this.props.chat.length}`);
//     props.chat.push({
//         history_id: 1,
//         timestamp: new Date(2023, 6, 3, 10, 16, 23),
//         question: "Itu blahhhhh",
//         answer: "Itu blahhhhhh",
//         algorithm: "BM"
//     });
// }

function MainPage({props}){
    const [chatList, setChatList] = useState(props.chat);

    useEffect(() => {
        subscribe('onChatListUpdate', event => setChatList(event.detail));
        console.log('[INFO] Triggering event listener: MainPage::onChatListUpdate');
        return () => {
            unsubscribe('onChatListUpdate', _ => {});
        }
    });

    return (
        <div className="App">
            <Sidemenu props={props} handleConfigChange={config => props.onConfigChange(config)} handleNewChatButtonClick={() => props.onReloadChat(null)} handleHistoryTabClick={history_id => props.onReloadChat(history_id)} />
            <section className="App-chatbox">
                    {/* {this.state.page === 'splash'
                    ?
                        <Splash />
                    : 
                        <div className="chat-bubble-container">
                            <ChatBubble />
                        </div>
                    } */
                    chatList.length > 0
                    ?
                        <div className="chat-bubble-container">
                            <ChatBubble chats={chatList} />
                        </div>
                    :
                        <Splash />
                    }
                
                <ChatInput onSendClick={query => props.onReadQuery(query)} />
            </section>
        </div>
    )
}

export default MainPage;
