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

        const language = this.props.language.replace(
            /([A-Z])/g,
            (_, $1) => `-${$1.toLowerCase()}`
        )
        const grammar = Prism.languages[language]
        if (!grammar) throw new TypeError(`Unknown language "${language}".`)

        const tokens = Prism.tokenize(this.props.children, grammar)
        let code = this.highlightTokens(tokens)
        code = code.replace(/\t/g, " ".repeat(this.props.tabSize))
        if (this.props.fill) code = this.fillCode(code)
        code = this.padCode(code)
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

    padCode(code) {
        const p = this.props
        const paddingTop = p.paddingTop || p.paddingY || p.padding || 0
        const paddingBottom = p.paddingBottom || p.paddingY || p.padding || 0
        const paddingLeft = p.paddingLeft || p.paddingX || p.padding || 0
        const paddingRight = p.paddingRight || p.paddingX || p.padding || 0
        const space = n => " ".repeat(n)

        if (paddingTop) {
            const firstLineWidth = getWidth(code.split("\n")[0] || "")
            code = (space(firstLineWidth) + "\n").repeat(paddingTop) + code
        }
        if (paddingBottom) {
            const lastLineWidth = getWidestLine(code.split("\n")[0] || "")
            code = code + ("\n" + space(lastLineWidth)).repeat(paddingBottom)
        }
        if (paddingLeft || paddingRight) {
            code = code
                .split("\n")
                .map(l => space(paddingLeft) + l + space(paddingRight))
                .join("\n")
        }

        return code
    }
}

Code.propTypes = {
    language: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    tabSize: PropTypes.number,
    fill: PropTypes.bool,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    paddingX: PropTypes.number,
    paddingY: PropTypes.number,
    padding: PropTypes.number
}

Code.defaultProps = {
    tabSize: 4,
    fill: true,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingX: 0,
    paddingY: 0,
    padding: 0
}

module.exports = Code
