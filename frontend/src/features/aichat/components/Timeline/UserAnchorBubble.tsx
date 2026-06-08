/** User anchor bubble — shows full text including @w6 without badge overlay. */
export function UserAnchorBubble({ content }: { content: string }) {
  return (
    <pre className="whitespace-pre-wrap font-sans text-inherit">
      {content}
    </pre>
  )
}
