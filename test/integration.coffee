"use strict"

path = require("path")
fs = require("fs")
require("chai").should()

relative = (segments...) => path.resolve(__dirname, segments...)
isPng = (fileName) => path.extname(fileName).toLowerCase() is ".png"


specify "Integration test", =>
    files = fs.readdirSync(relative("images"))
    pngs = files.filter(isPng)
    expectedPngs = fs.readdirSync(relative("images/expected"))

    pngs.sort().should.deep.equal(expectedPngs)

    pngs.forEach (png) =>
        expected = fs.readFileSync(relative("images/expected/" + png)).toString()
        actual = fs.readFileSync(relative("images/" + png)).toString()

        actual.should.equal(expected)
