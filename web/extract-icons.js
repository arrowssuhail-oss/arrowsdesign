
const { Palette, Layout, PenTool, Monitor, Layers, Sparkles, Video } = require("lucide-react");
const { renderToStaticMarkup } = require("react-dom/server");
const React = require("react");

const icons = { Palette, Layout, PenTool, Monitor, Layers, Sparkles, Video };

Object.entries(icons).forEach(([name, Icon]) => {
    console.log(`\n--- ${name} ---`);
    console.log(renderToStaticMarkup(React.createElement(Icon)));
});
