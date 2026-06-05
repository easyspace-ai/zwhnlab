import { W6_CHAT_PREFIX } from '../lib/w6Message'

type UserMessageBubbleProps = {
  content: string
}

export function UserMessageBubble({ content }: UserMessageBubbleProps) {
  const showW6Tag =
    content.startsWith(W6_CHAT_PREFIX) ||
    content.trimStart().toLowerCase().startsWith('@w6 ')

  if (!showW6Tag) {
    return <pre className="whitespace-pre-wrap font-sans">{content}</pre>
  }

  const body = content.startsWith(W6_CHAT_PREFIX)
    ? content.slice(W6_CHAT_PREFIX.length)
    : content.trimStart().slice(4)

  return (
    <pre className="whitespace-pre-wrap font-sans">
      <span className="rounded bg-blue-500/25 px-1 font-semibold text-blue-200 dark:bg-blue-600/20 dark:text-blue-700">
        @w6
      </span>
      <span> </span>
      {body}
    </pre>
  )
}
