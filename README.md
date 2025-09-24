# Python Compiler

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive online Python compiler with syntax highlighting, code execution, and a clean UI.

<p align="center">
  <img src="frontend/public/screenshot.png" alt="Python Compiler Screenshot" width="800">
</p>

## Features

- **Code Editor**: Monaco Editor with syntax highlighting and autocompletion
- **Code Execution**: Secure Python code execution with resource limits
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between light and dark themes
- **Templates**: Pre-built code templates for quick testing
- **Download/Share**: Download code as .py file or copy to clipboard

## Tech Stack

### Frontend
- React.js
- TailwindCSS
- Monaco Editor
- Framer Motion (for animations)

### Backend
- Flask (Python)
- Docker (for sandboxed execution)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Docker (for sandboxed execution)

### Installation

1. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Running the Application

1. **Start the Backend**:
   ```bash
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   python api/app.py
   ```
   The backend will be available at `http://localhost:8000`

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## Deployment

### GitHub Pages (Frontend Only)

To deploy the frontend to GitHub Pages:

1. Install the GitHub Pages deployment package:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. Add these scripts to your `frontend/package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Add a homepage field to your `frontend/package.json`:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Full Application Deployment

For deploying the full application, consider using:
- [Heroku](https://www.heroku.com/) for the backend
- [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) for the frontend
- [Docker Hub](https://hub.docker.com/) with [AWS ECS](https://aws.amazon.com/ecs/) or [Google Cloud Run](https://cloud.google.com/run)

## Security

The application uses subprocess management to sandbox code execution, limiting:
- Memory usage (128MB limit)
- Execution time (30-second timeout)

For production use, consider implementing:
- Docker containerization for stronger isolation
- Rate limiting
- User authentication
- Input validation

## API Endpoints

- `GET /` - Health check
- `POST /execute` - Execute Python code
- `GET /health` - Health status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Made with ❤️ by Mohamed Taha Laaouan