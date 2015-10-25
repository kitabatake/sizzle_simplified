/*
 * sizzle tracing for study
 * http://sizzlejs.com/
 *
 * This code excepted enviroment compatibility and QSA code from original code.
 */

(function(window){

var 
  document = window.document,
  array = [],
  push = array.push,
  rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
  // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
  identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

  matchExpr = {
    "ID": new RegExp( "^#(" + identifier + ")" ),
    "CLASS": new RegExp( "^\\.(" + identifier + ")" ),
    "TAG": new RegExp( "^(" + identifier + "|[*])" ),
    //TODO "ATTR": new RegExp( "^" + attributes )
  },

  rcombinators = new RegExp( "^(\\s+)" );


window.Sizzle = Sizzle = function(selector){

  results = [];

  if(match = rquickExpr.exec( selector )){

    // Speed-up: Sizzle("#ID")
    if (match[1]) {
      if (elem = document.getElementById(match[1])) {
        results.push(elem);
      }
    }
    // Speed-up: Sizzle("TAG")
    else if (match[2]) {
      push.apply(results, document.getElementsByTagName(match[2]));
    
    } 
    // Speed-up: Sizzle(".CLASS")
    else if (match[3]) {
      push.apply(results, document.getElementsByClassName(match[3]));
    }
  }

  console.log(results);
  return results;
}

Sizzle.tokenize = function(selector){

  var matched, match, tokens = [], type, soFar = selector;

  while ( soFar ) {

    matched = false;

    //combinator
    if  (match = rcombinators.exec(soFar) ) {

      matched = match.shift();
      tokens.push({
        value: matched,
        type: match[0]
      });

      soFar = soFar.slice(matched.length);
    }

    //Filters
    for (type in matchExpr) {
      if ( match = matchExpr[type].exec(soFar) ) {
        matched = match.shift();
        tokens.push({
          value: matched,
          type: type,
          matches: match
        });
        soFar = soFar.slice( matched.length );
      }
    }

    if ( !matched ) {
       console.log("not match");
      break;
    }
  }

  return tokens;
}


})(window);


window.onload = function(){
  //Sizzle(".rabi");

  console.log(Sizzle.tokenize("p a"));

}



