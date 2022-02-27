import React , {useRef , useState} from 'react';
import SpeechRecognition , { useSpeechRecognition } from 'react-speech-recognition';
import './SpeechToText.css';
import image2 from './Image2.jpg'
import sendText from './apis/sendText' ;

import Modal from './Modal';

const SpeechToText = ({number , setResult})=> {
  const { transcript, resetTranscript } = useSpeechRecognition("hello !");
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
    setIsListening(true);
  };
  const stopHandle = () => {
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    setIsListening(false);
  };
  const handleSendText = async () => {
    console.log("Sending Text --> \n" + transcript);
    const result = await sendText.post("/predict/text" , {data : transcript , number});
    stopHandle();
    resetTranscript();
    console.log(result);
    setResult(result);
    
  };
  return (


   <div className="Maindiv">
    <div>
    <img src={image2} alt="image1" style={{width:"317px", height:"437px", padding:"20px"}} />
      </div> 


    <div className="microphone-wrapper">
  
     <div id="text">
       <h3>Don't have file to upload ? Try Recording your voice !</h3>
       </div>

      <div className="mircophone-container">

        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <i className={isListening ? "microphone icon" : "microphone slash icon"} />
        </div>

        <div className="microphone-status">
          {isListening ? "Listening........." : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>

      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>
          <button className="ui button red" onClick={handleSendText}>
            SendText
          </button>
        </div>
      )}
      {

      }

    </div>

    </div>
  );
};

export default SpeechToText;




