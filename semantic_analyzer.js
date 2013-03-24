var _und = require('./underscore-min');

var getFuncCallErrors = function(sTree) {
  var errs = [];
  if (!(sTree[0] instanceof Array)) {
    if (sTree[0].type == 'string' || sTree[0].type == 'number') {
      errs.push("Invalid function: '" + sTree[0].txt + "'");
    }

    if (sTree[0].txt == 'def' && sTree[1].type != 'id') {
      errs.push("Identifier expected.");
    }
  }

  _und.each(sTree, function(el) {
    if (el instanceof Array) {
      errs = errs.concat(getFuncCallErrors(el));
    }
  });
  return errs;
}

var getSemanticErrors = function(sTree) {
  var errs = [];
  errs = errs.concat(getFuncCallErrors(sTree));
  return errs;
}

exports.getSemanticErrors = getSemanticErrors;