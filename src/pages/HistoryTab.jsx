import React from "react";

const HistoryTab = ({onHistoryTabClick}) => {

    const handleClick = (history_id) => {
        onHistoryTabClick(history_id);
    };

    const histories = [
        {
           history_id: 1,
           history_name: "History 1"
        },
        {
           history_id: 2,
           history_name: "History 2"
        },
        {
           history_id: 3,
           history_name: "History 3"
        },
        {
           history_id: 4,
           history_name: "History 4"
        },
        {
           history_id: 5,
           history_name: "History 5"
        },
        {
           history_id: 6,
           history_name: "History 6"
        },
        {
           history_id: 7,
           history_name: "History 7"
        },
        {
           history_id: 8,
           history_name: "History 8"
        },
        {
           history_id: 9,
           history_name: "History 9"
        },
        {
           history_id: 10,
           history_name: "History 10"
        }
    ];

    return ( 
        histories.map((history) => (
            <button key={history.history_id.toString()} className="history-tab-button" onClick={() => handleClick(history.history_id)}>
                {history.history_name}
            </button>
        ))
    );
}

export default HistoryTab;