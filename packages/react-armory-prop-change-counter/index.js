import React, { createElement as el } from 'react'

export default class PropChangeCounter extends React.PureComponent {
  constructor(props) {
    super(props)
    this.title = props.title
    this.counts = {}
    for (let key of Object.keys(props)) {
      this.counts[key] = 0
    }
  }
  componentWillReceiveProps(nextProps) {
    const keys = Array.from(new Set(Object.keys(nextProps).concat(Object.keys(this.props))))
    for (let key of keys) {
      if (this.props[key] !== nextProps[key]) {
        this.counts[key] = (this.counts[key] || 0) + 1
      }
    }
  }
  render() {
    return (
      el('div', { style: { border: '1px dotted #888', padding: '10px' } },
        el('h3', { style: { margin: 0 } }, "prop change counts"),
        el('ul', { style: { padding: 0, margin: 0, listStyle: 'none' } },
          ...Object.keys(this.counts).map(key =>
            el('li', { key, style: { margin: 0 } },
              el('strong', {}, key+': '),
              this.counts[key],
              " changes"
            )
          )
        )
      )
    )
  }
}