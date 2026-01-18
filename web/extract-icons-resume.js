
const { Briefcase, GraduationCap } = require("lucide-react");
const { renderToStaticMarkup } = require("react-dom/server");
const React = require("react");

const icons = { Briefcase, GraduationCap };

Object.entries(icons).forEach(([name, Icon]) => {
    console.log(`\n--- ${name} ---`);
    console.log(renderToStaticMarkup(React.createElement(Icon)));
});
