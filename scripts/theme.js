// sorry for the shitty code it's 7 am and i haven't slept (i'm about to Fucking Collapse)
// and it's not like the quality of the code matters anyways since it's a dev tool ok

// update: this is the worst concoction of characters i have ever decided to create

const parseColor = require("parse-color")
const CSS = require("css")
const fs = require("fs")
const fetch = require("node-fetch")

const name = process.argv[2]
const fullName = name === "prism" ? "prism" : `prism-${name}`
const firstPath = `/PrismJS/prism/master/themes/${fullName}.css`
const secondPath = `/PrismJS/prism-themes/master/themes/${fullName}.css`
let usedPath = firstPath
const baseRawURL = "https://raw.githubusercontent.com"

async function main() {
    const stylesheet = await fetch(baseRawURL + firstPath)
        .then(res => {
            if (res.status !== 200) throw new Error()
            else return res
        })
        .catch(async res => {
            res = await fetch(baseRawURL + secondPath)
            if (res.status !== 200) throw new Error("Couldn't fetch.")
            usedPath = secondPath
            return res
        })
        .then(res => res.text())

    const ast = CSS.parse(stylesheet)
    if (ast.stylesheet.parsingErrors.length) throw new Error("Invalid CSS.")
    const { rules } = ast.stylesheet
    const theme = {}

    // looping twice because second loop's code depends on first's result (????????)

    // "global" selector
    for (const rule of rules)
        if (rule.selectors && rule.selectors.join(", ").includes(`class*="language-"`)) {
            const background = rule.declarations.find(d =>
                ["background", "background-color"].includes(d.property)
            )
            if (background && background.value !== "none" && !theme.background)
                theme.background = parseColor(background.value).hex

            const color = rule.declarations.find(d => d.property === "color")
            if (color && !theme.color) theme.color = parseColor(color.value).hex
        }

    // token-specific selectors
    for (const rule of rules)
        if (rule.selectors)
            for (const selector of rule.selectors) {
                if (selector.startsWith(".token.")) {
                    const color = parseColor(
                        (rule.declarations.find(d => d.property === "color") || {})
                            .value || theme.color
                    ).hex

                    const opacity = rule.declarations.find(d => d.property === "opacity")
                    const actualColor =
                        opacity == null
                            ? color
                            : color + Number(opacity.value).toString(16).slice(2, 4)
                    const fontWeight = (
                        rule.declarations.find(d => d.property === "font-weight") || {}
                    ).value
                    const fontStyle = (
                        rule.declarations.find(d => d.property === "font-style") || {}
                    ).value
                    const bold = fontWeight === "bold"
                    const italic = fontStyle === "italic"

                    const token = selector.slice(".token.".length)
                    const style =
                        !bold && !italic
                            ? actualColor
                            : bold
                            ? { bold, color: actualColor }
                            : { italic, color: actualColor }

                    if (!theme.tokens) theme.tokens = {}
                    theme.tokens[token] = style
                }
            }

    if (!theme.background || !theme.color || !theme.tokens)
        throw new Error("Couldn't complete theme.")

    const originalComment = (rules.find(r => r.type === "comment") || {}).comment
    const date = new Date()
    const pad = n => n.toString().padStart(2, "0")
    const comment = `/**
 * Last updated: ${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}
 * Source: https://github.com${usedPath.replace("master", "blob/master")}
 * ${
     originalComment
         ? "\n" +
           originalComment
               .replace(/^\n|\n$/g, "")
               .split("\n")
               .map(l => " * " + l)
               .join("\n")
         : ""
 }
 */`
    const json = JSON.stringify(theme, null, 4)
    const source = `${comment}\n\nmodule.exports = ${json}`

    await fs.promises.writeFile(
        `./src/themes/${name.replace(/-(\w)/g, (_, $1) => $1.toUpperCase())}.js`,
        source
    )
}

main()
