# react-nipplejs

> [Nipplejs](https://yoannmoi.net/nipplejs/) component built with React

```javascript
import Nipple from 'react-nipplejs';

// If you use CommonJS syntax:
// cost Nipple = require('react-nipplejs').default;

React.renderComponent(
  <div>
    <Nipple />
  </div>,
);
```

## Install

`npm install react-nipplejs`

`yarn react-nipplejs`

## Demo

[Demo & Documentation](https://bstdevices.github.io/react-nipplejs/)

## Props

| prop         | type     | description                                         |
| ------------ | -------- | --------------------------------------------------- |
| `options`    | `Object` | [options](https://yoannmoi.net/nipplejs/#options)   |
| `onStart`    | `func`   | [start](https://yoannmoi.net/nipplejs/#start)       |
| `onMove`     | `func`   | [move](https://yoannmoi.net/nipplejs/#move)         |
| `onEnd`      | `func`   | [end](https://yoannmoi.net/nipplejs/#end)           |
| `onDir`      | `func`   | [dir](https://yoannmoi.net/nipplejs/#dir)           |
| `onPlain`    | `func`   | [plain](https://yoannmoi.net/nipplejs/#plain)       |
| `onShown`    | `func`   | [shown](https://yoannmoi.net/nipplejs/#shown)       |
| `onHidden`   | `func`   | [hidden](https://yoannmoi.net/nipplejs/#hidden)     |
| `onPressure` | `func`   | [pressure](https://yoannmoi.net/nipplejs/#pressure) |

Apart from these, the component accepts all props that are accepted by `<div/>`, like `style`, `className`, etc.

[Github repo](https://github.com/bstdevices/react-nipplejs)
