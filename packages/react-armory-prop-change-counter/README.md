# react-armory-prop-change-counter

This package exports a React Component that displays the number of times that its props have changed (using reference equality). Use this component to check that your props are only changing when they should.

## Usage example

To see if an element's props are changing, add a `PropChangeCounter` element with identical props, then run your app. The prop change counter component will display the number of times that each prop has changed.

For example, you could check if the props on this `<input />` are changing on each render by adding a `<PropChangeCounter />` with identical props:

```js
import PropChangeCounter from 'react-armory-prop-change-counter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '' }
  }
  render() {
    return <div>
      <input
        placeholder="Email"
        value={this.state.email}
        onChange={e => this.setState({ email: e.target.value })}
      />
      <PropChangeCounter
        constant={"this doesn't change"}
        value={this.state.email}
        onChange={e => this.setState({ email: e.target.value })}
      />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
```

*You can see this example live at [When to use Arrow Functions](https://reactarmory.com/answers/when-to-use-arrow-functions#Two-functions-are-never-equal-to-each-other).*

## Why?

Some React components use shouldComponentUpdate or PureComponent to prevent unnecessary renders. But this only works if the props don't change! So if a pure component is updating when it shouldn't, you can add a `<PropChangeCounter>` to find the culprit.

This is explained in detail (with live examples) at [When to use Arrow Functions](https://reactarmory.com/answers/when-to-use-arrow-functions).
