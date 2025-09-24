import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';

const EditorComponent = ({ code, setCode, onRun }) => {
  const editorRef = useRef(null);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  
  const templates = [
    { name: "Hello World", code: '# Hello World Example\nprint("Hello, World!")' },
    { name: "Variables", code: '# Variables Example\nname = "Python"\nnumber = 42\nprint(f"Hello {name}, the number is {number}")' },
    { name: "Loop", code: '# Loop Example\nfor i in range(5):\n    print(f"Iteration {i}")' },
    { name: "Function", code: '# Function Example\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Python Developer"))' },
    { name: "List Comprehension", code: '# List Comprehension Example\nsquares = [x**2 for x in range(10)]\nprint(squares)' },
  ];

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleTemplateSelect = (templateCode) => {
    setCode(templateCode);
    setTemplatesOpen(false);
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "python_code.py";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    // Could add a toast notification here
  };

  return (
    <motion.div 
      className="editor-container bg-white dark:bg-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Code Editor</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={() => setTemplatesOpen(!templatesOpen)}
              className="btn btn-secondary text-sm py-1 px-3 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Templates
            </button>
            
            {templatesOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                <div className="py-1">
                  {templates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => handleTemplateSelect(template.code)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={copyToClipboard}
            className="btn btn-secondary text-sm py-1 px-3 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy
          </button>
          
          <button
            onClick={downloadCode}
            className="btn btn-secondary text-sm py-1 px-3 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download
          </button>
        </div>
      </div>
      
      <div className="h-[calc(100%-50px)]">
        <Editor
          height="100%"
          defaultLanguage="python"
          defaultValue={code}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            suggestOnTriggerCharacters: true,
            wordBasedSuggestions: true,
            quickSuggestions: true,
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showClasses: true,
              showFunctions: true,
            }
          }}
        />
      </div>
    </motion.div>
  );
};

export default EditorComponent;