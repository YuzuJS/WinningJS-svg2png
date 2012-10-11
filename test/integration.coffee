"use strict"

grunt = require("grunt")
path = require("path")
fs = require("fs")

require("chai").should()

relative = (segments...) => path.resolve(__dirname, segments...)
isPng = (fileName) => path.extname(fileName).toLowerCase() is ".png"

doTask = (afterRun) =>
    grunt.task.loadTasks(relative("../tasks"))
    grunt.initConfig("winningJS-svg2png": [relative("images/*.svg")])
    grunt.task.run("winningJS-svg2png").start()
    grunt.task.options({ done: afterRun })

after =>
    files = fs.readdirSync(relative("images"))
    pngs = files.filter(isPng)
    pngs.forEach (png) =>
        fs.unlinkSync(relative("images/" + png))

specify "Integration test", (done) =>
    doTask =>
        files = fs.readdirSync(relative("images"))
        pngs = files.filter(isPng)

        try
            pngs.sort().should.deep.equal([
                "1.scale-100.png"
                "1.scale-140.png"
                "1.scale-180.png"
                "1.scale-80.png"
                "2.scale-100.png"
                "2.scale-140.png"
                "2.scale-180.png"
                "2.scale-80.png"
            ])
            done()
        catch err
            done(err)
