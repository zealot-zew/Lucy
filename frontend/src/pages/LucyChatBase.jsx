import React, { useEffect, useState } from 'react';
import PromptBar from '../components/PromptBar';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const generateId = (length = 10) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
};

const LucyChatBase = () => {
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-center items-center h-screen bg-white dark:bg-neutral-900 transition-all duration-500"
        >
            {/* Animate image fade-out or disappear */}
            <motion.img
                src="/path-to-image.jpg"
                alt="Placeholder"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-48 h-48 mb-8"
            />

            <motion.h1
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-palanquin text-4xl capitalize font-bold dark:text-white mb-6 text-center"
            >
                Let's start the conversation with Lucy
            </motion.h1>

            <PromptBar
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleSubmitKey}
                onSubmit={handleSubmit}
                centered={true}
            />
        </motion.div>
    );
};

export default LucyChatBase;
