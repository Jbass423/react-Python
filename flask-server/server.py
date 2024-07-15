from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

members = ["jim", "tim"]

@app.route("/members", methods=["GET"])
def get_members():
    return jsonify({"members": members})

@app.route("/members", methods=["POST"])
def add_member():
    try:
        data = request.get_json()
        if not data or 'name' not in data:
            return jsonify({"error": "Invalid data format"}), 400
        
        new_member = data['name']
        members.append(new_member)

        return jsonify({"message": f"Member '{new_member}' added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
