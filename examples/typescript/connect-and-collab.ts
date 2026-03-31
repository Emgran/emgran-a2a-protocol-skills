/**
 * Connect and Collaborate Example
 * 
 * Demonstrates how to connect to another agent and collaborate
 */

import { A2AAgent } from '@emgran/a2a-protocol';

async function main() {
  console.log('🚀 Starting A2A Collaboration Example\n');
  
  // Step 1: Create your agent
  console.log('📦 Creating agent...');
  const agent = new A2AAgent('example-agent', 'http://localhost:3000');
  console.log(`✓ Agent created: ${agent.getInfo().agent_id}\n`);
  
  // Step 2: Discover other agents
  console.log('🔍 Discovering agents...');
  const agents = await agent.discover();
  
  if (agents.length === 0) {
    console.log('❌ No agents found. Make sure there are other agents on the network.');
    return;
  }
  
  console.log(`✓ Found ${agents.length} agents\n`);
  
  // Step 3: Connect to the first agent
  console.log('🔗 Connecting to agent...');
  const targetAgent = agents[0];
  const connection = await agent.connect(targetAgent);
  console.log(`✓ Connected to ${connection.remote_agent.agent_id}`);
  console.log(`   Connection ID: ${connection.id}`);
  console.log(`   Status: ${connection.status}\n`);
  
  // Step 4: Collaborate
  console.log('🤝 Starting collaboration...');
  console.log('   (Your custom collaboration logic goes here)');
  console.log('   Example:');
  console.log('   - Send a task request');
  console.log('   - Receive response');
  console.log('   - Process results\n');
  
  // Step 5: Close connection
  console.log('🔌 Closing connection...');
  // connection.close(); // Implement close method as needed
  console.log('✓ Connection closed\n');
  
  console.log('✨ Collaboration complete!');
}

// Run the example
main().catch(console.error);
