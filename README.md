# SVG-to-PNG Converter for Windows 8 Apps

Images in Windows 8 apps can scale to a number of sizes: 0.8× for certain app-manifest assets, as well as 1.4× and 1.8×
for high-DPI displays. Wouldn't it be great if they supported SVGs, so you only had to package one image file?

Well, they do … sometimes. If you're writing your app in HTML5 and JavaScript, you can include SVGs in all cases you
could in a normal web page. But when you interface with Windows Runtime APIs, like for example when sending a toast
notification or tile update, you [must use a PNG, JPG, or GIF][tile-and-toast-image-sizes]. And the poor C++/C#/XAML
users can't use SVGs at all!

This, obviously, sucks.

But there's hope! Continuing the fine tradition of WinningJS projects making Windows 8 App development suck less™,
**WinningJS-svg2png** gives you a nice [Grunt][] plugin for your build process to convert SVGs to PNGs in all the
appropriate sizes. That way you can continue authoring using SVGs, and just use `.svg.png` instead of `.svg` when
referencing the image in your code to get the correctly-scaled image automatically supplied.

WinningJS-svg2png is built on the latest in [PhantomJS][] technology to render your SVGs using a headless WebKit
instance, which we have found to produce much more accurate renderings than other solutions like GraphicsMagick or
Inkscape.

## Usage

You'll want to have set up a Gruntfile for your project. Inside of it, you register and configure the task like so:

```js
grunt.loadNpmTasks("winningjs-svg2png");

grunt.initConfig({
    "WinningJS-svg2png": ["images\**\*.svg"]
});
```

It will automatically create PNG images as siblings to the SVGs specified in the configuration. That is, if you have
a file at `images/foo.svg`, WinningJS-svg2png will create:

* `images/foo.scale-80.svg.png`
* `images/foo.scale-100.svg.png`
* `images/foo.scale-140.svg.png`
* `images/foo.scale-180.svg.png`

You'll probably want to add the generated files to your `.gitignore` or similar; a good entry would be `*.svg.png`.

You'll also need to be sure Visual Studio (or MSBuild, more accurately) is aware of these files and includes them in
your package output. To do this, edit your `.jsproj` file (e.g. in Notepad). Find the main `<ItemGroup>` section, and
add a line like

```xml
<Content Include="images\**\*.svg" />
```

For more general steps on integrating Grunt into a Windows 8 App's build process, check out the [WinningJS-build][]
package's instructions.


[tile-and-toast-image-sizes]: http://msdn.microsoft.com/en-us/library/windows/apps/hh781198.aspx
[Grunt]: http://gruntjs.com/
[PhantomJS]: http://phantomjs.org/
[WinningJS-build]: https://github.com/NobleJS/WinningJS-build#how-to-use-with-visual-studio
