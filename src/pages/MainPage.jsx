import React, {Component} from "react";
import Sidemenu from "./Sidemenu";
// import ChatBox from "./ChatBox";
import Splash from "./Splash";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

// export default class MainPage extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             page : 'splash'
//         }
//     }

const updatePage = (props, historyId = undefined) => {
    // this.setState({
    //     page : newPage
    // })
    if(typeof props.chat !== 'object' || !(props.chat instanceof Array))throw new TypeError(`Expected Array, got ${typeof props.chat}`);
    console.log(`[PAGE] Selected history of ID '${historyId}' with length ${this.props.chat.length}`);
    props.chat.push({
        history_id: 1,
        timestamp: new Date(2023, 6, 3, 10, 16, 23),
        question: "Itu blahhhhh",
        answer: "Itu blahhhhhh",
        algorithm: "BM"
    });
}

function MainPage({props}){
    return (
        <div className="App">
            <Sidemenu props={props} handleConfigChange={config => props.onConfigChange(config)} handleNewChatButtonClick={() => updatePage(props)} handleHistoryTabClick={history_id => updatePage(props, history_id)} />
            <section className="App-chatbox">
                    {/* {this.state.page === 'splash'
                    ?
                        <Splash />
                    : 
                        <div className="chat-bubble-container">
                            <ChatBubble />
                        </div>
                    } */
                    props.chat.length > 0
                    ?
                        <div className="chat-bubble-container">
                            <ChatBubble props={props} />
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
