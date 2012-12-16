require('nodeunit');
require('../index');
var csv = require('csv');


module.exports = {
  setUp: function(callback) {
    this.data = [];
    this.modeData = [];

    function toFloat(number){
      return parseFloat(number, 10);
    }


    var self = this;
    csv()
    .fromPath(__dirname+'/testdata.csv')
    .on('data',function(data,index){
      this.data.push(data.map(toFloat));
    }.bind(this))
    .on('end', function() {

        csv()
        .fromPath(__dirname+'/modetestdata.csv')
        .on('data',function(data,index){
          self.modeData.push(data);
        }.bind(self))
        .on('end', callback.bind(null, null));

    });

  },
  test_modes: function(t) {

    var dataCols = 8;

    var assertionCount = function(modeData) {
     var count = 0;
       modeData.forEach(function(row) {
        count += row.length - dataCols;
       });
       return count;
    };

    t.expect(assertionCount(this.modeData));

    this.modeData.forEach(function(row){
      var modes = row.slice(0, dataCols).modes;
      modes = modes.sort();
      for (var base = 0; base < row.length - dataCols; base++) {
        t.equal(modes[base], row[base+dataCols]);
      }
    });
    t.done();
  },
  test_range: function(t){
    t.expect(this.data.length * 2);

    this.data.forEach(function(row){
      var range = function(row) {
        row = row.sort(function(a,b){return a-b});
        return [row[0], row[row.length-1]];
      }
      var testRange = range(row.slice(0,10));
      var range = row.slice(0, 10).range;
      t.equal(range[0], testRange[0]);
      t.equal(range[1], testRange[1]);
    });
    t.done();
  },
  test_sum: function(t){
    t.expect(this.data.length);

    this.data.forEach(function(row){
      t.equal(Math.round(row.slice(0, 10).sum), Math.round(row[10]));
    });
    t.done();
  },

  test_mean: function(t){
    t.expect(this.data.length);

    this.data.forEach(function(row){
      t.equal(Math.round(row.slice(0, 10).mean), Math.round(row[11]));
    });
    t.done();
  },

  test_mean: function(t){
    t.expect(this.data.length);

    this.data.forEach(function(row){
      t.equal(Math.round(row.slice(0,10).mean), Math.round(row[11]));
    });
    t.done();
  },

  test_median: function(t){
    t.expect(this.data.length);

    this.data.forEach(function(row){
      t.equal(Math.round(row.slice(0,10).median), Math.round(row[12]));
    });
    t.done();
  },

  test_variance: function(t){
    t.expect(this.data.length);

    this.data.forEach(function(row){
      t.equal(Math.round(row.slice(0,10).variance), Math.round(row[13]));
    });
    t.done();
  },

  test_standard_deviation: function(t){
    t.expect(this.data.length);

    this.data.forEach(function(row){
      t.equal(Math.round(row.slice(0,10).standard_deviation), Math.round(row[14]));
    });
    t.done();
  },


  test_percentile: function(t){
    t.expect(this.data.length * 11);

    this.data.forEach(function(row){
      t.equal(Math.round(row.slice(0,10).percentile(0)), Math.round(row[15]));
      t.equal(Math.round(row.slice(0,10).percentile(10)), Math.round(row[16]));
      t.equal(Math.round(row.slice(0,10).percentile(20)), Math.round(row[17]));
      t.equal(Math.round(row.slice(0,10).percentile(30)), Math.round(row[18]));
      t.equal(Math.round(row.slice(0,10).percentile(40)), Math.round(row[19]));
      t.equal(Math.round(row.slice(0,10).percentile(50)), Math.round(row[20]));
      t.equal(Math.round(row.slice(0,10).percentile(60)), Math.round(row[21]));
      t.equal(Math.round(row.slice(0,10).percentile(70)), Math.round(row[22]));
      t.equal(Math.round(row.slice(0,10).percentile(80)), Math.round(row[23]));
      t.equal(Math.round(row.slice(0,10).percentile(90)), Math.round(row[24]));
      t.equal(Math.round(row.slice(0,10).percentile(100)), Math.round(row[25]));
    });
    t.done();
  }

};
