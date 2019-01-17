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
  Button,
  EmptyStateCard,
  IconSettings,
  IconBlank,
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

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
)

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} alt="" />
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
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button.Anchor mode="strong" href={docUrl('getting-started')}>
              Get started
            </Button.Anchor>
            &nbsp;&nbsp;
            <Button.Anchor mode="text" className="take-tutorial" href={docUrl('tutorial')}>
              Take the tutorial >
            </Button.Anchor>
          </PromoSection>
        </div>
        <div className="home-logo">
          <img src={imgUrl('hero.svg')} />
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

const IconTokens = () => (
  <svg width="22" height="22" viewBox="0 0 22 22">
    <g fill="none">
      <path d="M0 0h22v22H0z" />
      <g transform="translate(2 3)" stroke="#8B9396">
        <circle cx="9" cy="13" r="3" />
        <circle cx="9" cy="2" r="2" />
        <circle cx="2" cy="5" r="2" />
        <circle cx="16" cy="5" r="2" />
        <path d="M3.275 6.48l3.715 4.164m1.994-6.645v5.99m5.844-3.393l-4.019 4.018" />
      </g>
    </g>
  </svg>
)

const StyledGetStartedButton = styled(Button.Anchor)`
  width: 150px;
  margin-top: 20px;
`

const GetStartedButton = ({ href }) => (
  <StyledGetStartedButton mode="strong" href={href}>Get started</StyledGetStartedButton>
)

const BuildingBlocks = props => (
  <BuildingBlocksContainer className="white-section">
    <BlocksCards
      title="AragonOS"
      text={<p>Solidity framework for governance</p>}
      actionButton={() => <GetStartedButton href={docUrl('aragonos-intro')}/>}
      icon={() => <img src={siteConfig.baseUrl + siteConfig.os} />}
    />
    <BlocksCards
      title="AragonAPI"
      text={<p>Easily interact with your dapp's state</p>}
      actionButton={() => <GetStartedButton href={docUrl('aragonjs-intro')}/>}
      icon={() => <img src={siteConfig.baseUrl + siteConfig.api} />}
    />
    <BlocksCards
      title="AragonUI"
      text={<p>Create a beautiful UI for your dapp</p>}
      actionButton={() => <GetStartedButton href={docUrl('aragonui-intro')}/>}
      icon={() => <img src={siteConfig.baseUrl + siteConfig.ui} />}
    />
  </BuildingBlocksContainer>
)

const BuildingBlocksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  flex-wrap: wrap;
`

const BlocksCards = styled(EmptyStateCard)`
  border-radius: 6px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.08);
  background-color: #f9fafc;
  border: 0px solid transparent;
  margin: 1rem;
  height: auto;
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  flex-wrap: wrap;

  p {
    font-size: 19px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.4;
    letter-spacing: 0.2px;
    text-align: center;
    color: #7f8198;
  }
  h1 span {
    font-size: 40px !important;
    font-family: 'HankenGroteskLight', sans-serif !important;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.48;
    letter-spacing: normal;
    text-align: center;
    color: #2d4051;
  }

`

const Hero = props => (
  <div className="productShowcaseSection paddingTop white-section">
    <SectionTitle className="light">Build DAOs, protocols and dapps</SectionTitle>
    <GreyText>
      Aragon is the most powerful and modular way to run <a href="https://en.wikipedia.org/wiki/Decentralized_autonomous_organization" target="_blank">DAOs</a>.
      But on our journey creating DAOs, we discovered how to modularize individual components that can be used for creating any dapp or crypto protocol.
    </GreyText>
  </div>
)

const GreyText = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.75;
  letter-spacing: 0.1px;
  text-align: center;
  color: #7f8198;
`

const SectionTitle = styled.h2`
  font-size: 42px !important;
  font-family: 'HankenGroteskLight'!important;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.48 !important;
  letter-spacing: normal;
  text-align: center;
  padding: 0 !important ;
  color: #2d4051 !important;
`

const UseCasesContainer = styled(Container)`
  flex: auto;
  display: flex;
  flex-direction: column;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0!important;
`
const UseCaseCard = styled.div`
  border-radius: 6px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  padding: 30px;
  max-width: 85vw;
  width: 1020px;
  min-height: 405px!important;
  margin: auto;
  display: flex;
  &.third {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    h2,p {
      width: 500px;
      max-width: 100%!important;
    }
  }
  h2 {
    margin-top: 0 !important;
    padding-top: 0 !important;
    font-size: 46px !important;
    font-family: 'HankenGroteskLight', sans-serif !important;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35 !important;
    letter-spacing: normal;
    color: #2d4051;
    max-width: 500px!important;
  }
  p {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.75;
    letter-spacing: 0.1px;
    color: #7f8198;
    max-width: 500px!important;
  }

`

const SecondaryNavbar = props => (
  <div class="secondary-navbar">
    <div class="secondary-container">
      <a class="secondary-item" href="https://aragon.org/project/governance">
        <img src={imgUrl('nav-cli.svg')} />
        <h6>aragon SDK</h6>
      </a>
      <a class="secondary-item" href="https://aragon.org/project/grants">
        <img src={imgUrl('nav-os.svg')} />
        <h6>aragon OS</h6>
      </a>
      <a class="secondary-item" href="https://aragon.org/project/contribute">
        <img src={imgUrl('nav-api.svg')} />
        <h6>aragon API</h6>
      </a>
      <a class="secondary-item" href="https://blog.aragon.org/" target="_blank">
        <img src={imgUrl('nav-ui.svg')} />
        <h6>aragon UI</h6>
      </a>
      <a class="secondary-item" href="https://aracon.one/" target="_blank">
        <img src={imgUrl('nav-cli.svg')} />
        <h6>aragon CLI</h6>
      </a>
    </div>
  </div>
);

const UseCases = props => (
  <UseCasesContainer className="grey-section">
    <UseCaseCard className="for-daos">
      <div class="for-daos-img-div "><img src={imgUrl('for-daos.svg')} /></div>
      <div>
      <h2 className="light">For DAOs</h2>
      <p>You can create organizations that let entities (users, smart contracts) interact with each other and create rich <b>governance mechanisms</b> by using the <a href="/docs/acl-intro.html">Access Control List</a>.</p>
      <p>You can also create templates so other people will be able to create pre-configured organizations just by selecting your template in the setup process. This way, you can benefit from the existing stack for creating and managing decentralized organizations.</p>
      </div>
    </UseCaseCard>
    <br />
    <UseCaseCard className="for-dapps">
      <div>
        <h2 className="light">For dapps</h2>
        <p>You can create <b>dapps that run within the <a href="https://app.aragon.org">Aragon client</a></b> (Aragon apps). Aragon apps are interoperable between each other and can forward actions to one another so there's no need to reinvent the wheel.</p>
        <p>An example is a voting app that can forward the intent of a user to another app if the voting passes. You can just build an Aragon app that exposes some functionality and then any governance mechanism will be able to consume it without any additional changes.</p>
      </div>
    </UseCaseCard>
    <br />
    <UseCaseCard className="third crypto-protocol">
        <h2 className="light">For crypto protocols</h2>
        <p>You can build any governance mechanism to upgrade your crypto protocol or its parameters. Benefit from any of the existing governance mechanisms that support aragonOS, or easily roll out your own.</p>
    </UseCaseCard>
  </UseCasesContainer>
)

const TrustedBy = props => {
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
    <TrustedByContainer className="productShowcaseSection paddingBottom white-section">
      <SectionTitle className="light">Trusted by</SectionTitle>
      <GreyText>Projects like these leverage the Aragon stack</GreyText>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href="http://wiki.aragon.org/projects/" target="_blank">
          More Aragon users
        </a>
      </div>
    </TrustedByContainer>
  )
}

const TrustedByContainer = styled.div`
  padding-bottom: 60px;
  padding-top: 30px;
  .more-users a {
    background-image: linear-gradient(84deg, #00dbe2, #01bfe3);
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: none;
    border: solid 0 transparent;
  }
  .more-users a:hover {
    background-image: linear-gradient(84deg,#028084,#007e96);
    transition: all 0.25s ease-in-out;
  }
`

const MainContainer = styled.div`
  background-color: ${theme.mainBackground}
`

class Index extends React.Component {
  render() {
    let language = this.props.language || ''

    return (
      <IndexContainer className="home-section">
        <SecondaryNavbar />
        <HomeSplash />
        <MainContainer className="mainContainer">
          <Hero />
          <BuildingBlocks />
          <UseCases />
          <TrustedBy />
        </MainContainer>
      </IndexContainer>
    )
  }
}

const IndexContainer = styled.div`
  .white-section {
    background: white;
  }
  .grey-section {
    background-color: #f9fafc;
  }
  h1, h2, p, span, a, button {
    font-family: 'HankenGroteskRegular', 'Overpass', sans-serif !important;
  }
  h2.light {
    font-family: 'HankenGroteskLight', sans-serif !important;
  }
`
module.exports = Index
