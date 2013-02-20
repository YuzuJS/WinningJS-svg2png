"use strict";

module.exports = function (grunt) {
    grunt.loadTasks("tasks");
    grunt.loadNpmTasks("grunt-simple-mocha");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.initConfig({
        "winningjs-svg2png": ["test/images/*.svg"],
        clean: ["test/images/*.png"],
        simplemocha: ["test/*.coffee"]
    });

    grunt.registerTask("test", ["clean", "winningjs-svg2png", "simplemocha", "clean"]);
};
