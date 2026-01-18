
const { Download } = require("lucide-react");
const { renderToStaticMarkup } = require("react-dom/server");
const React = require("react");

console.log(renderToStaticMarkup(React.createElement(Download)));
