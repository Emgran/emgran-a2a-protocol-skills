/**
 * A2A Verify Skill
 * 
 * Verifies another agent's identity and trust score
 */

const { A2AAgent } = require('@emgran/a2a-protocol');

/**
 * Verify another agent's identity
 * 
 * @param {Object} params - Parameters
 * @param {string} params.did - Target agent's DID
 * @returns {Promise<Object>} Verification result
 */
async function verify(params = {}) {
  const { did } = params;
  
  if (!did) {
    return {
      success: false,
      error: 'did is required',
    };
  }
  
  // Get agent instance from context
  const agent = context.agent || new A2AAgent(context.agentId);
  
  // Get discovery service
  const discoveryService = new agent.discoveryService.constructor();
  
  // Verify the agent
  const isValid = await discoveryService.verify(did);
  
  if (!isValid) {
    return {
      success: false,
      error: 'Agent verification failed',
    };
  }
  
  // Get trust score
  const trustScore = await discoveryService.getTrustScore(did);
  
  return {
    success: true,
    data: {
      did: did,
      verified: true,
      trust_score: trustScore,
      verification_timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Get agent's trust score
 * 
 * @param {Object} params - Parameters
 * @param {string} params.did - Target agent's DID
 * @returns {Promise<Object>} Trust score result
 */
async function getTrustScore(params = {}) {
  const { did } = params;
  
  if (!did) {
    return {
      success: false,
      error: 'did is required',
    };
  }
  
  // Get agent instance from context
  const agent = context.agent || new A2AAgent(context.agentId);
  
  // Get discovery service
  const discoveryService = new agent.discoveryService.constructor();
  
  // Get trust score
  const trustScore = await discoveryService.getTrustScore(did);
  
  return {
    success: true,
    data: {
      did: did,
      trust_score: trustScore,
      timestamp: new Date().toISOString(),
    },
  };
}

module.exports = {
  name: 'a2a-verify',
  version: '0.1.0',
  description: 'Verify another agent\'s identity and trust score',
  functions: {
    verify,
    getTrustScore,
  },
};
