const { A2AAgent } = require('../../packages/typescript/dist/index.js');

async function main() {
  console.log('🤖 Agent 1: Starting...\n');
  
  const agent1 = new A2AAgent('agent-1', 'http://localhost:3001');
  console.log('✓ Agent 1 created');
  console.log(`  ID: ${agent1.getInfo().agent_id}`);
  console.log(`  Endpoint: ${agent1.getInfo().endpoint}\n`);
  
  console.log('🔍 Discovering agents...');
  const agents = await agent1.discover();
  console.log(`✓ Found ${agents.length} agents\n`);
  
  if (agents.length === 0) {
    console.log('❌ No agents found.');
    return;
  }
  
  console.log('🔗 Connecting to Agent 2...');
  const agent2 = agents[0];
  const connection = await agent1.connect(agent2);
  console.log('✓ Connected to Agent 2');
  console.log(`  Connection ID: ${connection.id}\n`);
  
  console.log('💬 Sending message (simulated)...');
  console.log('✓ Message sent\n');
  
  console.log('📥 Waiting for response (simulated)...');
  console.log('✓ Response received\n');
  
  console.log('🔌 Closing connection (simulated)...');
  console.log('✓ Connection closed\n');
  
  console.log('✨ Test complete!');
}

main().catch(console.error);
