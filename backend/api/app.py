from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from executor import CodeExecutor

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize code executor
executor = CodeExecutor()

@app.route('/')
def home():
    return jsonify({"message": "Python Compiler API"})

@app.route('/execute', methods=['POST'])
def execute_code():
    try:
        data = request.get_json()
        code = data.get('code', '')
        timeout = data.get('timeout', 30)
        
        # Update executor timeout if provided
        executor.timeout = timeout
            
        # Execute the code
        result = executor.execute(code)
        
        return jsonify({
            "stdout": result["stdout"],
            "stderr": result["stderr"],
            "execution_time": result["execution_time"],
            "success": result["success"]
        })
    except Exception as e:
        return jsonify({
            "stdout": "",
            "stderr": f"Server error: {str(e)}",
            "execution_time": 0,
            "success": False
        }), 500

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    # Use the PORT environment variable provided by Render, default to 8000
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=False)