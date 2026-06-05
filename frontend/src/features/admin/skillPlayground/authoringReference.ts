/** 与 data/skills/samples/authoring_reference.json 同步，供 Playground 加载样例 */
export const AUTHORING_REFERENCE_SAMPLE = {
  key: 'authoring_reference',
  name: '模板编写参考',
  description: '演示 Handlebars if / eq 用法',
  icon: 'Search',
  form_schema: JSON.stringify(
    {
      fields: [
        {
          name: 'topic',
          label: '主题',
          type: 'textarea',
          required: true,
          placeholder: '输入调研主题',
        },
        {
          name: 'purpose',
          label: '目的',
          type: 'text',
          placeholder: '可选',
        },
        {
          name: 'output_format',
          label: '输出格式',
          type: 'select',
          default: 'report',
          options: [
            { label: '标准报告', value: 'report' },
            { label: '简报', value: 'brief' },
          ],
        },
      ],
    },
    null,
    2
  ),
  prompt_template: `你是分析助手。

## 主题
{{topic}}

{{#if purpose}}
## 目的
{{purpose}}
{{/if}}

## 输出格式
{{#if (eq output_format "report")}}标准报告{{/if}}{{#if (eq output_format "brief")}}简报{{/if}}

### 请按所选格式输出

{{#if (eq output_format "report")}}
#### 标准报告
**摘要** …
**发现** …
{{/if}}

{{#if (eq output_format "brief")}}
#### 简报
**结论** …
**要点** …
{{/if}}`,
  is_enabled: true,
  sort_order: 0,
}
