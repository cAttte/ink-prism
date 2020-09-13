const chalk = require("chalk")
const getWidestLine = require("widest-line")
const getWidth = require("string-width")
const React = require("react")
const Ink = require("ink")
const PropTypes = require("prop-types")
const Prism = require("../Prism")

// ↓ TODO: make this customizable
const theme = require("../themes/prism.js")

class Code extends React.Component {
    render() {
        if (!this.props.language)
            throw new TypeError("The language prop of a Prism is required.")
        if (typeof this.props.children !== "string")
            throw new TypeError("The child(ren) of a Prism must be a string.")
        if (typeof this.props.tabSize !== "number") throw new Typee()

        const rawCode = this.props.children
        const grammar = Prism.languages[this.props.language]
        if (!grammar) throw new TypeError(`Unknown language "${this.props.language}".`)

        const tokens = Prism.tokenize(rawCode, grammar)
        let code = this.highlightTokens(tokens)
        code = code.replace(/\t/g, " ".repeat(this.props.tabSize))
        if (this.props.fill) code = this.fillCode(code)
        code = chalk.bgHex(theme.background)(code)

        return <Ink.Text>{code}</Ink.Text>
    }

    highlightTokens(tokens) {
        const normalizedTokens = this.normalizeTokens(tokens)
        return normalizedTokens
            .map(token => {
                const text = typeof token === "string" ? token : token.content

                const baseStyle = theme.tokens[token.type] || theme.color
                const style =
                    typeof baseStyle === "string"
                        ? { color: baseStyle }
                        : baseStyle || { color: theme.color }

                const { color, bold, italic } = style
                let chalkStyle = chalk.hex(color)
                if (bold) chalkStyle = chalkStyle.bold
                if (italic) chalkStyle = chalkStyle.italic

                return chalkStyle(text)
            })
            .join("")
    }

    normalizeTokens(tokens) {
        return tokens
            .map(token => {
                if (typeof token === "string") return token
                if (Array.isArray(token.content))
                    return token.content.map(subtoken => {
                        if (typeof subtoken === "string")
                            return { type: token.type, content: subtoken }
                        else return subtoken
                    })
                else return token
            })
            .flat()
    }

    fillCode(code) {
        const widestLine = getWidestLine(code)
        return code
            .split("\n")
            .map(line => {
                const width = getWidth(line)
                return line + " ".repeat(widestLine - width)
            })
            .join("\n")
    }
}

Code.propTypes = {
    language: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    tabSize: PropTypes.number,
    fill: PropTypes.bool
}

Code.defaultProps = {
    tabSize: 4,
    fill: true
}

module.exports = Code
