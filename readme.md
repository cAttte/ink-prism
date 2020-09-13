# ink-prism

Syntax highlighting component for [Ink][], powered by [Prism][].

## Installation

    $ npm i ink-prism

## Usage

```js
const React = require("react")
const Ink = require("ink")
const { Code } = require("ink-prism")

const code = `
const React = require("react")
const Ink = require("ink")
const { Code } = require("ink-prism")

Ink.render(
    <Code language="js">
        console.log("Syntax highlighting!")
    </Code>
)`

Ink.render(<Code language="js">{code}</Code>)
```

### <&ZeroWidthSpace;Code /&ZeroWidthSpace;>

The only component; its content's syntax will be highlighted.

#### Props

##### language

The language to highlight the code as.

-   **Type:** `string`
-   **Required**

##### theme

The theme to highlight the code with.

-   **Type:** `string`
-   **Default:** `"prism"`

##### tabSize

The number of spaces to replace all tab (`\t`) characters with, if any.

-   **Type:** `number`
-   **Default:** `4`

##### fill

Whether to "fill" remaning space after every newline, as to make the background color show as a block, instead of as the shape of the text.

-   **Type:** `boolean`
-   **Default:** `true`

##### padding

This component also has **7** other properties which are not listed individually; `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`, `paddingX`, `paddingY` and `padding`. You can either guess what these do, or check out [Ink's Box's padding props][ink-padding].

-   **Type:** `number`
-   **Default:** `0`

<!-- References -->

[ink]: https://github.com/vadimdemedes/ink
[prism]: https://github.com/PrismJS/prism
[ink-padding]: https://github.com/vadimdemedes/ink#padding
