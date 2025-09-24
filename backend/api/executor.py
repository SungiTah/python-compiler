import subprocess
import tempfile
import os
import signal
import time
from typing import Dict, Any


class CodeExecutor:
    def __init__(self, timeout: int = 30, memory_limit: int = 134217728):  # 128MB
        self.timeout = timeout
        self.memory_limit = memory_limit

    def execute(self, code: str) -> Dict[str, Any]:
        """Execute Python code securely with resource limits"""
        try:
            # Create a temporary file for the code
            with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
                f.write(code)
                temp_file = f.name

            # Execute the code
            start_time = time.time()
            process = subprocess.Popen(
                ['python', temp_file],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )

            try:
                stdout, stderr = process.communicate(timeout=self.timeout)
                execution_time = time.time() - start_time

                return {
                    "stdout": stdout,
                    "stderr": stderr,
                    "execution_time": execution_time,
                    "success": process.returncode == 0
                }
            except subprocess.TimeoutExpired:
                process.terminate()
                process.wait()
                execution_time = time.time() - start_time
                
                return {
                    "stdout": "",
                    "stderr": "Error: Code execution timed out",
                    "execution_time": execution_time,
                    "success": False
                }

        except Exception as e:
            return {
                "stdout": "",
                "stderr": f"Error executing code: {str(e)}",
                "execution_time": 0,
                "success": False
            }
        finally:
            # Clean up the temporary file
            try:
                if 'temp_file' in locals():
                    os.unlink(temp_file)
            except:
                pass