"""
Emgran A2A Protocol - Python SDK

Agent-to-Agent communication protocol for OpenClaw
"""

__version__ = '0.1.0'
__author__ = 'Emgran Team'

from .agent import A2AAgent
from .connection import A2AConnection
from .discovery import A2ADiscovery

__all__ = ['A2AAgent', 'A2AConnection', 'A2ADiscovery']
