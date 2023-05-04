import React, {Component} from "react";
import Sidemenu from "./Sidemenu";
import ChatBox from "./ChatBox";
import Splash from "./Splash";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

export default class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            page : 'splash'
        }
    }

    changePage = (newPage, historyId = undefined) => {
        this.setState({
            page : newPage
        })
        console.log(`history ${historyId}`);
    }

    render() {
        return (
            <div className="App">
                <Sidemenu handleNewChatButtonClick={() => this.changePage('splash')} handleHistoryTabClick={history_id => this.changePage('chats', history_id)} />
                <section className="App-chatbox">
                        {this.state.page === 'splash'
                        ?
                            <Splash />
                        : 
                            <div className="chat-bubble-container">
                                <ChatBubble />
                            </div>
                        }
                    
                    <ChatInput onSendClick={() => this.changePage('chats')} />
                </section>
            </div>
        )
    }
}