# 可复用代码分析

**分析时间**: 2026-03-31 15:05 GMT+8  
**来源仓库**: emgran-platform-api  
**目标仓库**: emgran-a2a-protocol-skills

---

## 📊 可复用代码清单

### 1. TypeScript/Node.js 代码 (apps/api/src/)

#### 高优先级 (直接复用)

| 文件 | 路径 | 复用方式 | 说明 |
|------|------|----------|------|
| ACP 类型定义 | `apps/api/src/acp/types/index.ts` | 直接复制 | ACP 消息格式定义 |
| ACP 服务 | `apps/api/src/acp/services/acp.service.ts` | 改造 | 核心握手逻辑 |
| ACP 路由 | `apps/api/src/acp/routes/index.ts` | 改造 | HTTP 端点定义 |
| 安全类型 | `apps/api/src/security/types/index.ts` | 直接复制 | 信任/验证类型 |
| 安全服务 | `apps/api/src/security/services/security.service.ts` | 改造 | 身份验证逻辑 |

#### 中优先级 (参考实现)

| 文件 | 路径 | 复用方式 | 说明 |
|------|------|----------|------|
| 消息服务 | `apps/api/src/acp/services/message.service.ts` | 参考 | 消息处理逻辑 |
| 中间件 | `apps/api/src/middlewares/` | 参考 | 认证/日志中间件 |
| 验证器 | `apps/api/src/validators/` | 参考 | 输入验证逻辑 |

#### 低优先级 (暂不复用)

| 文件 | 路径 | 原因 |
|------|------|------|
| Controllers | `apps/api/src/controllers/` | Skill 不需要 Controller 层 |
| Repositories | `apps/api/src/repositories/` | Skill 用 Prisma Client 直接操作 |

---

### 2. Rust 代码 (crates/g2g/)

#### 高优先级 (直接复用)

| 文件 | 路径 | 复用方式 | 说明 |
|------|------|----------|------|
| WebSocket 消息 | `crates/g2g/src/websocket/message.rs` | 直接复制 | 消息格式处理 |
| WebSocket 会话 | `crates/g2g/src/websocket/session.rs` | 直接复制 | 会话管理 |
| JWT 认证 | `crates/g2g/src/auth/jwt.rs` | 直接复制 | JWT 处理 |
| 认证中间件 | `crates/g2g/src/auth/middleware.rs` | 直接复制 | 中间件逻辑 |

#### 中优先级 (参考实现)

| 文件 | 路径 | 复用方式 | 说明 |
|------|------|----------|------|
| WebSocket Gateway | `crates/g2g/src/websocket/gateway.rs` | 参考 | Gateway 实现 |
| 路由 | `crates/g2g/src/routes/` | 参考 | 路由组织方式 |

#### 低优先级 (暂不复用)

| 文件 | 路径 | 原因 |
|------|------|------|
| 数据库模型 | `crates/g2g/src/db/models/` | Skill 不需要完整 ORM |
| 主程序 | `crates/g2g/src/main.rs` | Skill 是库不是应用 |

---

## 📦 建议的项目结构

```
emgran-a2a-protocol-skills/
├── packages/
│   ├── typescript/          # TypeScript 实现
│   │   ├── src/
│   │   │   ├── types/       # 从 apps/api/src/acp/types 复制
│   │   │   ├── services/    # 从 apps/api/src/acp/services 改造
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── python/              # Python 实现 (新建)
│       ├── emgran_a2a/
│       │   ├── __init__.py
│       │   ├── agent.py
│       │   └── ...
│       └── setup.py
│
├── skills/
│   ├── a2a-discover/        # ClawHub Skill
│   ├── a2a-connect/
│   ├── a2a-verify/
│   ├── a2a-exchange/
│   └── a2a-collab/
│
├── examples/
│   ├── typescript/
│   └── python/
│
├── docs/
│   ├── getting-started.md
│   └── api-reference.md
│
└── README.md
```

---

## 🚀 开发优先级

### Phase 1 (第 1-2 周): TypeScript SDK

1. **复制类型定义** (1 天)
   - 从 `apps/api/src/acp/types/index.ts` 复制
   - 发布到 npm: `@emgran/a2a-types`

2. **改造核心服务** (3 天)
   - 从 `apps/api/src/acp/services/acp.service.ts` 改造
   - 移除 HTTP 依赖，改为纯函数
   - 发布到 npm: `@emgran/a2a-core`

3. **开发 ClawHub Skills** (5 天)
   - 5 个技能包
   - 每个技能包装一个核心功能

4. **编写文档和示例** (3 天)
   - 快速开始教程
   - API 参考文档
   - 示例项目

### Phase 2 (第 3-4 周): Python SDK

1. **Python 类型定义** (2 天)
2. **Python 核心服务** (3 天)
3. **Python 示例** (2 天)

### Phase 3 (第 5-8 周): 社区推广

1. **技术博客系列** (2 周)
2. **线上 Demo Day** (1 周)
3. **开发者资助计划** (1 周)

---

## 📊 代码复用统计

| 来源 | 文件数 | 行数 | 复用率 |
|------|--------|------|--------|
| TypeScript (apps/api/src/acp/) | ~10 | ~2000 | 80% |
| TypeScript (apps/api/src/security/) | ~5 | ~1000 | 60% |
| Rust (crates/g2g/) | ~15 | ~3000 | 40% |
| **总计** | **~30** | **~6000** | **60%** |

---

## ⚠️ 注意事项

1. **许可证兼容性**: 确认 emgran-platform-api 的许可证允许复用
2. **依赖管理**: 新仓库需要独立的 package.json/Cargo.toml
3. **版本控制**: SDK 版本号独立于主项目
4. **文档同步**: 确保文档与代码同步更新

---

**下一步**: 创建项目骨架，开始 Phase 1 开发
