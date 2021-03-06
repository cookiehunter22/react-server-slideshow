import React from 'react'
import ReactDOMServer from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter';
// import our main App component
import AppRouter from '../../src/Components/AppRouter/AppRouter';
const path = require("path");
const fs = require("fs");
const json = require(`../../src/Components/App/ProjectMap.json`)
export default (req, res, next) => {
    // point to the html file created by CRA's build tool
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error in read!', err);
            return res.status(404).end()
        }
        // render the app as a string
        const context = {};
        const html = ReactDOMServer.renderToString(
          <StaticRouter location={req.url} context={context}>
            <AppRouter/>
          </StaticRouter>
        );
        // inject the rendered app into our html and send it
        const title = json.title;

        htmlData = htmlData.replace(
            /<title><\/title>/,
            `<title>${title}</title>`
        )

        htmlData = htmlData.replace(
            '<div id="root"></div>',
            `<div id="root">${html}</div>`
        )

        htmlData = htmlData.replace(
            'static/js/main',
            'static/static/js/main'
        )

        htmlData = htmlData.replace(
            '/static/css/main',
            '/static/static/css/main'
        )

        // check COMMENTS
        const allowComments = process.env.ALLOW_COMMENTS || false;
        htmlData = htmlData.replace(
            '<script id="ININTIAL_STATE" type="text/javascript"></script>',
            `<script type="text/javascript">window.ALLOW_COMMENTS=${allowComments}</script>`
        )

        return res.status(200).send(htmlData);
    });
}
