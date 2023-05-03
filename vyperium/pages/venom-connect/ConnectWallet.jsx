import React from 'react';
import { VenomConnect } from 'venom-connect';

function ConnectWallet({ VenomConnect }) {
  const login = async () => {
    if (!VenomConnect) return;
    await VenomConnect.connect();
  };
  return (
    <div>
      <>
        <h1>My Venom Crowdsale</h1>
        <p>Connect Wallet to continue</p>
        <a className="btn" onClick={login}>
          Connect wallet
        </a>
      </>
    </div>
  );
}
  
export default ConnectWallet;
