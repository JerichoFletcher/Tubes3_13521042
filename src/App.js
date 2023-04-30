import logo from './resources/assets/logo.png'
import icon_howtouse from './resources/assets/icon_howtouse.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={icon_howtouse} className='App-icon-howtouse' alt="howtouse" style={{width:'3%', marginTop: '4rem', marginBottom: '1rem'}} />
        <div style={{ 
          backgroundColor: '#FFC4D8', 
          padding: '1rem', 
          paddingLeft: '3rem',
          paddingRight: '3rem',
          borderRadius: '1rem',
          lineHeight: 1.0
          }}>
          <p style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 'calc(6px + 2vmin)' }}>
            How to use chwatGwiPwiTi?
          </p>
          <p style={{ fontFamily: 'Nunito', fontWeight: 500, fontSize: 'calc(2px + 1.75vmin)' }}>
            Enter your question on the message box and get your answer immediately!
          </p>
          <p style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 'calc(2px + 1.75vmin)' }}>
            Adding a new question and answer:
          </p>
          <p style={{ fontFamily: 'Nunito', fontWeight: 500, fontSize: 'calc(2px + 1.75vmin)' }}>
            Enter "....................." on the message box
          </p>
          <p style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 'calc(2px + 1.75vmin)' }}>
            Updating answer for a question:
          </p>
          <p style={{ fontFamily: 'Nunito', fontWeight: 500, fontSize: 'calc(2px + 1.75vmin)' }}>
            Enter "....................." on the message box
          </p>
          <p style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 'calc(2px + 1.75vmin)' }}>
            Deleting an existing question:
          </p>
          <p style={{ fontFamily: 'Nunito', fontWeight: 500, fontSize: 'calc(2px + 1.75vmin)' }}>
            Enter "....................." on the message box
          </p>
          <p style={{ fontFamily: 'Nunito', fontWeight: 400, fontSize: 'calc(1px + 1.5vmin)' }}>
            <br />P.S: Don't forget to choose the String Matching Algorithm!
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
