const Prism = require("./Prism")

module.exports.Code = require("./components/Code")
module.exports.loadLanguage = Prism.loadLanguage.bind(Prism)
module.exports.loadAllLanguages = Prism.loadAllLanguages.bind(Prism)
module.exports.addLanguage = Prism.addLanguage.bind(Prism)
module.exports.loadTheme = Prism.loadTheme.bind(Prism)
module.exports.loadAllThemes = Prism.loadAllThemes.bind(Prism)
module.exports.addTheme = Prism.addTheme.bind(Prism)
