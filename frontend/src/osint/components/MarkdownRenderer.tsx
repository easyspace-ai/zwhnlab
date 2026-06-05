import { memo, useCallback, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Heading2, Link } from 'lucide-react'

const isHashHref = (href?: string): href is string =>
  typeof href === 'string' && href.startsWith('#') && href.length > 1

const resolveHashTarget = (root: HTMLElement | null, hash: string): HTMLElement | null => {
  const id = decodeURIComponent(hash.slice(1))
  const escaped =
    typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
      ? CSS.escape(id)
      : id.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1')
  return (
    root?.querySelector<HTMLElement>(`#${escaped}`) ??
    document.getElementById(id)
  )
}

export const MarkdownRenderer = memo(function MarkdownRenderer({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleHashLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault()
      const target = resolveHashTarget(containerRef.current, href)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [],
  )

  return (
    <div ref={containerRef} className="anything-markdown font-normal text-[14px] w-full overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1({ node, children, ...props }) {
            return (
              <h1 {...props} className="text-xl font-bold text-gray-900 mt-6 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                <Heading2 className="w-5 h-5 text-indigo-600" />
                {children}
              </h1>
            )
          },
          h2({ node, children, ...props }) {
            return (
              <h2 {...props} className="text-lg font-semibold text-gray-800 mt-6 mb-3 flex items-center gap-2">
                <Heading2 className="w-4 h-4 text-indigo-500" />
                {children}
              </h2>
            )
          },
          h3({ node, children, ...props }) {
            return (
              <h3 {...props} className="text-base font-semibold text-gray-800 mt-5 mb-2 flex items-center gap-2">
                {children}
              </h3>
            )
          },
          h4({ node, children, ...props }) {
            return (
              <h4 {...props} className="text-sm font-semibold text-gray-700 mt-4 mb-2">
                {children}
              </h4>
            )
          },
          p({ node, children, ...props }) {
            const hasBlockElement = Array.isArray(children) && children.some(
              (child: any) => child?.type === 'div' || child?.props?.className?.includes('not-prose')
            )
            if (hasBlockElement) {
              return <div {...props} className="mb-4">{children}</div>
            }
            return <p {...props} className="text-[14px] leading-7 text-gray-700 mb-3">{children}</p>
          },
          ul({ node, children, ...props }) {
            return (
              <ul {...props} className="mb-4 pl-6 list-disc list-outside space-y-1.5 text-[14px]">
                {children}
              </ul>
            )
          },
          ol({ node, children, ...props }) {
            return (
              <ol {...props} className="mb-4 pl-6 list-decimal list-outside space-y-1.5 text-[14px]">
                {children}
              </ol>
            )
          },
          li({ node, children, ...props }) {
            return (
              <li {...props} className="leading-7 text-gray-700">
                {children}
              </li>
            )
          },
          blockquote({ node, children, ...props }) {
            return (
              <blockquote {...props} className="border-l-4 border-indigo-500 bg-indigo-50 px-4 py-3 my-4 rounded-r-lg">
                <div className="text-[14px] leading-7 text-gray-700 italic">{children}</div>
              </blockquote>
            )
          },
          table({ node, children, ...props }) {
            return (
              <div className="my-4 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table {...props} className="w-full text-sm text-left">
                  {children}
                </table>
              </div>
            )
          },
          thead({ node, children, ...props }) {
            return <thead {...props}>{children}</thead>
          },
          tbody({ node, children, ...props }) {
            return <tbody {...props}>{children}</tbody>
          },
          tr({ node, children, ...props }) {
            return (
              <tr {...(props as any)} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                {children}
              </tr>
            )
          },
          th({ node, children, ...props }) {
            return (
              <th {...props} className="px-4 py-3 font-semibold text-gray-900 text-left border-r border-gray-200 last:border-r-0">
                {children}
              </th>
            )
          },
          td({ node, children, ...props }) {
            return (
              <td {...props} className="px-4 py-3 text-gray-700 border-r border-gray-200 last:border-r-0">
                {children}
              </td>
            )
          },
          hr({ node, ...props }) {
            return <hr {...props} className="my-6 border-t border-gray-200" />
          },
          strong({ node, children, ...props }) {
            return <strong {...props} className="font-semibold text-gray-900">{children}</strong>
          },
          em({ node, children, ...props }) {
            return <em {...props} className="italic text-gray-800">{children}</em>
          },
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')
            const lang = match ? match[1] : ''
            const codeString = String(children).replace(/\n$/, '')

            if (!inline) {
              return (
                <div className="not-prose w-full rounded-lg overflow-hidden my-3 border border-gray-700 bg-[#0d1117] font-mono text-[13px] leading-[1.65] text-slate-200 shadow-sm relative group">
                  <div className="flex items-center sticky top-0 bg-[#161b22] border-b border-gray-700/60 px-4 py-2 text-xs font-sans justify-between z-10">
                    <span className="text-gray-400 font-medium">{lang || 'text'}</span>
                    <button
                      onClick={(e) => {
                        navigator.clipboard.writeText(codeString);
                        const t = e.currentTarget.querySelector('span');
                        if(t) {
                          t.innerText = '已复制';
                          setTimeout(() => t.innerText = '复制', 2000);
                        }
                      }}
                      className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                      <span>复制</span>
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <SyntaxHighlighter
                      {...(props as any)}
                      style={vscDarkPlus}
                      language={lang}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        background: 'transparent',
                        padding: '1rem',
                        minWidth: '100%',
                      }}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                </div>
              )
            }
            return (
              <code {...props} className="px-1.5 py-0.5 bg-gray-100 text-gray-800 text-[13px] rounded font-mono border border-gray-200">
                {children}
              </code>
            )
          },
          a({ node, children, href, onClick, ...props }) {
            const linkClassName =
              'text-indigo-600 hover:text-indigo-800 underline decoration-indigo-300 underline-offset-2 transition-colors'

            if (isHashHref(href)) {
              return (
                <a
                  href={href}
                  className={linkClassName}
                  onClick={(event) => {
                    onClick?.(event)
                    if (!event.defaultPrevented) {
                      handleHashLinkClick(event, href)
                    }
                  }}
                  {...props}
                >
                  {children}
                </a>
              )
            }

            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
                onClick={onClick}
                {...props}
              >
                {children}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
})
