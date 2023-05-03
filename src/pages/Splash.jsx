import React from "react";
import logo from './../resources/assets/logo.png'
import icon_howtouse from './../resources/assets/icon_howtouse.png'

const Splash = () => {
    return (
      <div className = "App-splash">
        <img src={logo} className="App-logo" alt="logo" />
          <img src={icon_howtouse} className='App-icon-howtouse' alt="howtouse" />
          <div className="App-howtouse-text">
            <p className="text-howtouse-title">
              How to use chwatGwiPwiTi?
            </p>
            <p className="text-howtouse-desc">
              Enter your question on the message box and get your answer immediately!
            </p>
            <p className="text-howtouse-calc">
              Calculator feature:
            </p>
            <p className="text-howtouse-calc-desc">
              Enter a math operation (+, -, *, /, **) on the message box
            </p>
            <p className="text-howtouse-calendar">
              Calendar feature:
            </p>
            <p className="text-howtouse-calendar-desc">
              Enter a date on the message box and get the day of the date you asked
            </p>
            <p className="text-howtouse-add">
              Adding a new question and answer:
            </p>
            <p className="text-howtouse-add-desc">
              Enter "Add question {"<"}question{">"} with answer {"<"}answer{">"}" on the message box
            </p>
            <p className="text-howtouse-update">
              Updating answer for an existing question:
            </p>
            <p className="text-howtouse-update-desc">
              Enter "Add question {"<"}existed_question{">"} with answer {"<"}answer{">"}" on the message box
            </p>
            <p className="text-howtouse-delete">
              Deleting an existing question:
            </p>
            <p className="text-howtouse-delete-desc">
              Enter "Delete question {"<"}question{">"}" on the message box
            </p>
            <p className="text-howtouse-ps">
              <br />P.S: Don't forget to choose the String Matching Algorithm!
            </p>
          </div>
      </div>
        
    );
}

export default Splash