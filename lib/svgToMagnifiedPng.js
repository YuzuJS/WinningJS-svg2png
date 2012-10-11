"use strict";

var Q = require("q");
var path = require("path");
var execFile = require("child_process").execFile;

var phantomjsCmd = path.resolve(__dirname, "../node_modules/.bin/phantomjs.cmd");
var magnifierFileName = path.resolve(__dirname, "./magnifier.js");

module.exports = function svgToMagnifiedPng(sourceFileName, destFileName, magnification) {
    var deferred = Q.defer();

    var args = [magnifierFileName, sourceFileName, destFileName, magnification];
    execFile(phantomjsCmd, args, function (err, stdout, stderr) {
        if (err) {
            deferred.reject(err);
            return;
        }

        if (stderr.length > 0) {
            deferred.reject(new Error(stderr.toString()));
            return;
        }

        deferred.resolve();
    });

    return deferred.promise;
};
