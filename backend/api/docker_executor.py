import docker
import uuid
import time
import json
from typing import Dict, Any

class DockerCodeExecutor:
    def __init__(self):
        try:
            self.client = docker.from_env()
            self.docker_available = True
        except Exception as e:
            self.client = None
            self.docker_available = False
            print(f"Docker not available: {e}")

    def execute(self, code: str, timeout: int = 30) -> Dict[str, Any]:
        """Execute Python code in a Docker container for security"""
        if not self.docker_available:
            return {
                "stdout": "",
                "stderr": "Docker not available. Using local execution (less secure).",
                "execution_time": 0,
                "success": False
            }
        
        # Generate unique container name
        container_name = f"python-exec-{uuid.uuid4().hex[:8]}"
        
        try:
            start_time = time.time()
            
            # Run code in Docker container with security constraints
            container = self.client.containers.run(
                "python:3.11-alpine",
                f"python -c \"{code}\"",
                name=container_name,
                detach=True,
                mem_limit="128m",
                cpu_quota=50000,  # Limit CPU to 50%
                network_disabled=True,  # Disable network access
                remove=True,  # Automatically remove container when stopped
                stdout=True,
                stderr=True
            )
            
            # Wait for execution with timeout
            result = container.wait(timeout=timeout)
            execution_time = time.time() - start_time
            
            # Get output
            output = container.logs().decode("utf-8")
            
            return {
                "stdout": output,
                "stderr": "",
                "execution_time": execution_time,
                "success": result.get("StatusCode", 0) == 0
            }
        except Exception as e:
            execution_time = time.time() - start_time
            return {
                "stdout": "",
                "stderr": str(e),
                "execution_time": execution_time,
                "success": False
            }
        finally:
            # Clean up container
            try:
                container = self.client.containers.get(container_name)
                container.stop()
                container.remove()
            except:
                pass