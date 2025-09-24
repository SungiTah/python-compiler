# Multi-stage Dockerfile for the Python Compiler application

# Frontend build stage
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ .
RUN npm run build

# Backend stage
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd --create-home --shell /bin/bash app
USER app
WORKDIR /home/app

# Copy backend requirements and install dependencies
COPY --chown=app:app backend/requirements.txt .
RUN python -m venv venv && \
    venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY --chown=app:app backend/ ./backend/

# Copy frontend build
COPY --chown=app:app --from=frontend-build /app/dist ./frontend/dist

# Expose ports
EXPOSE 8000

# Run the application
CMD ["venv/bin/python", "backend/api/app.py"]