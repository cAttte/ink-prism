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

The language to highlight the code as. It will be automatically `hyphen-case`d, so you can use `camelCase` if you want to.

-   **Type:** `string`
-   **Required**

_See [`loadLanguage()`](#loadlanguage)._

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

### loadLanguage()

By default, only a few languages are loaded into memory; [`markup`][prism-markup], (alias: `html`, `mathml`, `svg`, `xml`, `ssml`, `atom`, `rss`), [`css`][prism-css], [`clike`][prism-clike], and [`javascript`][prism-javascript] (alias: `js`).

Use this method to load [one of the built-in languages][prism-components] into memory.

This method is _synchronous_. Currently, there is no way to load languages asynchronously.

#### Parameters

##### name

The name of the language to load. It will be automatically `hyphen-case`d, so you can use `camelCase` if you want to.

-   **Type:** `string`
-   **Required**

### loadAllLanguages()

Load _all_ of the built-in languages into memory. Make sure you actually want to use this method, as there are _a lot_ of languages (more than 200).

This method is _synchronous_. Currently, there is no way to load languages asynchronously.

<!-- References -->

[ink]: https://github.com/vadimdemedes/ink
[prism]: https://github.com/PrismJS/prism
[ink-padding]: https://github.com/vadimdemedes/ink#padding
[prism-markup]: https://github.com/PrismJS/prism/blob/master/components/prism-markup.js
[prism-css]: https://github.com/PrismJS/prism/blob/master/components/prism-css.js
[prism-clike]: https://github.com/PrismJS/prism/blob/master/components/prism-clike.js
[prism-javascript]: https://github.com/PrismJS/prism/blob/master/components/prism-javascript.js
[prism-components]: https://github.com/PrismJS/prism/tree/master/components
