import sys
import subprocess
import json
import time
import resource

def set_memory_limit():
    """Set memory limit for the process (in bytes)"""
    # Limit to 128MB
    resource.setrlimit(resource.RLIMIT_AS, (134217728, 134217728))

def execute_code(code, timeout=30):
    """Execute Python code with security constraints"""
    try:
        # Create a subprocess to run the code
        process = subprocess.Popen(
            [sys.executable, "-c", code],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            preexec_fn=set_memory_limit if hasattr(resource, 'setrlimit') else None
        )
        
        # Wait for completion with timeout
        stdout, stderr = process.communicate(timeout=timeout)
        
        return {
            "stdout": stdout,
            "stderr": stderr,
            "returncode": process.returncode,
            "timeout": False
        }
    except subprocess.TimeoutExpired:
        process.kill()
        stdout, stderr = process.communicate()
        return {
            "stdout": stdout,
            "stderr": "Error: Code execution timed out",
            "returncode": -1,
            "timeout": True
        }
    except Exception as e:
        return {
            "stdout": "",
            "stderr": f"Error executing code: {str(e)}",
            "returncode": -1,
            "timeout": False
        }

if __name__ == "__main__":
    # Read code from stdin
    if len(sys.argv) > 1:
        code = sys.argv[1]
    else:
        code = sys.stdin.read()
    
    # Execute the code
    result = execute_code(code)
    
    # Output result as JSON
    print(json.dumps(result))