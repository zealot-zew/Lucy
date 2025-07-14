// PromptBar.jsx
import React from 'react';

const PromptBar = ({ value, onChange, onKeyDown, onSubmit, loading, centered }) => {
    const placeholderText = centered
        ? "Start your conversation..."
        : "Ask a follow-up...";
    return (
        <div className={`flex gap-2 items-center ${centered ? 'justify-center mt-20' : ''}`}>
            <input
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none max-w-4xl"
                placeholder={placeholderText}
            />
            <button
                onClick={onSubmit}
                disabled={loading}
                className="px-4 py-2 bg-coral-red text-white rounded-full hover:opacity-90"
            >
                {loading ? 'Sending...' : 'Send'}
            </button>
        </div>
    );
};

export default PromptBar;
