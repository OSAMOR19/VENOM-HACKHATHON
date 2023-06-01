import React, { useState, useEffect } from 'react';
import Cookies from 'cookie_js';

function Dashboard() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    const storedAddresses = Cookies.get('addresses');
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  const handleAddWallet = () => {
    const newAddress = prompt('Enter Wallet Address');
    if (newAddress) {
      setAddresses([...addresses, newAddress]);
    }
  };

  const handleViewWallet = (address) => {
    setSelectedAddress(address);
  };

  const handleReturnToDashboard = () => {
    setSelectedAddress('');
  };

  useEffect(() => {
    Cookies.set('addresses', JSON.stringify(addresses));
  }, [addresses]);

  return (
    <div className=' align-center justify-center text-white'>
      <h1>Dashboard</h1>

      {!selectedAddress ? (
        <>
          <div>
            <button onClick={handleAddWallet}>Add Wallet</button>
          </div>

          <h2>Wallet Addresses:</h2>
          {addresses.length > 0 ? (
            <ul>
              {addresses.map((address, index) => (
                <li key={index}>
                  <button onClick={() => handleViewWallet(address)}>{address}</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses found.</p>
          )}
        </>
      ) : (
        <>
          <h2>Selected Wallet Address:</h2>
          <p>{selectedAddress}</p>
          <button onClick={handleReturnToDashboard}>Return to Dashboard</button>
        </>
      )}
    </div>
  );
}

export default Dashboard;
