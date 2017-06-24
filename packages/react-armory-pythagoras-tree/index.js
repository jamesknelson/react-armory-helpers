import React, { Component } from 'react'
import PropTypes from 'prop-types'

function clamp(x, min, max) {
  return min + (max - min)*x
}

const Fractal = ({ size, heightFactor, lean, bottom, left, right, levelsRemaining, rotation }) => {
  const nextLevelsRemaining = levelsRemaining - 1
  const color = (1 - levelsRemaining/9)**2 + 0.1
  const containerStyle = {
    position: 'absolute',
    bottom: 0,
    marginLeft: left,
    transformOrigin: right ? `${size}px 0` : '0 0',
    transform: `translate3d(${right ? (right - size) : 0}px, ${-bottom}px, 0) rotate(${rotation}rad)`,
  }
  const rectangleStyle = {
    position: 'absolute',
    bottom: 0,
    width: 100,
    height: 100,
    transformOrigin: 'left bottom',
    transform: `scale3d(${size / 100}, ${size / 100}, 1)`,
    backgroundColor: `rgb(${Math.round(clamp(color, 80, 120))}, ${Math.round(clamp(color, 54, 240))}, ${Math.round(clamp(color, 104, 64))})`,
  }

  let leftChild, rightChild
  if (nextLevelsRemaining > 0) {
    const trigHeight = size * heightFactor

    leftChild = React.createElement(Fractal, {
      heightFactor: heightFactor,
      lean: lean,
      bottom: size,
      levelsRemaining: nextLevelsRemaining,
      size: Math.sqrt(trigHeight**2 + (size * (0.5-lean))**2),
      left: 0,
      rotation: -Math.atan(heightFactor / (0.5-lean)),
    })
    rightChild = React.createElement(Fractal, {
      heightFactor: heightFactor,
      lean: lean,
      bottom: size,
      levelsRemaining: nextLevelsRemaining,
      size: Math.sqrt(trigHeight**2 + (size * (0.5+lean))**2),
      right: size,
      rotation: Math.atan(heightFactor / (0.5+lean)),
    })
  }

  return (
    React.createElement('div', { style: containerStyle },
      React.createElement('div', { style: rectangleStyle }),
      leftChild,
      rightChild
    )
  )
}


const wrapperStyle = {
    position: 'absolute',
    width: '100%',
    marginLeft: -40,
    height: '100%',
    bottom: 0,
    overflow: 'hidden',
    cursor: 'pointer',
}

module.exports = class ReactPythagorasTree extends Component {
  state = {
    active: false,
    t: 0,
  }

  handleClick = () => {
    this.setState({
      active: !this.state.active,
    }, () => this.scheduleFrame())
  }

  scheduleFrame() {
    if (this.state.active) {
      window.requestAnimationFrame(() => {
        this.setState(({t}) => ({ t: t + 0.05 }))
      })
    }
  }

  render() {
    const { sprout, sway } = this.props

    // For some reason componentDidUpdate is not working, so placing this here.
    // This is OK as it is async, and the reader doesn't see this anyway.
    this.scheduleFrame()

    return React.createElement('div', { style: wrapperStyle },
      React.createElement('button', {
        style: {
          position: 'absolute',
          top: 10,
          left: 50,
        },
        onClick: this.handleClick,
        type: 'button',
      }, this.state.active ? 'Stop animation' : 'Start animation'),
      React.createElement(Fractal, {
        size: 50,
        heightFactor: Math.cos(this.state.t*0.71)*sprout + 0.37,
        lean: Math.sin(this.state.t / 3) * sway,
        rotation: 0,
        left: '50%',
        bottom: 0,
        levelsRemaining: 8,
      })
    )
  }
}
