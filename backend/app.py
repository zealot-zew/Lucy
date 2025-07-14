from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from lucyAI import ask_gemini

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "https://lucyaiapp.netlify.app"}})

# Configure SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB
db = SQLAlchemy(app)

# --- MODELS ---

class Conversation(db.Model):
    id = db.Column(db.String(10), primary_key=True)
    messages = db.relationship('Message', backref='conversation', lazy=True)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    prompt = db.Column(db.Text, nullable=False)
    result = db.Column(db.Text, nullable=False)
    conversation_id = db.Column(db.String(10), db.ForeignKey('conversation.id'), nullable=False)

# --- ROUTES ---

# Create new conversation
@app.route('/api/create_conversation/<string:conv_id>', methods=['POST'])
def create_conversation(conv_id):
    if Conversation.query.get(conv_id):
        return jsonify({"message": "Conversation already exists"}), 400
    conv = Conversation(id=conv_id)
    db.session.add(conv)
    db.session.commit()
    return jsonify({"message": "Conversation created"}), 201

# Add a message to a conversation
@app.route('/api/add_message/<string:conv_id>', methods=['POST'])
def add_message(conv_id):
    data = request.get_json()
    prompt = data.get('prompt')
    result = data.get('result')

    if not prompt or not result:
        return jsonify({"error": "Prompt and result required"}), 400

    conversation = Conversation.query.get(conv_id)
    if not conversation:
        return jsonify({"error": "Conversation not found"}), 404

    msg = Message(prompt=prompt, result=result, conversation=conversation)
    db.session.add(msg)
    db.session.commit()

    return jsonify({"message": "Message added"}), 201

# Get all messages from a conversation
@app.route('/api/messages/<string:conv_id>', methods=['GET'])
def get_messages(conv_id):
    conversation = Conversation.query.get(conv_id)
    if not conversation:
        return jsonify({"error": "Conversation not found"}), 404

    messages = [{
        "id": msg.id,
        "timestamp": msg.timestamp.isoformat(),
        "prompt": msg.prompt,
        "result": msg.result
    } for msg in conversation.messages]

    return jsonify(messages), 200


@app.route('/api/ask_ai/<conv_id>', methods=['POST'])
def ask_ai(conv_id):
    data = request.get_json()
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    try:
        # Call the Gemini AI function here
        result = ask_gemini(prompt)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Save conversation to DB (your existing logic)
    conversation = Conversation.query.get(conv_id)
    if not conversation:
        # Optionally create conversation if not exists
        conversation = Conversation(id=conv_id)
        db.session.add(conversation)
        db.session.commit()

    msg = Message(prompt=prompt, result=result, conversation=conversation)
    db.session.add(msg)
    db.session.commit()

    return jsonify({'result': result}), 200

# --- MAIN ENTRY ---

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Creates DB tables if not exist
    app.run()
