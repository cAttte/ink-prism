const Prism = require("prismjs")
module.exports = Prism

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
