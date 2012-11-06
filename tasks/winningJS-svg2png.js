"use strict";

var Q = require("q");
var svgToWin8Pngs = require("../lib/svgToWin8Pngs");

var name = "WinningJS-svg2png";
var description = require("../package.json").description;

module.exports = function (grunt) {
    grunt.registerTask(name, description, function () {
        this.requiresConfig(name);
        var done = this.async();
        var config = grunt.config(name);

        var svgs = grunt.file.expandFiles(config);

        Q.all(svgs.map(svgToWin8Pngs)).thenResolve().done(done);
    });
};
