/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')
const MarkdownBlock = CompLibrary.MarkdownBlock /* Used to read markdown */
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock
const {
  AragonApp,
  Button,
  EmptyStateCard,
  IconSettings,
  IconBlank,
  IconShare,
  Card,
  Text,
  theme
} = require('@aragon/ui')
const styled = require('styled-components').default

const style = { color: theme.textPrimary }

const siteConfig = require(process.cwd() + '/siteConfig.js')

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc + '.html'
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page + '.html'
}

/*class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    )
  }
}

Button.defaultProps = {
  target: '_self',
}*/

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
)

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
)

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
)

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
)

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || ''
    return (
      <SplashContainer>
        <Logo img_src={imgUrl('stroke.png')} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>            
            <Button.Anchor mode="strong" href={docUrl('get-started')}>
              Get started
            </Button.Anchor>
            &nbsp;&nbsp;
            <Button.Anchor mode="text" href={docUrl('tutorial')}>
              Take the tutorial >
            </Button.Anchor>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
)

const TextContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 20px;
  justify-content: space-around;
  align-items: center;
  white-space: nowrap;
`

const BuildingBlocksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  flex-wrap: wrap;

  & > div {
    margin: 1rem;
  }
`

const IconTokens = () => <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h22v22H0z"/><g transform="translate(2 3)" stroke="#8B9396"><circle cx="9" cy="13" r="3"/><circle cx="9" cy="2" r="2"/><circle cx="2" cy="5" r="2"/><circle cx="16" cy="5" r="2"/><path d="M3.275 6.48l3.715 4.164m1.994-6.645v5.99m5.844-3.393l-4.019 4.018"/></g></g></svg>

const StyledGetStartedButton = styled(Button.Anchor)`
  width: 150px;
  margin-top: 20px;
`

const GetStartedButton = ({ href }) => (
  <StyledGetStartedButton mode="strong" href={href}>Get started</StyledGetStartedButton>
)

const BuildingBlocks = props => (
  <BuildingBlocksContainer>
    <EmptyStateCard
      title="aragonOS"
      text="Solidity framework for governance"
      actionButton={() => <GetStartedButton href={docUrl('aragonos-intro')}/>}
      icon={() => <IconSettings /> }
    />
    <EmptyStateCard
      title="aragon.js"
      text="Easily interact your dapp's state"
      actionButton={() => <GetStartedButton href={docUrl('aragonjs-intro')}/>}
      icon={() => <IconTokens /> }
    />
    <EmptyStateCard
      title="Aragon UI"
      text="Create a beautiful UI for your dapp"
      actionButton={() => <GetStartedButton href={docUrl('aragonui-intro')}/>}
      icon={() => <IconBlank /> }
    />
  </BuildingBlocksContainer>
)

const Intro = props => (
  <div className="productShowcaseSection paddingTop">
    <h2>Build DAOs, protocols and dapps</h2>
    <MarkdownBlock>
      Aragon is the most powerful and modular way to run [DAOs](https://en.wikipedia.org/wiki/Decentralized_autonomous_organization).
      But in our journey creating DAOs, we discovered how to modularize individual components that can be used for creating any dapp or crypto protocol.
    </MarkdownBlock>
  </div>
)

const UseCasesContainer = styled(Container)`
  flex: auto;
  display: flex;
  flex-direction: column;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 150% !important;
  }
`

const UseCases = props => (
  <UseCasesContainer padding={['bottom']}>
    <h1>Use cases</h1>
    <h2>For DAOs</h2>
    <MarkdownBlock>
      You can create organizations that let entities (users, smart contracts) interact with each other and create rich **governance mechanisms** by using the **Access Control List** [LINK HERE].
    </MarkdownBlock>
    <MarkdownBlock>
      You can also create templates, so other people will be able to create pre-configured organizations just by selecting your template in the setup process.
      This way, you can benefit from the existing stack for creating and managing decentralized organizations.
    </MarkdownBlock>
    <br />
    <h2>For dapps</h2>
    <MarkdownBlock>
      You can create **dapps that run into Aragon** (Aragon apps).
      Aragon apps are interoperable between themselves, and can **forward actions** to one another, so you don't have to reinvent the wheel.
    </MarkdownBlock>
    <MarkdownBlock>
      An example is a voting app can forward the intent of a user to another app if the voting passes. You can just build an Aragon app that exposes some functionality, and then **any governance mechanism will be able to consume it without any additional changes**.
      You can use the smart contract framework (aragonOS), the JavaScript library to consume their state (aragon.js) and the UI framework (Aragon UI) as you see fit.
    </MarkdownBlock>
    <MarkdownBlock>
      Some examples of Aragon apps:
    </MarkdownBlock>
    <a href={pageUrl('users', props.language)}>
      <img src={imgUrl('cases/althea-small.jpg')} width="50%" />
    </a>
    <br />
    <h2>For crypto protocols</h2>
    <MarkdownBlock>
      You can build any **governance mechanism to upgrade your crypto protocol** or its parameters.
      You can benefit from the existing governance mechanisms that support aragonOS, or roll out your own very easily.
    </MarkdownBlock>
  </UseCasesContainer>
)

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} alt={user.caption} title={user.caption} />
        </a>
      )
    })

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>Trusted by</h2>
      <p>These projects use parts of the Aragon stack</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users', props.language)}>
          More Aragon users
        </a>
      </div>
    </div>
  )
}

const MainContainer = styled.div`
  background-color: ${theme.mainBackground}
`

class Index extends React.Component {
  render() {
    let language = this.props.language || ''

    return (
      <div>
        <HomeSplash />
        <MainContainer className="mainContainer">
          <Intro />
          <BuildingBlocks />
          <UseCases />
          <Showcase />
        </MainContainer>
      </div>
    )
  }
}

/*

          <GridBlock
            align="center"
            layout="threeColumn"
            contents={[
              {
                title: `Upgradeable`,
                content: 'Learn how to use this project',
              },
              {
                title: 'Governance by default',
                content: 'Questions gathered from the community',
              },
              {
                title: 'Action forwarders',
                content: 'Lots of documentation is on this site',
              },
            ]}
          />

*/

module.exports = Index
