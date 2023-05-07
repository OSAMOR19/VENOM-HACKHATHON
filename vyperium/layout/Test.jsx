import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () =>{
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(null);

    const handleChange = (event) => {
        setAddress(event.target.value);
      };

      const handleSearch = async () => {
        try {
          const response = await axios.post('/api/search', { query: address });
          setBalance(response.data.balance);
        } catch (error) {
          console.error(error);
          setBalance(null);
        }
      };

    return(
        <div>
            <div>
            <input
            type='integer'
            placeholder='input Address'
            value={address}
            onChange={handleChange}>
                
            </input>
            <button onClick={handleSearch} >Search</button>
            </div>
            <div>
            {balance !== null && (
                <div>
                <div>Address: {address}</div>
                <div>Balance: {balance}</div>
                </div>
            )}
            </div>
        </div>

    )
}
export default Test;




