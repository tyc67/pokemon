type RadarPointProps = {
  points: { x: number; y: number }[]
  color: string
  style?: {}
}

const defaultCircleStyle = {
  fillOpacity: 0.2,
  strokeOpacity: 0.7,
  strokeWidth: 2,
  pointRadius: 3,
  pointOpacity: 0.7,
}

export default function RadarPoint(props: RadarPointProps) {
  const { points, color, style } = props
  const { fillOpacity, strokeOpacity, strokeWidth, pointRadius, pointOpacity } = {
    ...defaultCircleStyle,
    ...style,
  }

  const pathData = points
    .map((point, idx) => {
      const command = idx === 0 ? 'M' : 'L'
      return `${command} ${point.x} ${point.y}`
    })
    .join(' ')

  return (
    <g>
      <path
        d={`${pathData} Z`}
        fill={color}
        fillOpacity={fillOpacity}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={strokeOpacity}
      />
      {points.map((point, idx) => (
        <circle
          key={`r-p-${idx}`}
          r={pointRadius}
          fill={color}
          stroke={color}
          cx={point.x}
          cy={point.y}
          opacity={pointOpacity}
        />
      ))}
    </g>
  )
}
