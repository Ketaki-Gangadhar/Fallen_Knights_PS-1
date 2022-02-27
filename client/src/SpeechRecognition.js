import React from 'react';


class SpeechRecognition extends React.Component {

    handlePause = () => {

    }

    handlePause = () => {

    }

    handleStop = () => {

    }

    render() {
        return <>


        <div className="microphone-wrapper">

            <div className="mircophone-container">

        <div className="microphone-icon-container">
          <img src={microPhoneIcon} className="microphone-icon" style={{width:"100px"}}/>
        </div>

        <div className="microphone-status">
          Click to start Listening
        </div>

        <button className="microphone-stop btn" >
          Stop
        </button>

      </div>

        <div className="microphone-result-container">

          <div className="microphone-result-text">Speech text here</div>

          <button className="microphone-reset btn" >
            Reset
          </button>

        </div>

    </div>


        </>;
    }





};

export default SpeechRecognition;




