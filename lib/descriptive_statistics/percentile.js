// module Enumerable
//   def percentile(p)
//     sorted = self.sort
//     return sorted[-1].to_f if p == 100
//     rank = p.to_f / 100.to_f * (self.number - 1)
//     lrank = rank.floor
//     d = rank - lrank
//     lower = sorted[lrank].to_f
//     upper = sorted[lrank+1].to_f
//     lower + (upper - lower) * d
//   end
// end

module.exports = function(define) {

    Array.prototype.percentile = function(p) {
        var sorted = this.sort();
        if (p === 100) {
            return sorted[sorted.length - 1];
        }
        var rank = p / 100 * (this.number - 1);
        var lrank = Math.floor(rank);
        var d = rank - lrank;
        var lower = sorted[lrank];
        var upper = sorted[lrank + 1];
        return lower + (upper - lower) * d;
    };

};
