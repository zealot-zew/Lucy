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
    <label htmlFor="check" className='bg-gray-300 relative cursor-pointer w-20 h-10 rounded-full'>
      <input 
        type='checkbox' 
        id='check' 
        className='sr-only peer' 
        onClick={() => {
          setIsDark(!isDark);
          themeSwitch();
        }}
      />
      <span className={`w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-1 transition-all duration-500 ${isDark ? 'bg-gray-800 left-11' : ''}`}></span>
    </label>
  );
};

export default ToggleButton;