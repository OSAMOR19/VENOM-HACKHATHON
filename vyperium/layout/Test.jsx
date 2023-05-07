import React, { useState, useEffect } from 'react';

const Test = () =>{
    const [address, setAddress] = useState("");


    return(
        <div>
            <div>
            <input
            type='integer'
            placeholder='input Address'
            value={address}
            onChange={handleChange}></input>
            </div>
            <div>
                <div>Address:</div>
                <div>Balance:</div>
            </div>
        </div>

    )
}
export default Test;

import React, { useState } from "react";

function SearchInput() {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      {filteredOptions.length > 0 && (
        <ul>
          {filteredOptions.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
