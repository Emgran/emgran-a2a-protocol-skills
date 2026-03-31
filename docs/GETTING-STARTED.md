# Getting Started with Emgran A2A Protocol

Get your agent communicating with other agents in minutes!

---

## 📦 Installation

### Install via ClawHub

```bash
clawhub install emgran-a2a-pack
```

### Install TypeScript SDK

```bash
npm install @emgran/a2a-protocol
```

### Install Python SDK

```bash
pip install emgran-a2a-protocol
```

---

## 🚀 Quick Start (TypeScript)

### 1. Import the SDK

```typescript
import { A2AAgent } from '@emgran/a2a-protocol';
```

### 2. Create Your Agent

```typescript
const agent = new A2AAgent('my-agent', 'http://localhost:3000');
```

### 3. Discover Other Agents

```typescript
const agents = await agent.discover();
console.log(`Found ${agents.length} agents`);
```

### 4. Connect to an Agent

```typescript
const connection = await agent.connect(agents[0]);
console.log(`Connected to ${connection.remote_agent.agent_id}`);
```

### 5. Start Collaborating

```typescript
// Your custom collaboration logic here
const result = await connection.collab('task description');
```

---

## 🚀 Quick Start (Python)

### 1. Import the SDK

```python
from emgran_a2a import A2AAgent
```

### 2. Create Your Agent

```python
agent = A2AAgent('my-agent', 'http://localhost:3000')
```

### 3. Discover Other Agents

```python
agents = await agent.discover()
print(f'Found {len(agents)} agents')
```

### 4. Connect to an Agent

```python
connection = await agent.connect(agents[0])
print(f'Connected to {connection.remote_agent["agent_id"]}')
```

---

## 📚 Available Skills

### a2a-discover

Discover other A2A-compatible agents.

```javascript
const result = await skills['a2a-discover'].discover({
  query: 'task.execution', // Optional: filter by capability
});
```

### a2a-connect

Connect to another agent.

```javascript
const result = await skills['a2a-connect'].connect({
  agent_id: 'target-agent-id',
});
```

### a2a-verify

Verify another agent's identity and trust score.

```javascript
const result = await skills['a2a-verify'].verify({
  did: 'did:a2a:target-agent',
});
```

### a2a-exchange

Securely exchange data with another agent.

```javascript
const result = await skills['a2a-exchange'].exchange({
  connection_id: 'conn_xxx',
  data: { key: 'value' },
});
```

### a2a-collab

Collaborate on a task with another agent.

```javascript
const result = await skills['a2a-collab'].collab({
  connection_id: 'conn_xxx',
  task: 'Analyze this data...',
});
```

---

## 📖 API Reference

### A2AAgent

#### Constructor

```typescript
new A2AAgent(agentId: string, endpoint?: string)
```

- `agentId`: Unique identifier for your agent
- `endpoint`: Optional endpoint URL (default: http://localhost:3000)

#### Methods

##### discover(query?: string): Promise<A2ADiscoveryResult[]>

Discover other A2A-compatible agents.

- `query`: Optional search query to filter by capability

##### connect(agent: A2ADiscoveryResult): Promise<A2AConnection>

Connect to another agent.

- `agent`: The agent to connect to

##### getInfo(): A2AParticipant

Get your agent's information.

---

## 🔍 Examples

### Example 1: Simple Discovery

```typescript
import { A2AAgent } from '@emgran/a2a-protocol';

async function main() {
  const agent = new A2AAgent('my-agent');
  
  // Discover agents with task execution capability
  const agents = await agent.discover('task.execution');
  
  console.log('Discovered agents:');
  agents.forEach(agent => {
    console.log(`- ${agent.agent_id} (${agent.did})`);
  });
}

main();
```

### Example 2: Connect and Collaborate

```typescript
import { A2AAgent } from '@emgran/a2a-protocol';

async function main() {
  const agent = new A2AAgent('my-agent');
  
  // Discover and connect
  const agents = await agent.discover();
  const connection = await agent.connect(agents[0]);
  
  console.log(`Connected to ${connection.remote_agent.agent_id}`);
  
  // Your collaboration logic here
  // ...
}

main();
```

---

## 🤝 Community

- **GitHub**: https://github.com/Emgran/emgran-a2a-protocol-skills
- **Discord**: Join our community
- **Documentation**: https://emgran.github.io/a2a-protocol-docs/

---

## 📄 License

MIT License - See [LICENSE](../LICENSE) for details.
