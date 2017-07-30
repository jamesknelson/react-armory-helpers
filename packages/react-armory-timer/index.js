import React from 'react'

export const containerStyle = {
  display: 'inline-block',
  borderRadius: '2px',
  textAlign: 'right',
  margin: '5px',
  backgroundColor: '#0f0035',
  color: '#ffb3cb',
}
export const timeStyle = {
  fontSize: '20px',
  lineHeight: '20px',
  height: '29px',
  padding: '5px 5px 4px',
}
export const titleStyle = {
  fontSize: '10px',
  lineHeight: '10px',
  padding: '5px 5px 0',
  color: '#ff6796',
}
export const buttonStyle = {
  backgroundColor: 'transparent',
  border: 0,
  borderTop: '1px solid #ff6796',
  fontSize: '10px',
  color: '#ffb3cb',
  padding: '5px',
  cursor: 'pointer',
}
export const disabledButtonStyle = Object.assign({}, buttonStyle, {
  color: 'rgb(70, 58, 62)',
})

export function TimerDisplay({ title, time, active, onStart, onStop, onReset }) {
  return React.createElement('div', { style: containerStyle },
    title && React.createElement('div', { style: titleStyle }, title),
    React.createElement('div', { style: timeStyle }, time ? time.toFixed(3) : ""),
    React.createElement('button', {
      style: (onStart || onStop) ? buttonStyle : disabledButtonStyle,
      onClick: active ? onStop : onStart,
    }, active ? 'STOP' : 'START'),
    React.createElement('button', {
      style: (time === 0 || !onReset) ? disabledButtonStyle : buttonStyle,
      onClick: onReset,
    }, 'RESET'),
  )
}

export class Timer {
  constructor(listener) {
    this.time = 0

    this.listener = listener

    this.onStart = this.onStart.bind(this)
    this.onStop = this.onStop.bind(this)
    this.onReset = this.onReset.bind(this)
  }

  onStart() {
    this.lastTime = new Date().getTime()
    this.active = setInterval(() => {
      const now = new Date().getTime()
      this.time += (now - this.lastTime) / 1000
      this.lastTime = now
      this.listener(this.time, this.active)
    }, 37)
  }
  onStop() {
    clearInterval(this.active)
    this.active = null
    this.listener(this.time, this.active)
  }
  onReset() {
    this.time = 0
    this.listener(this.time, this.active)
  }
}
