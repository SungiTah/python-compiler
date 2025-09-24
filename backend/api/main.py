from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from .executor import CodeExecutor
import json
import os

app = FastAPI(title="Python Compiler API")

# Initialize code executor
executor = CodeExecutor()

class CodeExecutionRequest(BaseModel):
    code: str
    timeout: Optional[int] = 30

class CodeExecutionResponse(BaseModel):
    stdout: str
    stderr: str
    execution_time: float
    success: bool

@app.get("/")
async def root():
    return {"message": "Python Compiler API"}

@app.post("/execute")
async def execute_code(request: CodeExecutionRequest):
    try:
        # Update executor timeout if provided
        if request.timeout:
            executor.timeout = request.timeout
            
        # Execute the code
        result = executor.execute(request.code)
        
        return {
            "stdout": result["stdout"],
            "stderr": result["stderr"],
            "execution_time": result["execution_time"],
            "success": result["success"]
        }
    except Exception as e:
        return {
            "stdout": "",
            "stderr": f"Server error: {str(e)}",
            "execution_time": 0,
            "success": False
        }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}