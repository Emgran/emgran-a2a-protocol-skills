/**
 * Basic Discovery Example
 * 
 * Demonstrates how to discover other A2A-compatible agents
 */

import { A2AAgent } from '@emgran/a2a-protocol';

async function main() {
  console.log('🚀 Starting A2A Discovery Example\n');
  
  // Step 1: Create your agent
  console.log('📦 Creating agent...');
  const agent = new A2AAgent('example-agent', 'http://localhost:3000');
  console.log(`✓ Agent created: ${agent.getInfo().agent_id}\n`);
  
  // Step 2: Discover other agents
  console.log('🔍 Discovering agents...');
  const agents = await agent.discover();
  console.log(`✓ Found ${agents.length} agents\n`);
  
  // Step 3: Display discovered agents
  console.log('📋 Discovered Agents:');
  agents.forEach((agent, index) => {
    console.log(`\n${index + 1}. ${agent.agent_id}`);
    console.log(`   DID: ${agent.did}`);
    console.log(`   Endpoint: ${agent.endpoint}`);
    console.log(`   Capabilities: ${agent.capabilities.join(', ')}`);
    console.log(`   Trust Score: ${agent.trust_score || 'N/A'}`);
  });
  
  console.log('\n✨ Discovery complete!');
}

// Run the example
main().catch(console.error);
