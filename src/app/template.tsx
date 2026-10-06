/**
 * Unlike the layout, a template remounts on every navigation, which lets CSS
 * play a short entrance (opacity/transform only, disabled by reduced motion).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
