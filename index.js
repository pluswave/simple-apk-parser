var os = require("os");
var exec = require("child_process").execFile;

function parseOutput(out, cb){
  if( !out ){
    return cb(new Error('no input'));
  }
  
  
  
}


function parseApk(filename, maxBuffer, cb) {
    if (typeof(maxBuffer) === "function") {
        cb = maxBuffer;
        maxBuffer = 1024 * 1024;
    }

    exec("aapt", ["l", "-a", filename], {
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