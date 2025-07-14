import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { aboutusimg } from '../assets/images';

const generateId = (length = 10) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
};

const Hero = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmitKey = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const convId = generateId();

    try {
      // Create conversation
      const createConvRes = await fetch(`http://localhost:5002/api/create_conversation/${convId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Optionally check if conversation creation was successful or already exists
      if (!createConvRes.ok && createConvRes.status !== 400) {
        const data = await createConvRes.json();
        alert(data.error || 'Failed to create conversation');
        return;
      }

      // Call your AI endpoint to get the generated result
      const aiRes = await fetch(`http://localhost:5002/api/ask_ai/${convId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      const aiData = await aiRes.json();

      if (aiRes.ok) {
        // Navigate with the actual AI response
        navigate(`/lucychat/${convId}`, {
          state: {
            prompt,
            result: aiData.result
          }
        });
      } else {
        alert(aiData.error || 'AI call failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong with the server.');
    }
  };


  return (
    <section
      id="about-us"
      className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-10 w-full px-6 py-12 max-container"
    >
      <div className="flex flex-col flex-1 max-w-xl">
        <h2 className="font-palanquin text-4xl capitalize font-bold dark:text-white mb-6 text-center">
          Welcome To <span className="text-coral-red">LUCY AI</span>
        </h2>

        <div className="relative w-full">
          <input
            type="search"
            value={prompt}
            onKeyDown={handleSubmitKey}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-[53px] w-full bg-[#ff6452] text-white placeholder-white px-6 pr-[130px] rounded-full outline-none"
            placeholder="Enter a prompt"
          />
          <button
            onClick={handleSubmit}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center justify-center gap-2 px-4 py-1 text-[#ff6452] font-bold text-[15px] border-[3px] border-white/30 rounded-full bg-white hover:scale-105"
          >
            Try it
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img
          src={aboutusimg}
          alt="Lucy AI Illustration"
          width={520}
          height={572}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
