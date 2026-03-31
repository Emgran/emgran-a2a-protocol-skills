/**
 * A2A Connect Skill
 * 
 * Enables agent to connect to other agents
 */

const { A2AAgent } = require('@emgran/a2a-protocol');

/**
 * Connect to another agent
 * 
 * @param {Object} params - Parameters
 * @param {string} params.agent_id - Target agent ID
 * @returns {Promise<Object>} Connection result
 */
async function connect(params = {}) {
  const { agent_id } = params;
  
  if (!agent_id) {
    return {
      success: false,
      error: 'agent_id is required',
    };
  }
  
  // Get agent instance from context
  const agent = context.agent || new A2AAgent(context.agentId);
  
  // Discover target agent
  const agents = await agent.discover(agent_id);
  const target = agents.find(a => a.agent_id === agent_id);
  
  if (!target) {
    return {
      success: false,
      error: `Agent ${agent_id} not found`,
    };
  }
  
  // Connect to target agent
  const connection = await agent.connect(target);
  
  return {
    success: true,
    data: {
      connection_id: connection.id,
      status: connection.status,
      remote_agent: {
        id: connection.remote_agent.agent_id,
        did: connection.remote_agent.did,
      },
    },
  };
}

module.exports = {
  name: 'a2a-connect',
  version: '0.1.0',
  description: 'Connect to another A2A-compatible agent',
  functions: {
    connect,
  },
};
