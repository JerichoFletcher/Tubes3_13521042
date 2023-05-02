import React from "react";
import { useState } from 'react';
import HistoryTab from "./HistoryTab";

const Sidemenu = (/*{handleHistoryTabClick}*/) => {
    return (
        <aside className="App-sidemenu">
            <div className="App-newchat">
                <button className="new-chat-button">
                    + New Chat
                </button>
            </div>
            <HistoryTab /*onHistoryTabClick={handleHistoryTabClick}*/ />
            <RadioButtons />
        </aside>
    );
}

function RadioButtons() {
    const [selectedOption, setSelectedOption] = useState('Knuth-Morris-Pratt');
  
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
  
    return (
        <div className="radio-box">
            <div className="radio-box-kmp">
                <label className="radio-button-kmp">
                    <input
                        type="radio"
                        name="Knuth-Morris-Pratt"
                        value="Knuth-Morris-Pratt"
                        checked={selectedOption === 'Knuth-Morris-Pratt'}
                        onChange={handleOptionChange}
                    />
                    Knuth-Morris-Pratt
                </label>
            </div>
            <div className="radio-box-bm">
                <label className="radio-button-bm">
                    <input
                        type="radio"
                        name="Boyer-Moore"
                        value="Boyer-Moore"
                        checked={selectedOption === 'Boyer-Moore'}
                        onChange={handleOptionChange}
                    />
                    Boyer-Moore
                </label>
            </div>
        </div>
    );
}

export default Sidemenu