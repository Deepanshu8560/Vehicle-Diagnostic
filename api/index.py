import os
import sys

# Add the project root to sys.path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from backend.server import app
