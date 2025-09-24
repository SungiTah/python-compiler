import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Console from './components/Console';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [code, setCode] = useState('# Write your Python code here\nprint("Hello, World!")');
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);
    
    try {
      // Use environment variable for API URL, fallback to localhost for development
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      
      const result = await response.json();
      
      if (result.stdout) {
        setOutput(prev => [...prev, { type: 'output', content: result.stdout }]);
      }
      
      if (result.stderr) {
        setOutput(prev => [...prev, { type: 'error', content: result.stderr }]);
      }
    } catch (error) {
      setOutput(prev => [...prev, { type: 'error', content: `Error: ${error.message}` }]);
    } finally {
      setIsRunning(false);
    }
  };

  const clearCode = () => {
    setCode('');
    setOutput([]);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
        <Header 
          onRun={runCode} 
          onClear={clearCode} 
          isRunning={isRunning}
        />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <Editor 
              code={code} 
              setCode={setCode} 
              onRun={runCode}
            />
            <Console output={output} isRunning={isRunning} />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;