module.exports = function(define){
  define('modes', function(){
    var counts   = {};
    var maxCount = 0;
    var i        = 0;
    var maxKeys  = [];
    var origKeys = {};

    this.forEach(function(item) {
        if (!counts[item]) {
            counts[item] = 1;
            origKeys[item] = item;
        } else {
            counts[item]++;
        }
    });

    Object.keys(counts).forEach(function(i) {
        if ( counts.hasOwnProperty(i) ) {
            if(counts[i] > maxCount) {
                maxCount = counts[i];
                maxKeys  = [origKeys[i]];
            } else if (counts[i] === maxCount) {
                maxKeys.push(origKeys[i]);
            }
        }
    });

    if (counts[maxKeys[0]] === 1) { return null; }
    return maxKeys;
  });
};

