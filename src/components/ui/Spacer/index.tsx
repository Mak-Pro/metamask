export function Spacer({ space = 10 }: { space?: number }) {
  return <div style={{ width: "100%", padding: `${space / 2}px 0` }}></div>;
}
