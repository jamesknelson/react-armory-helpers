import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class PythagorasTree extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      animating: false,
    }

    this.toggleAnimation = this.toggleAnimation.bind(this)
  }

  toggleAnimation() {
    this.setState({ animating: !this.state.animating })
  }

  render() {
    const animating = this.state.animating
    return React.createElement(AnimatedPythagorasTree, { animating },
      React.createElement('button', {
        onClick: this.toggleAnimation,
        type: 'button',
      }, animating ? 'Stop animation' : 'Start animation'),
    )
  }
}


// This Component expects to receive a function on its `onChange` prop.
// It then calls that function from its own event handlers.
export function NumericInput({ value, onChange }) {
  const numericValue = !value ? 0 : parseFloat(value)
  const setSway = (event) => onChange(event.target.value)
  const decreaseSway = () => onChange(String(numericValue - 0.02))
  const increaseSway = () => onChange(String(numericValue + 0.02))
  
  return (
    React.createElement('div', {},
      React.createElement('button', {type: 'button', onClick: decreaseSway}, '<'),
      React.createElement('input', {value: value, onChange: setSway}),
      React.createElement('button', {type: 'button', onClick: increaseSway}, '>'),
    )
  )
}


export class AnimatedPythagorasTree extends Component {
  static defaultProps = {
    totalLevels: 5,
    baseLean: 0,
    baseHeightFactor: 0.37,
    size: 50,
    sprout: 0.01,
    sway: 0.04,
  }

  constructor(props) {
    super(props)

    this.state = {
      time: 0,
    }
  }

  scheduleFrame() {
    this.nextFrame = window.requestAnimationFrame(() => {
      const now = new Date().getTime()
      const delta = now - this.lastFrameTime
      if (delta > 25) {
        // Max out at 40fps to conserve CPU cycles
        this.lastFrameTime = now
        this.setState(({time}) => ({ time: time + delta/25 }))
      }
      else {
        this.scheduleFrame()
      }
    })
  }

  componentDidMount() {
    if (this.props.animating) {
      this.lastFrameTime = new Date().getTime()
      this.scheduleFrame()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animating && !nextProps.animating && this.nextFrame) {
      window.cancelAnimationFrame(this.nextFrame)
      this.nextFrame = null
    }
    else if (!this.props.animating && nextProps.animating) {
      this.lastFrameTime = new Date().getTime()
      this.scheduleFrame()
    }
  }

  componentDidUpdate() {
    if (this.props.animating) {
      this.scheduleFrame()
    }
  }

  componentWillUnmount() {
    if (this.nextFrame) {
      window.cancelAnimationFrame(this.nextFrame)
      this.nextFrame = null
    }
  }

  render() {
    const { children, sprout, sway, baseHeightFactor, baseLean, size, totalLevels } = this.props
    const t = this.state.time

    return React.createElement('div', {},
      React.createElement(TreeBox, {
        heightFactor: Math.cos(t / 43)*sprout + baseHeightFactor,
        lean: Math.sin(t / 50)*sway + baseLean,
        size: size,
        totalLevels: totalLevels,
        level: 0,
      }),
      React.createElement('div', {
        style: {
          position: 'absolute',
          right: 10,
          bottom: 10,
          left: 10,
        },
      }, children),
    )
  }
}


export const TreeBox = (props) => {
  const style = getBoxStyle(props)
  const baseProps = Object.assign({}, props, {
    level: props.level + 1,
  })
  const leftChild =
    props.level < props.totalLevels &&
    React.createElement(TreeBox, Object.assign({}, baseProps, { right: false }))
  const rightChild =
    props.level < props.totalLevels &&
    React.createElement(TreeBox, Object.assign({}, baseProps, { right: true }))

  return React.createElement('div', { style },
    leftChild,
    rightChild,
  )
}

TreeBox.defaultProps = {
  level: 0,
}


export function getBoxStyle({ size, heightFactor, left, lean, level, totalLevels, right }) {
  const color = interpolateColor((level/totalLevels)**2, 80, 120, 54, 240, 104, 64)
  const scale = right
      ? Math.sqrt((size*heightFactor)**2 + (size * (0.5+lean))**2) / size
      : Math.sqrt((size*heightFactor)**2 + (size * (0.5-lean))**2) / size
  const rotation =
    right
      ? Math.atan(heightFactor / (0.5+lean))
      : -Math.atan(heightFactor / (0.5-lean))

  const style = {
    position: 'absolute',
    bottom: 0,
    width: size,
    height: size,
    transformOrigin: right ? `${size}px ${size}px` : `0 ${size}px`,
    transform: level === 0 ? '' : `
      translate3d(0, ${-size}px, 0)
      scale3d(${scale}, ${scale}, 1)
      rotate(${rotation}rad)
    `,
    backgroundColor: color,
  }

  if (level === 0) {
    style.left = `calc(50% - ${size/2}px + ${left || 0}px)`
  }

  return style
}


export function interpolateColor(x, r1, r2, g1, g2, b1, b2) {
  const r = Math.round(clamp(x, r1, r2))
  const g = Math.round(clamp(x, g1, g2))
  const b = Math.round(clamp(x, b1, b2))
  return `rgb(${r}, ${g}, ${b})`
}


function clamp(x, min, max) {
  return min + (max - min)*x
}