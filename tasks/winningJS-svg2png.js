"use strict";

var Q = require("q");
var svgToWin8Pngs = require("../lib/svgToWin8Pngs");

var name = require("../package.json").name;
var description = require("../package.json").description;

module.exports = function (grunt) {
    grunt.registerMultiTask(name, description, function () {
        var done = this.async();

        Q.all(this.filesSrc.map(svgToWin8Pngs)).thenResolve().done(done);
    });
};
