/*
 * sizzle tracing for study
 * http://sizzlejs.com/
 *
 * This code excepted enviroment compatibility and QSA code from original code.
 */

( function( window ) {

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

  Expr = {
    relative: {
      ">": { dir: "parentNode", first: true },
      " ": { dir: "parentNode" },
      "+": { dir: "previousSibling", first: true },
      "~": { dir: "previousSibling" }
    },
    find: {
      "ID": function( id, context ) {
        if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
          var m = context.getElementById( id );
          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document #6963
          return m && m.parentNode ? [ m ] : [];
        }
      },
      "TAG": function( tag, context ) {
        if ( typeof context.getElementsByTagName !== "undefined" ) {
          return context.getElementsByTagName( tag );
        } 
      }
    }
  }

  rcombinators = new RegExp( "^(\\s+)" );


window.Sizzle = Sizzle = function( selector ) {

  results = [];

  if (match = rquickExpr.exec( selector )) {

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

  console.log( results );
  return results;
}

tokenize = Sizzle.tokenize = function( selector ) {

  var matched, match, tokens = [], type, soFar = selector;

  while ( soFar ) {

    matched = false;

    //combinator
    if  ( match = rcombinators.exec( soFar ) ) {

      matched = match.shift();
      tokens.push({
        value: matched,
        type: match[0]
      });

      soFar = soFar.slice( matched.length );
    }

    //Filters
    for (type in matchExpr) {
      if ( match = matchExpr[type].exec( soFar ) ) {
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

select = Sizzle.select = function( selector ) {

  var token,
  tokens = tokenize(selector),
  seed = [];

  // Fetch a seed set for right-to-left matching
  i = tokens.length;
  while( i-- ){

    token = tokens[i];
    type = token.type;

    if ( Expr.relative[type] ) {
      break;
    }
    if ( find = Expr.find[type] ) {
      seed = find( token.matches[0], document );
      tokens.splice(i, 1);
    }
  }

  console.log( seed );
  console.log( tokens );

  seedFilter = compile( selector, tokens );
  return seedFilter( seed );

}

compile = Sizzle.compile = function( selector, tokens ) {

  matcher = makeMatcher( tokens );
  return makeSeedFilter( matcher );
}

makeMatcher = function( tokens ) {
  return function( elem ) {
    //TODO
    return true;
  }
}

makeSeedFilter = function( matcher ) {

  return function( seed ) {
    
    results = [];

    for ( i = 0; i < seed.length; i++) {
      elem = seed[i];
      if ( matcher( elem ) ) {
        results.push( elem );
      }
    }
    
    return results
  }
}


})(window);




