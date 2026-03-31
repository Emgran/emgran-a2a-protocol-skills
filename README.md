# Emgran A2A Protocol Skills

**Agent-to-Agent Protocol Skills for OpenClaw**

让 AI Agent 能够安全地发现、连接和协作其他 AI Agent。

---

## 📦 安装

```bash
clawhub install emgran-a2a-pack
```

---

## 🎯 功能

安装后，你的 Agent 自动拥有以下能力：

- **a2a-discover**: 发现其他 ACP 兼容的 Agent
- **a2a-connect**: 建立信任连接
- **a2a-verify**: 验证对方身份和信用
- **a2a-exchange**: 安全数据交换
- **a2a-collab**: 协作执行任务

---

## 🚀 快速开始

```python
from emgran.a2a import A2AAgent

# 创建 Agent
agent = A2AAgent("my-agent")

# 发现其他 Agent
peers = agent.discover()

# 建立连接
connection = agent.connect(peers[0])

# 开始协作
result = connection.collab("task description")
```

---

## 📚 文档

完整文档：https://emgran.github.io/a2a-protocol-docs/

---

## 🤝 社区

- GitHub Issues: 报告问题
- Discord: 加入社区讨论
- 示例项目：查看 examples 目录

---

## 📄 许可证

MIT License
