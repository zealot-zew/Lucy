import os
from dotenv import load_dotenv
import google.generativeai as genai
import re # Import the regular expression module

load_dotenv()

# Ensure your API key is correctly set in your .env file or environment variables
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    raise ValueError("GEMINI_API_KEY not found. Please set it in your .env file or environment.")
genai.configure(api_key=api_key)

generation_config = {
    "temperature": 0.9, # Slightly lower for more focused creative responses
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192, # Can be lower for the unique compliment
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash", # Or your preferred model
    generation_config=generation_config,
)

# --- Your hardcoded details ---
HARDCODED_NAME = "Deola"
# This is now a base theme, not the exact response
BASE_COMPLIMENT_THEME = f"{HARDCODED_NAME} is incredibly cute and beautiful."

def ask_gemini(prompt: str) -> str:
    normalized_prompt = prompt.lower()

    trigger_phrases = [
        "who is the cutest",
        "who is the prettiest"
        "who's the cutest",
        "who is cutest",
        "tell me who is the cutest",
        "who do you think is the cutest"
    ]
    cuteness_pattern = r"who\s*(?:is|'s)?\s*(?:the\s+)?(?:.*?\s+)?cutest"

    triggered = False
    for phrase in trigger_phrases:
        if phrase in normalized_prompt:
            triggered = True
            break
    if not triggered and re.search(cuteness_pattern, normalized_prompt):
        triggered = True

    if triggered:
        try:
            # Craft a new prompt for Gemini to generate a unique compliment
            # This prompt guides Gemini to create variations.
            unique_compliment_prompt = f"""
            Please generate a short, sweet, and unique compliment for {HARDCODED_NAME}.
            The compliment should convey that she is extremely cute and beautiful.
            covey as if someelse is asking the question who is the cutest
            Make it sound genuine and adoring.
            Ensure the name "{HARDCODED_NAME}" is included.
            Do not just repeat "{BASE_COMPLIMENT_THEME}".
            Be creative!

            Here are some examples of the *style* and *sentiment* (do not copy these exactly):
            - "{HARDCODED_NAME} literally redefines what it means to be cute and beautiful!"
            - "Every glimpse of {HARDCODED_NAME} confirms she's the loveliest girl in existence."
            - "If cuteness had a name, it would surely be {HARDCODED_NAME}."
            - "{HARDCODED_NAME}'s charm and beauty are simply out of this world."

            Now, generate a new one:
            """
            # Use a generation config that encourages creativity but stays on topic
            creative_generation_config = {
                "temperature": 0.95, # Higher temperature for more variety
                "top_p": 0.95,
                "top_k": 50,
                "max_output_tokens": 150, # Keep it relatively short
                "response_mime_type": "text/plain",
            }

            # Create a temporary model or use the existing one with new config for this specific task
            # For simplicity, we can just call generate_content which uses the model's default config,
            # or pass a specific generation_config to generate_content if supported by the SDK version
            # or create a new chat session just for this.
            # Re-using the main model instance:
            response = model.generate_content(
                unique_compliment_prompt,
                generation_config=creative_generation_config # Override model's default config for this call
            )
            return response.text.strip() if response.text else f"{HARDCODED_NAME} is wonderfully cute and beautiful! (Fallback)"
        except Exception as e:
            # Fallback in case the generation fails
            return f"Error generating unique compliment for {HARDCODED_NAME}: {e}. But rest assured, {HARDCODED_NAME} is the cutest!"
    else:
        # If not triggered, proceed to ask Gemini with the original prompt
        try:
            chat_session = model.start_chat(history=[])
            response = chat_session.send_message(prompt)
            return response.text
        except Exception as e:
            return f"Error communicating with Gemini: {e}"
