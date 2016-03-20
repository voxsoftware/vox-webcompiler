var Module= new core.VW.Module(__dirname)
Module.loadConfigFile("core-modules.json")
Module.import()

core.VW.Web.Compiler.version= require("./package.json").version
module.exports= core.VW.Web