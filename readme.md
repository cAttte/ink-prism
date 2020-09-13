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

_See [`loadTheme()`](#loadtheme)._

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

### addLanguage()

Create a language with your own grammar definitions.

#### Parameters

##### name

The name of the language to add.

-   **Type:** `string`
-   **Required**

##### grammar

The grammar object of the language.

-   **Type:** [`Prism.Grammar`][prism-grammar]
-   **Required**

##### extend

The name of an existing language to extend.

_See [Prism.languages.extend()][prism-extend]._

-   **Type:** `string`
-   **Default:** `undefined`

### loadTheme()

By default, only the [`prism`][self-prism] theme is loaded into memory. Use this method to load one of the [built-in themes][self-themes] into memory.

This method is _synchronous_. Currently, there is no way to load themes asynchronously.

#### Parameters

##### name

The name of the language to load.

-   **Type:** `string`
-   **Required**

### loadAllThemes()

Load _all_ of the built-in themes into memory. There aren't _that_ many built-in themes, so this shouldn't pose serious performance issues, though it should still not be necessary in normal circumstances.

This method is _synchronous_. Currently, there is no way to load themes asynchronously.

### addTheme()

Create a theme with your own colors.

##### name

The name of the theme to add.

-   **Type:** `string`
-   **Required**

##### grammar

The theme data.

-   **Type:** [`Theme`](#theme)
-   **Required**

### Theme

Themes in `ink-prism` are defined differently from Prism themes, as you can't really use CSS in Ink.

First of all, all colors must be in hex format (`#RGB`, `#RGBA`, `#RRGGBB`, or `#RRGGBBAA`). The theme must have a `background` property, defining the background color. Then, a `color` property, which will be used for all non-highlighted (default) text.

Finally, a `tokens` property, mapping every token name (`comment`, `punctuation`, `function`, ...) to its color. These colors can not only be a plain string, but also an object containing the `bold` or `italic` boolean properties.

Here's an example. (There are more tokens than that; they were removed for the sake of simplicity):

```js
module.exports = {
    background: "#f5f2f0",
    color: "#000000",
    tokens: {
        comment: { italic: true, color: "#708090" },
        namespace: "#000000b3", // rgba(0, 0, 0, 0.7)
        bold: { bold: true, color: "#000" },
        italic: { italic: true, color: "#000" }
    }
}
```

_[Here][self-prism]'s the full version of the default theme, Prism. Check out the other [built-in themes][self-themes] for more examples, and feel free to make a Pull Request with any themes you want to add into this module!_

<!-- References -->

[ink]: https://github.com/vadimdemedes/ink
[prism]: https://github.com/PrismJS/prism
[ink-padding]: https://github.com/vadimdemedes/ink#padding
[prism-markup]: https://github.com/PrismJS/prism/blob/master/components/prism-markup.js
[prism-css]: https://github.com/PrismJS/prism/blob/master/components/prism-css.js
[prism-clike]: https://github.com/PrismJS/prism/blob/master/components/prism-clike.js
[prism-javascript]: https://github.com/PrismJS/prism/blob/master/components/prism-javascript.js
[prism-components]: https://github.com/PrismJS/prism/tree/master/components
[prism-grammar]: https://prismjs.com/docs/global.html#Grammar
[prism-extend]: https://prismjs.com/docs/Prism.languages.html#.extend
[self-prism]: https://github.com/cAttte/ink-prism/blob/master/src/themes/prism.js
[self-themes]: https://github.com/cAttte/ink-prism/blob/master/src/themes
