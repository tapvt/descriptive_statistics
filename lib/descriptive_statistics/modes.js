module.exports = function(define){
  define('modes', function(){
    var counts   = {};
    var maxCount = 0;
    var i        = 0;
    var maxKeys = [];

    this.forEach(function(item) {
        if (!counts[item]) {
            counts[item] = 1;
        } else {
            counts[item]++;
        }
    });

    for (i in counts) {
        if(counts[i] > maxCount) {
            maxCount = counts[i];
            maxKeys   = [i];
        } else if (counts[i] === maxCount) {
            maxKeys.push(i);
        }
    }

    if (counts[maxKeys[0]] === 1) { return null; }
    return maxKeys;
  });
};

