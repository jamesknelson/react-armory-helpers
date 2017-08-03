import React from 'react'

const outerStyle = {
  position: 'relative',
  display: 'inline-block',
  backgroundColor: '#0f0035',
  borderRadius: '2px',
  margin: '5px',
}
const titleStyle = {
  color: '#ff6796',
  textAlign: 'center',
  fontSize: '10px',
  lineHeight: '10px',
  padding: '5px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)'
}
const scopeStyle = {
  position: 'relative',
  display: 'block',
  overflow: 'hidden',
  width: '100%',
}
const xAxisStyle = {
  position: 'absolute',
  width: '100%',
  borderTop: '1px solid #ff6796',
}
const yAxisStyle = {
  position: 'absolute',
  height: '100%',
  borderLeft: '1px solid #ff6796',
}
const traceStyle = {
  position: 'absolute',
  height: 7,
  width: 7,
  border: '1px solid #7ff4eb',
  borderRadius: '50%',
}
const labelStyle = {
  position: 'absolute',
  fontSize: '10px',
  lineHeight: '10px',
  color: '#ffb3cb',
}

export default function Scope({ title, x=0, y=0, xScale=1, yScale=1, width=150, height=150 }) {
  const xAxisTop = height/2 - 1
  const yAxisLeft = width/2 - 1
  const trace = Object.assign({
    top: -y*height/2/xScale + xAxisTop-3,
    left: x*width/2/yScale + yAxisLeft-3,
  }, traceStyle)
  const xAxis = Object.assign({top: xAxisTop}, xAxisStyle)
  const yAxis = Object.assign({left: yAxisLeft}, yAxisStyle)
  const scope = Object.assign({height}, scopeStyle)
  const minXLabel = Object.assign({left: 2, top: xAxisTop+2}, labelStyle)
  const maxXLabel = Object.assign({right: 2, top: xAxisTop+2}, labelStyle)
  const minYLabel = Object.assign({right: yAxisLeft+4, bottom: 2}, labelStyle)
  const maxYLabel = Object.assign({right: yAxisLeft+4, top: 2}, labelStyle)
  const outer = Object.assign({width}, outerStyle)

  return React.createElement('div', { style: outer },
    React.createElement('div', { style: scope },
      React.createElement('div', { style: xAxis }),
      React.createElement('div', { style: yAxis }),
      React.createElement('div', { style: minXLabel }, -xScale),
      React.createElement('div', { style: maxXLabel }, xScale),
      React.createElement('div', { style: minYLabel }, -yScale),
      React.createElement('div', { style: maxYLabel }, yScale),
      React.createElement('div', { style: trace }),
    ),
    title && React.createElement('div', { style: titleStyle }, title),
  )
}