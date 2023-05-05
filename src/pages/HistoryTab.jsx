import React from "react";

const HistoryTab = ({histories, onHistoryTabClick}) => {
    const handleClick = (history_id) => {
        onHistoryTabClick(history_id);
    };
    
    return ( 
        histories.map((history) => (
            <button key={history.history_id.toString()} className="history-tab-button" onClick={() => handleClick(history.history_id)}>
                {history.history_name}
            </button>
        ))
    );
}

export default HistoryTab;