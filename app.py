from http import server
from flask import Flask, request,jsonify,json,Response
from block import *
import joblib 
import base64
import speech_recognition as sr
import os
from pydub import AudioSegment
import pydub
import text2emotion as te
from flask_cors import CORS
import nltk
import sqlite3

nltk.download('omw-1.4')
app = Flask(__name__)
cors = CORS(app)

def db_connection():
    conn = None
    try:
        conn = sqlite3.connect("blocks.db")
    except sqlite3.error as e:
        print(e)
    return conn
  


def audioPrediction(fileName):
 
                                                     
    AUDIO_FILE = str(fileName)    
                                       
    r = sr.Recognizer()
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)            

        print("Transcription: " + r.recognize_google(audio))

    text = r.recognize_google(audio)
    
    return te.get_emotion(text)
    
    


def textPrediction(text):
                                                  
#     AUDIO_FILE = str(fileName)    

# # use the audio file as the audio source                                        
#     r = sr.Recognizer()
#     with sr.AudioFile(AUDIO_FILE) as source:
#         audio = r.record(source)  # read the entire audio file                  

#         print("Transcription: " + r.recognize_google(audio))

#     text = r.recognize_google(audio)
    
    
    return te.get_emotion(text)



@app.route('/', methods=['GET'])
def check():
    return 'server check'


@app.route('/predict', methods= ['POST'])
def emotion():
    
    f=request.json['data']
    id = request.json['number']
    print(request.json['number'])
    with open("transcript.wav", "wb") as fh:
        fh.write(base64.b64decode(f))

    
    emo=audioPrediction("transcript.wav")
    AUDIO_FILE = str("transcript.wav")    
          
    emo['callerid']=id                            
    r = sr.Recognizer()
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source) 
    text = r.recognize_google(audio)  
    if(emo['Happy']!=str(0) or emo['Surprise']!=str(0)):
        write_block(id,text,emo,1)
        return json.dumps("prank") 
        

   
    notprank={}   
    write_block(id,text,emo,0)
    if(emo['Fear']!=str(0)):
        notprank['Fear'] = emo['Fear']
    if(emo['Angry']!=str(0)):
        notprank['Angry']=emo['Angry']
    if(emo['Sad']!=str(0)):
        notprank['Sad']=emo['Sad']

    return json.dumps(notprank)
    


@app.route('/predict/text',methods=['POST'])
def Text():

    f=request.json['data']
    callid=request.json['number']
    # print(f)
    # return jsonify(f)
    emo=textPrediction(f)
    emo['callerid']=callid
    if(emo['Happy']!=0 or emo['Surprise']!=0):
        write_block(callid,f,emo,1)
        return json.dumps("prank") 
        

    
    notprank={}
    write_block(callid,f,emo,0)
    if(emo['Fear']!=str(0)):
        notprank['Fear'] = emo['Fear']
    if(emo['Angry']!=str(0)):
        notprank['Angry']=emo['Angry']
    if(emo['Sad']!=str(0)):
        notprank['Sad']=emo['Sad']

    return json.dumps(notprank)  
    
    
    

if __name__ == '__main__':
    app.run(debug = True)  


