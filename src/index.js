const Prism = require("./Prism")

module.exports.Code = require("./components/Code")
module.exports.loadLanguage = Prism.loadLanguage.bind(Prism)
module.exports.loadAllLanguages = Prism.loadAllLanguages.bind(Prism)
module.exports.addLanguage = Prism.addLanguage.bind(Prism)
