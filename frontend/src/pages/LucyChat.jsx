import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PromptBar from '../components/PromptBar';

const LucyChat = () => {
    const { convId } = useParams();
    const location = useLocation();
    const initialPrompt = location.state?.prompt || '';
    const initialResult = location.state?.result || '';

    const [messages, setMessages] = useState([
        { prompt: initialPrompt, result: initialResult }
    ]);
    const [followUp, setFollowUp] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch messages from backend
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`http://localhost:5002/api/messages/${convId}`);
                const data = await res.json();
                if (res.ok) {
                    setMessages(data);
                } else {
                    console.error(data.error);
                }
            } catch (err) {
                console.error('Failed to fetch messages:', err);
            }
        };

        fetchMessages();
    }, [convId]);

    const handleFollowUpkey = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleFollowUp();
        }
    }

    // Handle follow-up prompt submission
    const handleFollowUp = async () => {
        if (!followUp.trim()) return;

        const prompt = followUp;
        setLoading(true);

        try {
            // 🧠 Call backend to get AI-generated result
            const res = await fetch(`http://localhost:5002/api/ask_ai/${convId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessages(prev => [...prev, { prompt, result: data.result }]);
                setFollowUp('');
            } else {
                alert(data.error || 'Failed to get AI response');
            }
        } catch (err) {
            console.error('AI call failed:', err);
            alert('Server error while calling AI.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className='dark:bg'>

            </div>
            <div className="p-6 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Lucy AI Chat</h2>
                <div className="space-y-4 mb-8">
                    {messages.map((msg, idx) => (
                        <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                            <p><strong>User:</strong> {msg.prompt}</p>
                            <p className="mt-2 text-gray-700"><strong>Lucy:</strong> {msg.result}</p>
                        </div>
                    ))}
                </div>

                <PromptBar
                    value={followUp}
                    onChange={(e) => setFollowUp(e.target.value)}
                    onKeyDown={handleFollowUpkey}
                    onSubmit={handleFollowUp}
                    loading={loading}
                    centered={false}
                />
            </div>
        </>
    );
};

export default LucyChat;
