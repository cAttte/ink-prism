const Prism = require("prismjs")
module.exports = Prism

Prism.loadLanguage = function loadLanguage(name) {
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
