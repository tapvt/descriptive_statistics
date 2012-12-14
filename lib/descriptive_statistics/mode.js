module.exports = function(define){
  define('mode', function(){
    var counts   = {};
    var maxCount = 0;
    var i        = 0;
    var maxKey;

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
            maxKey   = i;
        }
    }

    if (counts[maxKey] === 1) { return null; }

    return maxKey;
  });
};

