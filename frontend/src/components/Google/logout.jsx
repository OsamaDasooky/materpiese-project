import React from 'react';
import { GoogleLogout } from 'react-google-login';
// import {refreshTokenSetup} from './refreshToken' 


const clientId ='902898062155-a1m445ou1bo512ekubiktfhdl1ej4nt5.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout Done successfully ✌');
  };

  return (
    <div>
      <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={onSuccess}></GoogleLogout>
    </div>
  );
}

export default Logout;