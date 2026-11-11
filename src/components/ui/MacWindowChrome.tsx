import type { ReactNode } from 'react'

interface MacWindowChromeProps {
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
}

/** Window controls are visual details; only the supplied action is interactive. */
export function MacWindowChrome({ title, subtitle, action }: MacWindowChromeProps) {
  return (
    <div className="mac-window-titlebar">
      <span className="mac-window-controls" aria-hidden="true">
        <span className="mac-window-close" />
        <span className="mac-window-minimize" />
        <span className="mac-window-zoom" />
      </span>
      <div className="mac-window-title">
        <span>{title}</span>
        {subtitle && <span className="mac-window-subtitle">{subtitle}</span>}
      </div>
      <div className="mac-window-action">{action}</div>
    </div>
  )
}
