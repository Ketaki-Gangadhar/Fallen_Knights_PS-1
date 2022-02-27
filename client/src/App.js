import React , {useState} from 'react'
import './style.css';
import image from './Image1.jpg'
import InputFile from './InputFile';
import Navbar from './Navbar'
import Footer from './Footer'
import About from './About'
import SpeechToText from './SpeechToText';
import Modal from './Modal';

function App() {
  
  const [number , setNumber] = useState("");
  const [result , setResult] = useState(null);
  if(result && result !== null) {
    return (
      <div>
        <Modal result = {result} number = {number}/>
      </div>
    );
  }
  return (
    <div className="App" className="uicontainer">
           <Navbar/>
         <InputFile number={number} setResult = {setResult}/>
         
         <div className="InputText"> 
          <div class="column">
            <h3 style={{ paddingTop:"50px", paddingBottom:"20px"}}>Make us Better by providing the contact details of Caller : </h3>
            </div>

            <div class="column">
              <input style={{  padding:"5px", borderRadius:"5px"}} type="text" onChange={(e)=>setNumber(e.target.value)}/>
            </div>
          
          </div>

         <SpeechToText number={number} setResult = {setResult} /> 
        
        


         <Footer/>
   </div>
  );
}

export default App;
