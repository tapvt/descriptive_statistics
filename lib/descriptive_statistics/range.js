module.exports = function(define){

  define('range', function(){
    var numSort = function (a,b) { return a-b; };
    set =this.sort(numSort);
    return [set[0], set[set.length -1]];
  });

};
