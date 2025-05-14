import { useEffect, useState } from 'react';

const ToggleButton = () => {
  const [isDark, setIsDark] = useState(false);

  // On mount: apply saved theme or use system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
      setIsDark(prefersDark);
    }
  }, []);

  const themeSwitch = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <label htmlFor="check" className={`relative cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}>
      <input
        type='checkbox'
        id='check'
        className='sr-only peer'
        checked={isDark}
        onChange={themeSwitch}
      />
      <span className={`w-5 h-5 bg-white absolute rounded-full top-0.5 transition-all duration-300 ${isDark ? 'left-6' : 'left-0.5'}`}></span>
    </label>
  );
};

export default ToggleButton;
