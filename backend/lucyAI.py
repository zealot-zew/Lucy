import os
from dotenv import load_dotenv
import google.generativeai as genai
import re # Import the regular expression module

load_dotenv()

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash", # Or your preferred model
    generation_config=generation_config,
)

# --- Your hardcoded details ---
HARDCODED_NAME = "Deola" # e.g., "Buddy", "Fluffy", "The User"
HARDCODED_RESPONSE = f"{HARDCODED_NAME} is the cutest."

def ask_gemini(prompt: str) -> str:
    # Convert prompt to lowercase for case-insensitive matching
    normalized_prompt = prompt.lower()

    # Define patterns that trigger the hardcoded response
    # This can be simple string matching or more complex regex
    trigger_phrases = [
        "who is the cutest",
        "who's the cutest",
        "who is cutest",
        "tell me who is the cutest",
        "who do you think is the cutest"
    ]

    # More advanced: using regex to catch variations
    # This regex looks for "who" followed by "is" or "'s" (optional)
    # then "the" (optional) and "cutest".
    # It allows for some words in between.
    cuteness_pattern = r"who\s*(?:is|'s)?\s*(?:the\s+)?(?:.*?\s+)?cutest"


    # Check if any trigger phrase is in the prompt or if the regex matches
    triggered = False
    for phrase in trigger_phrases:
        if phrase in normalized_prompt:
            triggered = True
            break
    
    if not triggered and re.search(cuteness_pattern, normalized_prompt):
        triggered = True

    if triggered:
        return HARDCODED_RESPONSE
    else:
        # If not triggered, proceed to ask Gemini
        try:
            chat_session = model.start_chat(history=[])
            response = chat_session.send_message(prompt)
            return response.text
        except Exception as e:
            return f"Error communicating with Gemini: {e}"
