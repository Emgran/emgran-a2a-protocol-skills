/**
 * A2A Discover Skill
 * 
 * Enables agent to discover other A2A-compatible agents
 */

const { A2AAgent } = require('@emgran/a2a-protocol');

/**
 * Discover other agents
 * 
 * @param {Object} params - Parameters
 * @param {string} params.query - Search query (optional)
 * @returns {Promise<Array>} List of discovered agents
 */
async function discover(params = {}) {
  const { query } = params;
  
  // Get agent instance from context
  const agent = context.agent || new A2AAgent(context.agentId);
  
  // Discover agents
  const agents = await agent.discover(query);
  
  return {
    success: true,
    data: {
      agents: agents.map(agent => ({
        id: agent.agent_id,
        did: agent.did,
        endpoint: agent.endpoint,
        capabilities: agent.capabilities,
        trust_score: agent.trust_score,
      })),
      count: agents.length,
    },
  };
}

module.exports = {
  name: 'a2a-discover',
  version: '0.1.0',
  description: 'Discover other A2A-compatible agents',
  functions: {
    discover,
  },
};
