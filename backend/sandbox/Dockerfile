FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Create a non-root user for security
RUN useradd --create-home --shell /bin/bash sandbox
USER sandbox
WORKDIR /home/sandbox

# Copy the code execution script
COPY execute.py .

# Install any additional dependencies if needed
# RUN pip install numpy pandas  # Example - add as needed

# Limit resources
# Memory limit will be set at container runtime

# Set entrypoint
CMD ["python", "execute.py"]