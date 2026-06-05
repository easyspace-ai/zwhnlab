# 情报分析系统改造计划

## 目标
将现有笔记管理系统改造为情报（OSINT）分析系统，保持现有 UI 风格，实现二栏布局 + Skill 快捷功能。

## 架构变更

### 1. 后端 - 新增 Intelligence Skill 模块

#### 数据模型
```
intelligence_skills
- id (PK)
- user_id (index)
- key: 唯一标识 fact_check / info_research / data_collection / daily_brief
- name: 显示名称
- description: 描述
- icon: 图标
- form_schema: JSON - 表单字段定义
- prompt_template: TEXT - 提示词模板，支持 {{变量}} 占位符
- is_enabled: bool
- sort_order: int
- created_at / updated_at
```

#### API 端点
- `GET /api/intelligence-skills` - 列表
- `POST /api/intelligence-skills` - 创建
- `GET /api/intelligence-skills/:id` - 详情
- `PATCH /api/intelligence-skills/:id` - 更新
- `DELETE /api/intelligence-skills/:id` - 删除
- `POST /api/intelligence-skills/:id/execute` - 执行（表单数据 -> 拼接提示词 -> 返回完整消息）

### 2. 前端 - 新增页面和组件

#### 新页面
- `IntelligenceHome` - 情报工作台（二栏主页面）
- `SkillManager` - Skill 管理页面（替代现有 SkillList）

#### 新组件
- `IntelligenceSidebar` - 左侧栏（新会话 + 历史会话 + 设置）
- `SkillActionBar` - 聊天框下方 Skill 快捷按钮
- `SkillFormModal` - Skill 表单弹窗（动态渲染表单）

#### 路由调整
- `/` -> IntelligenceHome（工作台）
- `/skills` -> SkillManager（Skill 管理）
- 保留 `/settings`、认证路由

### 3. 交互流程
```
用户点击 Skill 按钮
  -> 弹出 SkillFormModal，根据 form_schema 渲染表单
  -> 用户填写表单，点击提交
  -> 前端将表单数据渲染进 prompt_template（变量替换）
  -> 通过 WebSocket 发送消息（content = 拼接后的提示词）
  -> 服务端按正常聊天流程处理
```

## 实施步骤
1. 后端：数据库迁移 + 领域层 + 仓库层
2. 后端：服务层 + HTTP Handler + 路由
3. 前端：API 服务 + Store 扩展
4. 前端：Skill 管理页面
5. 前端：情报工作台主页面
6. 前端：Skill 弹窗组件
7. 前端：路由调整
8. 联调测试
