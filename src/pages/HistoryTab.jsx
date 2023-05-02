import React from "react";

const HistoryTab = ({onHistoryTabClick}) => {
    const handleClick = () => {
        onHistoryTabClick();
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
        }
    ];

    return ( 
        histories.map((history) => (
            <div className="history-tab" key={history.history_id}>
                <button className="history-tab-button" onClick={handleClick}>
                    {history.history_name}
                </button>
            </div>
        ))
    );
}

export default HistoryTab;