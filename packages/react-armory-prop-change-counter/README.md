# react-armory-prop-change-counter

This package exports a React Component that displays the number of times that its props have changed, where changes are measured with reference equality. Use this component to check that your props are only changing when they should.

## Exports

- `<PropChangeCounter title='string' {...props}>`

## Why?

Some React components use shouldComponentUpdate or PureComponent to prevent unnecessary renders. But this only works if the props don't change! So if a pure component is updating when it shouldn't, you can add a `<PropChangeCounter>` to find the culprit.

This is explained in detail (with live examples) at [How Not To Use React](https://reactarmory.com/learn).

## Try it live

You can see a usage example and try the component out at [React Armory](https://reactarmory.com).