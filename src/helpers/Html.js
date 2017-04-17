import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import { SheetsRegistryProvider, SheetsRegistry } from 'react-jss';
import CleanCSS from 'clean-css';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    assets: {}
  };

  render() {
    const { assets, component, store } = this.props;
    const sheets = new SheetsRegistry();

    const content = component ? ReactDOM.renderToString(
      <SheetsRegistryProvider registry={sheets}>
        {component}
      </SheetsRegistryProvider>) : '';
    const head = Helmet.rewind();

    const compiledStyles = `::-moz-selection{background-color:#ED402F;color:#fff}
      ::selection{background-color:#ED402F;color:#fff}
      ${sheets.toString()}`;
    const styleSources = new CleanCSS({ level: 2 }).minify(compiledStyles);

    return (
      <html lang="en-US">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Pinjam.co.id" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#ED402F" />
          <meta name="apple-mobile-web-app-title" content="Pinjam.co.id" />
          <meta name="theme-color" content="#ED402F" />

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ?
            <style dangerouslySetInnerHTML={{ __html: '#content{display:none}' }} /> : null}

          <style type="text/css">{styleSources.styles}</style>
        </head>
        <body>
          <div
            id="content"
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ minHeight: '100%', position: 'relative' }} />
          {store && <script
            dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
            charSet="UTF-8"
          />}
          {__DLLS__ && <script key="dlls__vendor" src="/dist/dlls/dll__vendor.js" charSet="UTF-8" />}
          {assets.javascript && <script src={assets.javascript.main} charSet="UTF-8" async defer />}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? <script
            dangerouslySetInnerHTML={{ __html: 'document.getElementById("content").style.display="block";' }} /> : null}
        </body>
      </html>
    );
  }
}
