/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

const siteConfig = require(process.cwd() + '/siteConfig.js')

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc
}

class Help extends React.Component {
  render() {
    let language = this.props.language || ''
    const supportLinks = [
      {
        content: `If you found a bug or you have feedback, you can create an issue on GitHub. Some repos that may be of interest:
        - [aragon/aragon](https://github.com/aragon/aragon/issues/): For issues with the dapp
        - [aragon/aragon-apps](https://github.com/aragon/aragon-apps/issues/): For issues with the apps, like the Token Manager, Finance, etc.
        `,
        title: 'Open an issue',
      },
      {
        content: 'Ask questions about the documentation, issues with the tooling, etc. at the [#dev-help channel on the Aragon Chat](https://aragon.chat/channel/dev-help)',
        title: 'Join the community',
      }
    ]

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h2>Need help?</h2>
      <p>If you need help, please reach out to Aragon core contributors and community members.</p>
            </header>
            <br/>
            <h3>Join the community chat</h3>
            <p>
                Ask questions about the documentation, issues with the tooling or how to architect your app at the <a href="https://aragon.chat/channel/dev-help">#dev-help channel on the Aragon Chat</a>
            </p>
            <br/>
            <h3>Open an issue</h3>
      <p>If you found a bug or you have feedback, you can create an issue on the relevant GitHub repo:</p>
            <ul>
                <li><a href="https://github.com/aragon/hack/issues">aragon/hack</a>: This documentation website</li>
                <li><a href="https://github.com/aragon/aragon-cli/issues">aragon/aragon-cli</a>: aragonCLI</li>
                <li><a href="https://github.com/aragon/aragonos/issues">aragon/aragonOS</a>: aragonOS</li>
                <li><a href="https://github.com/aragon/aragon.js/issues">aragon/aragon.js</a>: aragonAPI</li>
                <li><a href="https://github.com/aragon/aragon-ui/issues">aragon/aragon-ui</a>: aragonUI</li>
                <li><a href="https://github.com/aragon/aragon/issues">aragon/aragon</a>: The Aragon dapp</li>
      <li><a href="https://github.com/aragon/aragon-apps/issues">aragon/aragon-apps</a>: Aragon apps: the Token Manager, Finance, etc.</li>
            </ul>
          </div>
        </Container>
      </div>
    )
  }
}

module.exports = Help
