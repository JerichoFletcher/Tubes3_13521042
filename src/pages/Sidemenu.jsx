import React, { useEffect } from "react";
import { useState } from 'react';
import HistoryTab from "./HistoryTab";
import { subscribe, unsubscribe } from "../event";

const Sidemenu = ({props, handleConfigChange, handleNewChatButtonClick, handleHistoryTabClick}) => {
    const [historyList, setHistoryList] = useState(props.history);

    useEffect(() => {
        subscribe('onHistoryListUpdate', event => setHistoryList(event.detail));
        console.log('[INFO] Triggering event listener: HistoryTab::onHistoryListUpdate');
        return () => {
            unsubscribe('onHistoryListUpdate', _ => setHistoryList([]));
        };
    });

    return (
        <aside className="App-sidemenu">
            <button className="new-chat-button" onClick={handleNewChatButtonClick}>
                + New Chat
            </button>
            <div className="history-tab">
                <HistoryTab histories={historyList} onHistoryTabClick={history_id => handleHistoryTabClick(history_id)} />
            </div>
            <div className="sidemenu-settings">
                <Slider onValueChange={value => {
                    console.log(`[PAGE] Selected uwuification level: ${value}`);
                    handleConfigChange({uwuifyLevel: parseFloat(value)});
                    }}/>
                <RadioButtons onValueChange={value => {
                    console.log(`[PAGE] Selected algorithm: ${value}`);
                    handleConfigChange({algorithm: value});
                    }}/>
            </div>
        </aside>
    );
}

function RadioButtons({onValueChange}) {
    const [selectedOption, setSelectedOption] = useState('KMP');
  
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        onValueChange(event.target.value);
    };
  
    return (
        <div className="radio-box">
            <div className="radio-box-kmp">
                <label className="radio-button-kmp">
                    <input
                        type="radio"
                        name="Knuth-Morris-Pratt"
                        value="KMP"
                        checked={selectedOption === 'KMP'}
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
                        value="BM"
                        checked={selectedOption === 'BM'}
                        onChange={handleOptionChange}
                    />
                    Boyer-Moore
                </label>
            </div>
        </div>
    );
}

const Slider = ({onValueChange}) => {
    const [value, setValue] = useState(0);
  
    const handleChange = (event) => {
        setValue(event.target.value);
        onValueChange(event.target.value);
    };
  
    return (
      <div className="slider-uwu">
        <p>uwu level: {value}</p>
        <input className="slider-uwu-input" type="range" min="0" max="3" value={value} onChange={handleChange} />
      </div>
    );
  };

export default Sidemenu