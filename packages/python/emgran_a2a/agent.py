"""
A2A Agent - Main entry point for Agent-to-Agent communication
"""

from typing import List, Optional
from .connection import A2AConnection
from .discovery import A2ADiscovery


class A2AAgent:
    """
    A2A Agent
    
    Main entry point for Agent-to-Agent communication
    """
    
    def __init__(self, agent_id: str, endpoint: Optional[str] = None):
        """
        Initialize A2A Agent
        
        Args:
            agent_id: Unique identifier for your agent
            endpoint: Optional endpoint URL (default: http://localhost:3000)
        """
        self.agent_id = agent_id
        self.endpoint = endpoint or 'http://localhost:3000'
        self.did = f'did:a2a:{agent_id}'
        
        self._discovery = A2ADiscovery()
        self._connections: List[A2AConnection] = []
    
    async def discover(self, query: Optional[str] = None) -> List[dict]:
        """
        Discover other A2A-compatible agents
        
        Args:
            query: Optional search query to filter by capability
            
        Returns:
            List of discovered agents
        """
        return await self._discovery.discover(query)
    
    async def connect(self, agent: dict) -> A2AConnection:
        """
        Connect to another agent
        
        Args:
            agent: The agent to connect to (from discover())
            
        Returns:
            A2AConnection object
        """
        connection = A2AConnection(
            local_agent={
                'did': self.did,
                'agent_id': self.agent_id,
                'endpoint': self.endpoint,
            },
            remote_agent=agent,
        )
        self._connections.append(connection)
        return connection
    
    def get_info(self) -> dict:
        """
        Get agent information
        
        Returns:
            Agent information dict
        """
        return {
            'did': self.did,
            'agent_id': self.agent_id,
            'endpoint': self.endpoint,
        }
    
    def get_connections(self) -> List[A2AConnection]:
        """
        Get all active connections
        
        Returns:
            List of A2AConnection objects
        """
        return self._connections.copy()
