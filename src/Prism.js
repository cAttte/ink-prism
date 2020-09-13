const fs = require("fs")
const path = require("path")
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
    if (extend) grammar = this.languages.extend(extend, grammar)
    this[name] = grammar
}

Prism.loadTheme = function loadTheme(name) {
    const theme = require(`./themes/${name}`)
    this.themes[name] = theme
}

Prism.loadAllThemes = function loadAllThemes() {
    const files = fs.readdirSync(path.join(__dirname, "./themes"))
    files.forEach(file => {
        const name = file.replace(/\.js$/, "")
        this.themes[name] = require(`./themes/${file}`)
    })
}

Prism.addTheme = function addTheme(name, theme) {
    this[name] = theme
}

Prism.loadTheme("prism")
module.exports = Prism
