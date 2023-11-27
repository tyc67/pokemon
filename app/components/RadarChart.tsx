import RadarAxis from './RadarAxis'
import RadarPoint from './RadarPoint'

type RadarChartProps = {
  data: RadarData[]
  domainMax: number
  width: number
  height: number
  padding: number
  style?: {}
}

type RadarData = {
  key: string
  label: string
  value: number
}

const defaultProps: RadarChartProps = {
  data: [
    { key: 'c1', label: 'HP', value: 39 },
    { key: 'c2', label: 'Attack', value: 52 },
    { key: 'c3', label: 'Defense', value: 43 },
    { key: 'c4', label: 'Sp.Atk', value: 60 },
    { key: 'c5', label: 'Sp.Def', value: 50 },
    { key: 'c6', label: 'Speed', value: 65 },
  ],
  domainMax: 80,
  width: 300,
  height: 300,
  padding: 60,
}

function createLinearScale(data: number, domain: [number, number], range: [number, number]) {
  const p = (data - domain[0]) / (domain[1] - domain[0])
  const scaledValue = range[0] + p * (range[1] - range[0])
  return scaledValue
}

function convertPropsData(props: RadarChartProps) {
  const { data, domainMax, width, height, padding } = props
  const innerWidth = width - padding * 2
  const innerHeight = height - padding * 2
  const radius = Math.min(innerWidth / 2, innerHeight / 2)

  const scales: { [key: string]: number } = {}
  data.map((dataPoint, idx) => {
    const scale = createLinearScale(dataPoint.value, [0, domainMax], [0, radius])
    scales[dataPoint.key] = scale
  })

  const offsetAngles: { [key: string]: number } = {}
  data.map((dataPoint, idx) => {
    const angleSlice = (Math.PI * 2) / data.length
    offsetAngles[dataPoint.key] = angleSlice * idx
  })

  const points = data.map((dataPoint, idx) => {
    const scale = scales[dataPoint.key]
    const offsetAngle = offsetAngles[dataPoint.key]

    const x = scale * Math.cos(offsetAngle - Math.PI / 2)
    const y = scale * Math.sin(offsetAngle - Math.PI / 2)

    return { x, y }
  })

  return {
    points,
    offsetAngles,
    radius,
    scales,
    innerWidth,
    innerHeight,
    width,
    height,
    padding,
    domainMax,
  }
}

export default function RadarChart(props?: Partial<RadarChartProps>) {
  const mergedProps = { ...defaultProps, ...props }
  const {
    points,
    offsetAngles,
    radius,
    scales,
    innerWidth,
    innerHeight,
    width,
    height,
    padding,
    domainMax,
  } = convertPropsData(mergedProps)
  const diameter = radius * 2
  const axisColor = '#cdcdcd'
  const pointColor = '#2563eb'

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${padding}, ${padding})`}>
        <rect
          width={diameter}
          height={diameter}
          fill={'transparent'}
          transform={`translate(${(innerWidth - diameter) / 2},${(innerHeight - diameter) / 2})`}
        />
        <g transform={`translate(${innerWidth / 2}, ${innerHeight / 2})`}>
          {mergedProps.data.map(({ key, label }, i) => (
            <RadarAxis
              key={key}
              offsetAngle={offsetAngles[key]}
              label={label}
              radius={radius}
              color={axisColor}
            />
          ))}
          <RadarPoint points={points} color={pointColor} />
        </g>
      </g>
    </svg>
  )
}
