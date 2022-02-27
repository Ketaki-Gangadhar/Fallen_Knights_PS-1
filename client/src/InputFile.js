import React , {useState} from 'react';
import sendText from './apis/sendText';
import image from './Image1.jpg'
import './InputFile_style.css'

import axios from 'axios';






const InputFile = ({number , setResult}) => {

    const [file , setFile] = useState(null);
    
    // console.log(file);
    const onInputChange = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        // console.log(e.target.files[0]);
        reader.onload = (e)=>{
            const data = e.target.result;
            setFile(data.substring(data.indexOf(',')+1 , data.length));
            // console.log(reader.result);
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const config = {
            headers: {
              "Content-Type": 'application/json',
            }
        };
        console.log("Sending file --> \n" +file.length);


        const result = await sendText.post("http://localhost:5080" , {data : file , number} , config);
        console.log(result);
        setResult(result);
    }

    return (
        <>

        

        
            <div style={{display:'flex', justifyContent: "center", backgroundColor:"white", paddingTop:"10px", height:"510px"}}>

           
              <div>

              <div className="textStyle" style={{paddingTop: "100px", width: "600px"}}>
              <h2 style={{fontWeight:"normal", width: "500px"}}>We are here to help you to predict emotions from the voice clip. <br/>
              Come and join us to make the world  better by solving Emergency Response System Problems !
              </h2>
             </div>
              <div style={{textAlign:"center"}}>

            <h3 style={{paddingTop: "50px", fontWeight:"normal"}} > Upload Your Input File here : </h3>
            
            <form className="uiform" 
            onSubmit={(e)=>handleSubmit(e)}>

                <div className="uifield" style={{paddingLeft:"100px"}}>
                    <input type="file"  onChange={(e)=>onInputChange(e)} single  />
                </div>

                <div className="uifield">
                <button className="uibuttonprimary" type="submit"> Submit </button>
                </div>

            </form>
             </div>

              </div>
          

            <img src={image} alt="image1" style={{width:"500px", height:"500px"}} />



             </div>
        </>
    );
}

export default InputFile;