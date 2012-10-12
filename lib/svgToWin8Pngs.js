"use strict";

var path = require("path");
var Q = require("q");
var svg2png = Q.nbind(require("svg2png"));

var scales = {
    ".scale-80": 0.8,
    ".scale-100": 1.0,
    ".scale-140": 1.4,
    ".scale-180": 1.8
};

module.exports = function svgToWin8Pngs(sourceFileName) {
    var extensionlessSourceFileName = sourceFileName.slice(0, -path.extname(sourceFileName).length);

    return Q.all(Object.keys(scales).map(function (suffix) {
        var destFileName = extensionlessSourceFileName + suffix + ".png";
        var scale = scales[suffix];

        return svg2png(sourceFileName, destFileName, scale);
    }));
};
