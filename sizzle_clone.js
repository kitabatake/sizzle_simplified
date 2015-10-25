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
  rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;


window.Sizzle = Sizzle = function(selector){

  results = [];

  if(match = rquickExpr.exec( selector )){

    // Speed-up: Sizzle("#ID")
    if(match[1]) {
      if(elem = document.getElementById(match[1])){
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


})(window);


window.onload = function(){
  Sizzle(".rabi");
}



