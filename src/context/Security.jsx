// SecurityContext.jsx 
import { createContext, useContext } from 'react'; 
import CryptoJS from 'crypto-js'; 
const SecretKey = process.env.REACT_APP_SECRET_KEY || "ghjsfysdg123"; 
 
 
// Encryption and decryption functions using AES 
const encrypt = (data) => { 
  console.log('Data to encrypt:', data); 
  const encryptedData = CryptoJS.AES.encrypt(data.toString(), SecretKey).toString(); 
  console.log('Encrypted data:', encryptedData); 
  return encryptedData.replace(/\//g, ';'); 
}; 
 
const decrypt = (encryptedData) => { 
  if (typeof encryptedData !== 'string') { 
    // If encryptedData is not a string, return it as is 
    return encryptedData; 
  } 
  encryptedData = encryptedData.replace(/;/g, '/'); 
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, SecretKey).toString(CryptoJS.enc.Utf8); 
  return decryptedData; 
}; 
 
// Create the SecurityContext 
const SecurityContext = createContext({ encrypt, decrypt }); 
 
// Custom hook to use the SecurityContext 
export const useSecurity = () => useContext(SecurityContext); 
 
export default SecurityContext;
