var Reaction = require("../reaction")
  , get = require("../util").get
  , rules = require("../rules")
  , path = require("path")

var PartialReaction = Reaction.extend()

PartialReaction.selector = "div[src], li[src], span[src], embed[src]"
 
PartialReaction.preparse = function(el, state) {
  var src = el.attr("src")
    , file = path.resolve(state.currentDir(), src)
    , template = $(state.templates[file])

  state.pathStack.push(file)
  if(el.attr("type") === "text/x-end-dash") {
    template.insertAfter(el)
  } else {
    el.html(template) 
  }
}

PartialReaction.afterPreparse = function(el, state) {
  if(el.is("embed")) {
    el.remove()
  }
}

module.exports = PartialReaction