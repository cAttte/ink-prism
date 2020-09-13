const fs = require("fs")
const Prism = require("prismjs")
Prism.themes = {}

Prism.loadLanguage = function loadLanguage(name) {
    name = name
        .replace(/([A-Z])/g, (_, $1) => `-${$1.toLowerCase()}`)
        .replace(/^prism-?/, "")
    require(`prismjs/components/prism-${name}.min.js`)
}

Prism.loadAllLanguages = function loadAllLanguages() {
    const languages = require("prismjs/components.json").languages
    Object.keys(languages).forEach(language => {
        try {
            require(`prismjs/components/prism-${language}.min.js`)
        } catch {}
    })
}

Prism.addLanguage = function addLanguage(name, grammar, extend) {
    if (extend) grammar = Prism.languages.extend(extend, grammar)
    Prism[name] = grammar
}

Prism.loadTheme = function loadTheme(name) {
    const theme = require(`./themes/${name}`)
    Prism.themes[name] = theme
}

Prism.loadAllThemes = function loadAllThemes() {
    const files = fs.readdirSync("./themes")
    files.forEach(file => {
        const name = file.replace(/\.js$/, "")
        Prism.themes[name] = require(`./themes/${file}`)
    })
}

Prism.addTheme = function addTheme(name, theme) {
    Prism[name] = theme
}

Prism.loadTheme("prism")
module.exports = Prism
