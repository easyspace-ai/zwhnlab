import { useMemo } from 'react'
import Editor, { type Monaco } from '@monaco-editor/react'
import type { FormField } from '@/osint/types'

type MonacoPromptEditorProps = {
  language: 'json' | 'plaintext'
  value: string
  onChange: (value: string) => void
  height?: number | string
  formFields?: FormField[]
  theme?: 'custom-light' | 'custom-dark'
}

function registerPromptCompletions(monaco: Monaco, formFields: FormField[]) {
  const snippets: { label: string; insert: string; detail: string }[] = [
    { label: '{{#if field}}', insert: '{{#if ${1:field}}}\n$0\n{{/if}}', detail: '非空条件' },
    {
      label: '{{#if (eq field "value")}}',
      insert: '{{#if (eq ${1:field} "${2:value}")}}\n$0\n{{/if}}',
      detail: '相等分支 (Handlebars)',
    },
  ]
  for (const field of formFields) {
    snippets.push({
      label: `{{${field.name}}}`,
      insert: `{{${field.name}}}`,
      detail: '字段占位符',
    })
    if (field.type === 'select' && field.options) {
      for (const opt of field.options) {
        if (!opt.value) continue
        snippets.push({
          label: `{{#if (eq ${field.name} "${opt.value}")}}`,
          insert: `{{#if (eq ${field.name} "${opt.value}")}}\n$0\n{{/if}}`,
          detail: `${field.label}: ${opt.label}`,
        })
      }
    }
  }

  monaco.languages.registerCompletionItemProvider('plaintext', {
    triggerCharacters: ['{'],
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }
      return {
        suggestions: snippets.map((s) => ({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insert,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: s.detail,
          range,
        })),
      }
    },
  })
}

export function MonacoPromptEditor({
  language,
  value,
  onChange,
  height = 280,
  formFields = [],
  theme = 'custom-light',
}: MonacoPromptEditorProps) {
  const fieldsKey = useMemo(() => formFields.map((f) => f.name).join(','), [formFields])

  return (
    <Editor
      key={`${language}-${fieldsKey}`}
      height={height}
      language={language}
      theme={theme}
      value={value}
      onChange={(v) => onChange(v || '')}
      options={{
        minimap: { enabled: false },
        fontSize: 12,
        lineHeight: 20,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 8, bottom: 8 },
      }}
      beforeMount={(monaco) => {
        monaco.editor.defineTheme('custom-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: { 'editor.background': '#0f172a' },
        })
        monaco.editor.defineTheme('custom-light', {
          base: 'vs',
          inherit: true,
          rules: [],
          colors: { 'editor.background': '#ffffff' },
        })
        if (language === 'plaintext') {
          registerPromptCompletions(monaco, formFields)
        }
      }}
    />
  )
}
