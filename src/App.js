// import { useState } from 'react';
import './App.css';
import './normal.css';
import MainPage from './pages/MainPage';

function App({props}) {
    return (
        <MainPage history={props.history} config={props.config} onConfigChange={props.onConfigChange}/>
    );
}

export default App;
