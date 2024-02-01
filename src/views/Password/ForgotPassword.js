import React from 'react'
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const ForgotPassword = () => {
 





    const redBoxStyle = { 
          
        // Set the background color to red 
        backgroundColor: 'black', 
          
        // Add padding for spacing 
        padding: '20px', 
          
        // Set the text color to white 
        color: 'white', 
    }; 
    
    return ( 
        <div className="d-flex align-items-center  
                        justify-content-center vh-100"> 
            <Card> 
                <Card.Body> 
                    <div style={redBoxStyle}> 
                        <h5 className="card-title"> 
                            Contact
                        </h5> 
                        <h3>ADMIN!!</h3>
                    </div> 
                </Card.Body> 
            </Card> 
        </div> 
    ); 
 
}
export default ForgotPassword;