# A2A Learnings

持续记录开发过程中的教训和经验。

---

## ❌ Critical

### ❌ Workspace - 2026-03-31T17:30:00.000Z

**问题**: 在错误的工作区 (`workspace-g2g-backend`) 进行开发

**教训**:
1. 开始工作前必须确认工作区位置
2. 默认工作区应该是 `workspace`，不是 `workspace-g2g-backend`
3. 项目应该放在 `workspace/emgran-a2a-protocol-skills`

**解决方案**:
1. 立即迁移项目到正确位置
2. 更新记忆系统记录正确的工作区
3. 创建检查清单确保以后不会犯同样错误

**影响**: 浪费约 30 分钟进行错误的工作区操作

---

### ❌ Mock Code - 2026-03-31T17:25:00.000Z

**问题**: 交付了不能运行的 Mock 代码

**教训**:
1. 所有交付物必须功能完整
2. 所有功能必须可测试
3. 禁止交付 Mock 代码（除非明确说明是 Mock）
4. 先有测试，再有实现（TDD 原则）

**解决方案**:
1. 实现真正可运行的测试应用
2. 确保测试可以通过
3. 记录测试运行命令和预期输出

**影响**: 需要额外时间重新实现可运行版本

---

## ⚠️ Warnings

### ⚠️ Memory System - 2026-03-31T17:28:00.000Z

**问题**: 没有及时记录开发规范到记忆系统

**教训**:
1. 学到的教训应该立即记录
2. 使用 skill 保存教训（a2a-learnings）
3. 定期回顾和更新教训

**解决方案**:
1. 创建 a2a-learnings skill
2. 每次学习后立即记录
3. 定期搜索和回顾相关教训

**影响**: 可能重复犯同样的错误

---

## 💡 Info

### 💡 TypeScript Build - 2026-03-31T17:40:00.000Z

**问题**: TypeScript 编译错误 `Cannot find name 'A2ADiscoveryResult'`

**教训**:
1. 导入类型时使用 `import type` 而不是普通 import
2. 确保类型导出路径正确
3. 使用 `from '../types/index'` 而不是 `from '../types'`

**解决方案**:
```typescript
// 错误
import { A2ADiscoveryResult } from '../types';

// 正确
import type { A2ADiscoveryResult } from '../types/index';
```

**影响**: 浪费约 10 分钟调试编译错误

---

### 💡 Test App Structure - 2026-03-31T17:42:00.000Z

**问题**: 测试应用依赖未正确安装

**教训**:
1. 确保 package.json 依赖路径正确
2. 运行 `npm install` 后再测试
3. 确保 TypeScript 编译后再运行测试

**解决方案**:
```bash
cd packages/typescript
npm install
npm run build

cd ../../examples/test-app
npm install
node agent1.js
```

**影响**: 测试运行失败，需要重新配置

---

## 📋 Usage

### Record a Learning

```javascript
const result = await skills['a2a-learnings'].addLearning({
  category: 'development',
  lesson: 'Always confirm workspace before starting work',
  severity: 'warning',
});
```

### Get Learnings

```javascript
const result = await skills['a2a-learnings'].getLearnings({
  category: 'development',
});
```

### Search Learnings

```javascript
const result = await skills['a2a-learnings'].searchLearnings({
  query: 'workspace',
});
```

---

**Last Updated**: 2026-03-31T17:45:00.000Z
