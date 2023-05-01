import React from "react";
import logo from './../resources/assets/logo.png'
import icon_howtouse from './../resources/assets/icon_howtouse.png'
import icon_sendbutton from './../resources/assets/icon_sendbutton.png'

const Splash = () => {
    return (
      <section className="App-chatbox">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={icon_howtouse} className='App-icon-howtouse' alt="howtouse" />
          <div className="App-howtouse-text">
            <p className="text-howtouse-title">
              How to use chwatGwiPwiTi?
            </p>
            <p className="text-howtouse-desc">
              Enter your question on the message box and get your answer immediately!
            </p>
            <p className="text-howtouse-add">
              Adding a new question and answer:
            </p>
            <p className="text-howtouse-add-desc">
              Enter "....................." on the message box
            </p>
            <p className="text-howtouse-update">
              Updating answer for a question:
            </p>
            <p className="text-howtouse-update-desc">
              Enter "....................." on the message box
            </p>
            <p className="text-howtouse-delete">
              Deleting an existing question:
            </p>
            <p className="text-howtouse-delete-desc">
              Enter "....................." on the message box
            </p>
            <p className="text-howtouse-ps">
              <br />P.S: Don't forget to choose the String Matching Algorithm!
            </p>
          </div>
          <div className="chat-input-box">
            <input type="text" rows="1" className="chat-input-textarea" placeholder="Send a message..." />
            <div className="chat-input-send">
                <button>
                <img src={icon_sendbutton} className="chat-send-button" alt="send-button" />
                </button>
            </div>
          </div>
        </header>
      </section>
        
    );
}

export default Splash