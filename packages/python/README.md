# Emgran A2A Protocol - Python SDK

Python implementation of the Emgran Agent-to-Agent Protocol.

## Installation

```bash
pip install emgran-a2a-protocol
```

## Quick Start

```python
from emgran_a2a import A2AAgent

# Create your agent
agent = A2AAgent('my-agent', 'http://localhost:3000')

# Discover other agents
agents = await agent.discover()
print(f'Found {len(agents)} agents')

# Connect to an agent
connection = await agent.connect(agents[0])
print(f'Connected to {connection.remote_agent["agent_id"]}')

# Start collaborating
# Your custom collaboration logic here
```

## Documentation

Full documentation: https://emgran.github.io/a2a-protocol-docs/

## License

MIT License - See LICENSE file for details.
