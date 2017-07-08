import React from 'react'

export default class ReversibleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: props.children.slice(0) }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ items: this.state.items.slice(0).reverse() })
  }

  render() {
    return React.createElement('div', {},
      React.createElement('div', {}, this.state.items.map((x, i) => React.createElement('div', {key: x.key || i}, x))),
      React.createElement('button', { onClick: this.toggle }, 'Reverse'),
    )
  }
}
