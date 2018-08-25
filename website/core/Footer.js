/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const { theme } = require('@aragon/ui')
const styled = require('styled-components').default

const FooterContainer = styled.footer`
  background: ${theme.badgeInfoForeground} !important;
`

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc + '.html';
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc + '.html';
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <FooterContainer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Documentation</h5>
            <a href={this.docUrl('getting-started')}>Get started</a>
            <a href={this.docUrl('tutorial')}>Tutorial</a>
            <a href={this.docUrl('aragonos-intro')}>aragonOS</a>
            <a href={this.docUrl('aragonjs-ref')}>aragon.js</a>
            <a href={this.docUrl('aragonui-intro')}>Aragon UI</a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="http://wiki.aragon.org/projects/" target="_blank">
              User showcase
            </a>
            <a href="https://aragon.chat" target="_blank">Community chat</a>
            <a
              href="https://twitter.com/AragonProject"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://blog.aragon.org">Blog</a>
            <a href="https://github.com/aragon">GitHub</a>
          </div>
        </section>
      </FooterContainer>
    );
  }
}

module.exports = Footer;
