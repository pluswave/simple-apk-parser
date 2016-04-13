var os = require("os");
var exec = require("child_process").execFile;

function parseOutput(out, cb){
  if( !out ){
    return cb(new Error('no input'));
  }
  var lines = out.split('\n');
  
  var retConfig = {};
  lines.forEach(function(line){
    var kv = line.split(':');
    var key = kv[0];
    if( key == 'package'){
      var infos = kv[1].trim().split(' ');
      infos.forEach( function(info){
        var kv2 = info.split('=');
        retConfig[kv2[0]] = eval(kv2[1]);
      })
    }
    else if( key == 'application-label'){
      retConfig[kv[0]] = eval(kv[1]);
    }
  })
  //return retConfig;  
  cb(null, retConfig);
}


function parseApk(filename, maxBuffer, cb) {
    if (typeof(maxBuffer) === "function") {
        cb = maxBuffer;
        maxBuffer = 1024 * 1024;
    }

    exec("aapt", ["d", "badging", filename], {
        maxBuffer: maxBuffer,
    }, function (err, out) {
        if (err) {
            return cb(err);
        }
        parseOutput(out, cb);
    });
}

parseApk.parseOutput = parseOutput;

module.exports = parseApk;