import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="w-full">
      {items && Array.isArray(items) ? (
        items.map((item, index) => (
          <div key={index} className="mb-4">
            <button
              className={`w-full flex items-center justify-between px-4 py-2 text-[1.2rem] border border-[#008000] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008000] ${
                activeIndex === index ? 'bg-[#008000] text-white' : 'text-white'
              }`}
              onClick={() => handleClick(index)}
            >
              <span className="font-medium">{item.title}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  activeIndex === index ? 'transform rotate-180' : ''
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeIndex === index && (
              <div className="mt-2 px-4 py-2  border border-[#008000] rounded-md shadow-sm">
                <p className="text-white">{item.content}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No items to display.</p>
      )}
    </div>
  );
};

export default Accordion;
