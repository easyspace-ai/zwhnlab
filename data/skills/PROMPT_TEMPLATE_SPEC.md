# 技能提示词模板规范（Handlebars）

模板在**浏览器端**使用 [Handlebars](https://handlebarsjs.com/zh/guide/) 渲染，**不依赖后端**解析。

## 表单与模板对应关系

- `form_schema.fields[].name` 必须与模板中的 `{{field_name}}` 一一对应。
- `select` / `radio` 提交的是 option 的 **`value`**（如 `report`），不是 `label`（如「标准报告」）。
- `multi_select` 提交字符串数组，渲染为逗号拼接。

## 支持语法

### 1. 变量替换

```handlebars
## 调研主题
{{topic}}
```

### 2. 非空条件

```handlebars
{{#if purpose}}
## 调研目的
{{purpose}}
{{/if}}
```

空字符串、空数组视为假。

### 3. 相等分支（子表达式 + `eq` helper）

```handlebars
{{#if (eq output_format "swot")}}
#### SWOT分析
...
{{/if}}
```

## 常用 Handlebars 能力

- `{{#if}}` / `{{#unless}}`
- `{{#each}}`（列表字段需自行设计，多数技能用变量即可）
- 内置 helper：`eq`（相等比较）

完整文档见：https://handlebarsjs.com/zh/guide/

## 推荐模板结构

1. 角色设定（固定文案）
2. 用户输入区（`{{...}}` + 可选 `{{#if}}`）
3. 共用执行要求（所有分支共享）
4. **按选项分支的输出格式**（`{{#if (eq output_format "…")}}`，每种格式一块）

实战参考：`defaults/intelligence_analyst/info_research.json`

## 反模式

- 在模板末尾列出**所有**输出格式结构而不加条件 → AI 会收到全部说明。
- 直接 `{{output_format}}` 只会输出 `report` 等原始值；应用 `eq` 分支写中文说明。

## 给外部 AI 的编写提示（可复制）

```text
你在为 OSINT 技能系统编写 prompt_template。使用 Handlebars 语法：

1. 占位符：{{field_name}}，field_name 来自 form_schema.fields[].name
2. 可选字段：{{#if field_name}}...{{/if}}
3. 单选分支：{{#if (eq field_name "option_value")}}...{{/if}}
4. 多种输出格式时，每种格式单独一个 eq 分支块
5. 输出纯 Markdown 文本

请根据我提供的 form_schema 生成 prompt_template。
```

## 编辑与预览

管理后台 **技能管理** → 编辑技能：Monaco 编辑 `form_schema` 与 `prompt_template`，右侧表单预览，点击「运行」在「预览」Tab 查看渲染结果。
