import sys
import os
import unittest

# Add the api directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'api'))

from executor import CodeExecutor

class TestCodeExecutor(unittest.TestCase):
    def setUp(self):
        self.executor = CodeExecutor()

    def test_simple_print(self):
        code = "print('Hello, World!')"
        result = self.executor.execute(code)
        self.assertTrue(result['success'])
        self.assertEqual(result['stdout'].strip(), 'Hello, World!')
        self.assertEqual(result['stderr'], '')

    def test_syntax_error(self):
        code = "print('Hello, World!'"
        result = self.executor.execute(code)
        self.assertFalse(result['success'])
        self.assertIn('SyntaxError', result['stderr'])

    def test_timeout(self):
        # This test might not work as expected in all environments
        code = "import time; time.sleep(5)"
        self.executor.timeout = 1  # Set timeout to 1 second
        result = self.executor.execute(code)
        self.assertFalse(result['success'])
        # The error message might vary, so we'll just check that there's an error
        self.assertNotEqual(result['stderr'], '')

if __name__ == '__main__':
    unittest.main()