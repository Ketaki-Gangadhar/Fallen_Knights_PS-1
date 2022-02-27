import React from "react";
import ReactDOM from 'react-dom';

const Modal = ({ result , number}) => {
    const onDismiss = ()=> {
        window.location.reload();
    }

    const renderContent = ()=>{
        if(result.data === "prank") return <p>Prank</p>;

        return (
            <>
            {(<p>Angry : {result.data.Angry*100} %</p>)}
            {(<p>Fear : {result.data.Fear*100} % </p>)}
            {(<p>Sad : {result.data.Sad*100} % </p>)}
            </>
        );
    }
    return (
        ReactDOM.createPortal(
            <div className="ui dimmer modals active " onClick={onDismiss}>
                <div className="ui standard modal active" onClick={(e) => e.stopPropagation()}>
                    <i className="close icon" onClick={onDismiss}></i>
                    <div className="header">
                        Voice Ananlysis
                    </div>
                    <div className="content">
                       {renderContent()}                       
                
                    </div>
                    {/* <div className="actions">
                        {"actions"}
                    </div> */}
                </div>
            </div>
            ,
            document.querySelector('#modal')
        )
    );
}

export default Modal;