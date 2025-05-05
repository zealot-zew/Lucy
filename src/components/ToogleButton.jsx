import React, { useState } from 'react';

const ToggleButton = () => {
  const [isDark, setIsDark] = useState(false);

  const themeSwitch = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <label htmlFor="check" className={`relative cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}>
      <input
        type='checkbox'
        id='check'
        className='sr-only peer'
        onClick={() => {
          setIsDark(!isDark);
          themeSwitch();
        }}
      />
      <span className={`w-5 h-5 bg-white absolute rounded-full left-0.5 top-0.5 transition-all duration-300 ${isDark ? 'bg-gray-800 left-6' : ''}`}></span>
    </label>
  );
};

export default ToggleButton;