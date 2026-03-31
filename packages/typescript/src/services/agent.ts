import { A2AParticipant, A2AConnection, A2ADiscoveryResult } from '../types';
import { A2AConnectionService } from './connection';
import { A2ADiscoveryService } from './discovery';

/**
 * A2A Agent
 * 
 * Main entry point for Agent-to-Agent communication
 */
export class A2AAgent {
  private participant: A2AParticipant;
  private connectionService: A2AConnectionService;
  private discoveryService: A2ADiscoveryService;

  constructor(agentId: string, endpoint?: string) {
    this.participant = {
      did: `did:a2a:${agentId}`,
      agent_id: agentId,
      endpoint: endpoint || 'http://localhost:3000',
    };
    this.connectionService = new A2AConnectionService(this.participant);
    this.discoveryService = new A2ADiscoveryService();
  }

  /**
   * Discover other A2A-compatible agents
   */
  async discover(query?: string): Promise<A2ADiscoveryResult[]> {
    return await this.discoveryService.discover(query);
  }

  /**
   * Connect to another agent
   */
  async connect(agent: A2ADiscoveryResult): Promise<A2AConnection> {
    return await this.connectionService.connect(this.participant, agent);
  }

  /**
   * Get agent information
   */
  getInfo(): A2AParticipant {
    return { ...this.participant };
  }
}
