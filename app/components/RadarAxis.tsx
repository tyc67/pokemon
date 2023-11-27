type RadarAxisProps = {
  offsetAngle: number
  radius: number
  label: string
  color: string
  style?: {}
}

const defaultRadarAxisStyle = {
  axisOverreach: 1.1,
  labelOverreach: 1.2,
  fontSize: 10,
  fontFamily: 'sans-serif',
  textFill: 'balck',
  axisWidth: 2,
}

export default function RadarAxis(props: RadarAxisProps) {
  const { offsetAngle, label, color, style, radius } = props
  const { axisOverreach, labelOverreach, fontSize, fontFamily, textFill, axisWidth } = {
    ...defaultRadarAxisStyle,
    ...style,
  }
  const xFactor = Math.cos(offsetAngle - Math.PI / 2)
  const yFactor = Math.sin(offsetAngle - Math.PI / 2)

  return (
    <g>
      <line
        x1={0}
        y1={0}
        x2={radius * axisOverreach * xFactor}
        y2={radius * axisOverreach * yFactor}
        stroke={color}
        strokeWidth={axisWidth}
      />
      <text
        x={radius * labelOverreach * xFactor}
        y={radius * labelOverreach * yFactor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={textFill}
        textAnchor={'middle'}
        dy={'0.35em'}
      >
        {label}
      </text>
    </g>
  )
}
