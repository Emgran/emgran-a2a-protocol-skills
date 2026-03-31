import { A2AParticipant, A2AConnection } from '../types';

/**
 * A2A Connection Service
 * 
 * Manages connections between agents
 */
export class A2AConnectionService {
  private localAgent: A2AParticipant;
  private connections: Map<string, A2AConnection>;

  constructor(localAgent: A2AParticipant) {
    this.localAgent = localAgent;
    this.connections = new Map();
  }

  /**
   * Connect to another agent
   */
  async connect(local: A2AParticipant, remote: A2ADiscoveryResult): Promise<A2AConnection> {
    const connection: A2AConnection = {
      id: `conn_${Date.now()}`,
      local_agent: local,
      remote_agent: {
        did: remote.did,
        agent_id: remote.agent_id,
        endpoint: remote.endpoint,
      },
      status: 'active',
      created_at: new Date().toISOString(),
      last_activity: new Date().toISOString(),
    };

    this.connections.set(connection.id, connection);
    return connection;
  }

  /**
   * Close a connection
   */
  async close(connectionId: string): Promise<void> {
    const connection = this.connections.get(connectionId);
    if (connection) {
      connection.status = 'closed';
      this.connections.set(connectionId, connection);
    }
  }

  /**
   * Get all active connections
   */
  getConnections(): A2AConnection[] {
    return Array.from(this.connections.values());
  }
}
