import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { marked } from 'marked';
import { Nav } from '../components/Nav';
import '../styles/tinycats.css'; // Import your CSS

const App = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [showSlideshow, setShowSlideshow] = useState(false);
    const [slideData, setSlideData] = useState([]);
    const slideshowRef = useRef(null); // Reference for the slideshow container

    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY, });

    const chat = ai.chats.create({
        model: 'gemini-2.0-flash-exp',
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
        history: [],
    });

    const additionalInstructions = `
    Use a fun story about lots of tiny cats as a metaphor.
    Keep sentences short but conversational, casual, and engaging.
    Generate a cute, minimal illustration for each sentence with black ink on white background.
    No commentary, just begin your explanation.
    Keep going until you're done.`;

    const addSlide = async (text, image) => {
        setSlideData((prev) => [...prev, { text, image }]);
    };

    const parseError = (error) => {
        const regex = /{"error":(.*)}/gm;
        const m = regex.exec(error);
        try {
            const e = m[1];
            const err = JSON.parse(e);
            return err.message;
        } catch (e) {
            return error;
        }
    };

    const generate = async (message) => {
        setError('');
        setOutput('');
        setSlideData([]);
        setShowSlideshow(false);

        try {
            const userTurn = await marked.parse(message);
            setOutput((prev) => prev + userTurn);

            const result = await chat.sendMessageStream({
                message: message + additionalInstructions,
            });

            let text = '';
            let img = null;

            for await (const chunk of result) {
                for (const candidate of chunk.candidates) {
                    for (const part of candidate.content.parts ?? []) {
                        if (part.text) {
                            text += part.text;
                        } else {
                            try {
                                const data = part.inlineData;
                                if (data) {
                                    img = `data:image/png;base64,${data.data}`;
                                }
                            } catch (e) {
                                console.log('No data', chunk);
                            }
                        }

                        if (text && img) {
                            await addSlide(text, img);
                            setShowSlideshow(true);
                            text = '';
                            img = null;
                        }
                    }
                }
            }

            if (img) {
                await addSlide(text, img);
                setShowSlideshow(true);
            }
        } catch (e) {
            const msg = parseError(e);
            setError(`Something went wrong: ${msg}`);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            e.preventDefault();
            await generate(input);
        }
    };

    const handleExampleClick = async (example) => {
        setInput(example);
        await generate(example);
    };

    const examples = [
        'Explain how neural networks work.',
        'Explain how The Matrix works.',
        'Explain how spaghettification works.'
    ];

    // Scroll to slideshow when it becomes visible
    useEffect(() => {
        if (showSlideshow && slideshowRef.current) {
            slideshowRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showSlideshow]);

    return (
        <>
            <main className="relative dark:bg-neutral-900">
                <Nav />
                <br />
                <br />
                <div className={`padding container max-w-[1200px] mx-auto p-5`}>
                    <h1 className="text-center mb-10 text-3xl font-palanquin font-bold dark:text-white">
                        Explain Things with Lots of
                        <span className='text-coral-red'> Tiny Cats </span>
                    </h1>

                    <p className="mb-2 dark:text-slate-200">Examples:</p>

                    <ul id="examples" className="list-none p-0 space-y-2 dark:bg-gray-700">
                        {examples.map((example, index) => (
                            <li
                                key={index}
                                onClick={() => handleExampleClick(example)}
                                className="mb-2 p-4 border rounded-md cursor-pointer text-center transition-colors duration-300 
                        bg-white hover:bg-gray-100 border-gray-300
                        dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                                {example}
                            </li>
                        ))}
                    </ul>

                    <p className="mt-5 dark:text-slate-200">Or enter your own prompt:</p>

                    <textarea
                        id="input"
                        placeholder="Enter some prompt and press Enter."
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="w-full p-4 border border-gray-300 rounded-md font-mono mt-2 min-h-[90px] resize-y transition duration-200 
                         bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                         dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-300 dark:focus:border-blue-300"
                    ></textarea>

                    {output && (
                        <div
                            id="output"
                            className="mt-5 dark:text-gray-700"
                            dangerouslySetInnerHTML={{ __html: output }}
                        ></div>
                    )}

                    {error && (
                        <div
                            id="error"
                            className="mt-5 p-4 bg-red-100 border border-red-300 rounded-md text-red-800 dark:bg-red-200"
                        >
                            {error}
                        </div>
                    )}

                    {showSlideshow && (
                        <div
                            id="slideshow"
                            ref={slideshowRef}
                            className="flex flex-row overflow-x-auto gap-6 mb-10 px-1 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-md scroll-snap-x scroll-snap-mandatory overscroll-x-contain"
                        >
                            {slideData.map((slide, index) => (
                                <div
                                    key={index}
                                    className="slide min-w-[380px] border border-gray-300 dark:border-gray-600 p-6 rounded-xl bg-white dark:bg-gray-700 shadow-md hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(255,127,80,0.4)] transition-all duration-200 ease-in-out flex flex-col items-center"
                                >
                                    <img
                                        src={slide.image}
                                        alt="illustration"
                                        className="h-[320px] max-w-full object-contain rounded-md"
                                    />
                                    <div
                                        dangerouslySetInnerHTML={{ __html: slide.text }}
                                        className="mt-5 text-gray-700 dark:text-gray-200 text-xl text-center"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default App;
