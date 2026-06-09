interface LogoProps {
  className?: string
  width?: number | string
  height?: number | string
}

export function Logo({ className = '', width = 32, height = 32 }: LogoProps) {
  return (
    <img
      src="/brand-icon.svg"
      width={width}
      height={height}
      className={className}
      alt="macOS Updates logo"
      decoding="async"
      draggable={false}
      style={{ width, height, objectFit: 'contain' }}
    />
  )
}
