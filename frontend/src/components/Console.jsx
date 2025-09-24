import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Console = ({ output, isRunning }) => {
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output]);

  const clearOutput = () => {
    // This would be handled by the parent component
  };

  return (
    <motion.div 
      className="console-container bg-gray-50 dark:bg-gray-800 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Console Output</h2>
        <div className="flex space-x-2">
          {/* <button
            onClick={clearOutput}
            className="btn btn-secondary text-sm py-1 px-3"
          >
            Clear
          </button> */}
        </div>
      </div>
      
      <div 
        ref={consoleRef}
        className="flex-grow p-4 font-mono text-sm overflow-y-auto bg-white dark:bg-gray-900"
        style={{ height: 'calc(100% - 50px)' }}
      >
        {output.length === 0 && !isRunning && (
          <div className="text-gray-500 dark:text-gray-400 italic">
            Run your code to see the output here...
          </div>
        )}
        
        {isRunning && (
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Executing code...
          </div>
        )}
        
        {output.map((line, index) => (
          <div 
            key={index} 
            className={`whitespace-pre-wrap mb-2 ${line.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}
          >
            {line.content}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Console;