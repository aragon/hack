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
  theme,
  breakpoint,
} = require('@aragon/ui')

const medium = css => breakpoint('medium', css)
const large = css => breakpoint('large', css)

const styled = require('styled-components').default

const style = { color: theme.textPrimary }

const siteConfig = require(process.cwd() + '/siteConfig.js')

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img
}

function docUrl(doc, language) {
  return (
    siteConfig.baseUrl +
    'docs/' +
    (language ? language + '/' : '') +
    doc +
    '.html'
  )
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page + '.html'
}

class Hero extends React.Component {
  render() {
    return (
      <HeroContainer>
        <div>
          <h2 className="projectTitle">{siteConfig.title}</h2>
          <p className="project-subtitle">{siteConfig.tagline}</p>
          <PromoSection>
            <a className="primary" href={docUrl('getting-started')}>
              Get started
            </a>
            &nbsp;&nbsp;
            <a mode="text" className="secondary" href={docUrl('tutorial')}>
              Take the tutorial
            </a>
          </PromoSection>
        </div>
      </HeroContainer>
    )
  }
}

const BuildingBlocks = props => (
  <BuildingBlocksContainer className="white-section">
    <BlocksCards href={docUrl('apm-intro')} className="pm">
      <div className="border-line" />
      <div className="blocks-container">
        <img src={siteConfig.baseUrl + 'img/ds.svg'} />
        <h1>aragonPM</h1>
        <p>
          Decentralized package manager based on aragonOS that handles
          upgreadability of smart contracts and arbitrary data blobs, such as
          webapps.
        </p>
      </div>
    </BlocksCards>
    <BlocksCards href={docUrl('aragonos-intro')} className="os">
      <div className="border-line" />
      <div className="blocks-container">
        <img src={siteConfig.baseUrl + 'img/ds.svg'} />
        <h1>aragonOS</h1>
        <p>
          Framework that enables flexible and upgradeable governance mechanisms
          by creating and assigning permissions to multiple entities.
        </p>
      </div>
    </BlocksCards>
    <BlocksCards href={docUrl('api-intro')} className="api">
      <div className="border-line" />
      <div className="blocks-container">
        <img src={siteConfig.baseUrl + 'img/ds.svg'} />
        <h1>aragonAPI</h1>
        <p>
          Standard set of APIs and specifications used to interact with
          aragonOS-powered contracts by handling transaction pathing,
          upgradeability, and contract state.
        </p>
      </div>
    </BlocksCards>
    <BlocksCards href={docUrl('aragonui-intro')} className="ui">
      <div className="border-line" />
      <div className="blocks-container">
        <img src={siteConfig.baseUrl + 'img/ds.svg'} />
        <h1>aragonUI</h1>
        <p>
          Aragon-native toolkit of React UI components for decentralized apps
          that implement aragonDS. Slick, fast and easily extendable.
        </p>
      </div>
    </BlocksCards>
    <BlocksCards href={docUrl('cli-intro')} className="cli">
      <div className="border-line" />
      <div className="blocks-container">
        <img src={siteConfig.baseUrl + 'img/ds.svg'} />
        <h1>aragonCLI</h1>
        <p>
          Tool for creating, testing and publishing Aragon applications. Also
          allows for creating custom Aragon organizations.
        </p>
      </div>
    </BlocksCards>
    <BlocksCards href={docUrl('layout')} className="ds">
      <div className="border-line" />
      <div className="blocks-container">
        <img src={siteConfig.baseUrl + 'img/ds.svg'} />
        <h1>aragonDS</h1>
        <p>
          The Aragon Design System defines a set of user behaviours and
          guidelines to ensure consistency across all Aragon apps.
        </p>
      </div>
    </BlocksCards>
  </BuildingBlocksContainer>
)

const UseCases = props => (
  <UseCasesContainer className="white-section">
    <UseCaseCard className="for-daos">
      <div className="for-daos-img-div ">
        <img src={imgUrl('for-daos.svg')} />
      </div>
      <div>
        <div className="use-case-mobile-div ">
          <img src={imgUrl('for-daos.svg')} />
        </div>
        <h2 className="light">For DAOs</h2>
        <p>
          You can create organizations that let entities (users, smart
          contracts) interact with each other and create rich{' '}
          <b>governance mechanisms</b> by using the{' '}
          <a href="/docs/acl-intro.html">Access Control List</a>.
        </p>
        <p>
          You can also create templates so other people will be able to create
          pre-configured organizations just by selecting your template in the
          setup process. This way, you can benefit from the existing stack for
          creating and managing decentralized organizations.
        </p>
      </div>
    </UseCaseCard>
    <br />
    <UseCaseCard className="for-daos for-dapps">
      <div>
        <div className="use-case-mobile-div ">
          <img src={imgUrl('for-dapps.svg')} />
        </div>
        <h2 className="light">For dapps</h2>
        <p>
          You can create{' '}
          <b>
            dapps that run within the{' '}
            <a href="https://app.aragon.org">Aragon client</a>
          </b>{' '}
          (Aragon apps). Aragon apps are interoperable between each other and
          can forward actions to one another so there&#39;s no need to reinvent
          the wheel.
        </p>
        <p>
          An example is a voting app that can forward the intent of a user to
          another app if the voting passes. You can just build an Aragon app
          that exposes some functionality and then any governance mechanism will
          be able to consume it without any additional changes.
        </p>
      </div>
      <div className="for-daos-img-div">
        <img src={imgUrl('for-dapps.svg')} />
      </div>
    </UseCaseCard>
    <br />
    <UseCaseCard className="for-daos">
      <div className="for-daos-img-div ">
        <img src={imgUrl('for-crypto.svg')} />
      </div>
      <div>
        <div className="use-case-mobile-div ">
          <img src={imgUrl('for-crypto.svg')} />
        </div>
        <h2 className="light">For crypto protocols</h2>
        <p>
          You can build any governance mechanism to upgrade your crypto protocol
          or its parameters. Benefit from any of the existing governance
          mechanisms that support aragonOS, or easily roll out your own.
        </p>
      </div>
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
        <a
          className="button"
          href="http://wiki.aragon.org/projects/"
          target="_blank"
        >
          More Aragon users
        </a>
      </div>
    </TrustedByContainer>
  )
}

const AlmostFullSection = props => (
  <WhiteSection>
    <DeveloperSection>
      <DeveloperBox>
        <DeveloperImageContainer className="image-left">
          <DeveloperImage src={imgUrl('you-developer.png')} />
        </DeveloperImageContainer>
        <DeveloperContainer className="divided-section-container">
          <h3>This is for you,<br/>developer.</h3>
          <p>
            Aragon is the most powerful and modular way to run DAOs. But on our
            journey creating DAOs, we discovered how to modularize individual
            components that can be used for creating any dapp or crypto
            protocol.
          </p>
        </DeveloperContainer>
      </DeveloperBox>
    </DeveloperSection>
  </WhiteSection>
)
const WhiteSection = styled.div`
  min-height: 600px;
  height: auto;
  width: 100%;
  background: white;
  margin: 0;
  padding: 50px 0;
`

const DeveloperSection = styled.div`
  background: linear-gradient(151.57deg, #ffd08d 6.11%, #ffdca9 96.84%);
  min-height: 500px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  ${large('padding: 50px 120px;')}
`

const DeveloperBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1305px;
  ${large('flex-direction: row;')};
`

const DeveloperContainer = styled.div`
  ${large('width: 60%;')}
  padding-top: 30px;
  ${breakpoint('large', `padding-bottom:0; padding-top: 0`)}
  @media (min-width: 1152px) {
    padding-left: 150px;
  }

  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${large('text-align: left; margin: inherit;')}
  p {
    font-size: 18px;
    ${large('font-size: 21px;')}
    line-height: 1.66;
    text-align: center;
    ${large('text-align: left;')}
    letter-spacing: 0.24px;
    margin: 20px 0;
    letter-spacing: 0.315px;
    color: #637381;
  }
  h3 {
    font-size: 35px;
    ${large('font-size: 48px;')}
    line-height: 1.36;
    text-align: center;
    margin: 0;
    ${large('text-align: left; margin: 0 0 5px 0!important;')}
    color: #212b36;
    font-family: 'HankenGroteskRegular', sans-serif;
    letter-spacing: -0.564706px;
  }
`
const DeveloperImage = styled.img`
  max-width: 100%;
`

const DeveloperImageContainer = styled.div`
  text-align: center;
  margin: auto;
`

class Index extends React.Component {
  render() {
    let language = this.props.language || ''

    return (
      <IndexContainer className="home-section">
        <Hero />
        <MainContainer className="mainContainer">
          <BuildingBlocks />
          <AlmostFullSection />
          <UseCases />
          <TrustedBy />
        </MainContainer>
      </IndexContainer>
    )
  }
}

const PromoSection = styled.div`
  margin: 40px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.150249);
    border-radius: 6px;
    width: 182px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'HankenGroteskMedium';
    font-weight: 600;
    font-size: 16px;
    line-height: 44px;
    color: #ffffff;
  }
  a.primary {
    background: linear-gradient(186.69deg, #32fff5 -103.98%, #01bfe3 80.13%);
  }
  a.secondary {
    background: #2f3c4b;
    height: 47px;
  }
`

const HeroContainer = styled.div`
  height: 486px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: rgb(28, 29, 35);
  h2 {
    font-family: 'HankenGroteskBold', sans-serif;
    font-size: 68px;
    line-height: 1;
    text-align: center;
    letter-spacing: -1.8px;
    color: #ffffff;
    margin-bottom: 20px;
  }
  p {
    font-family: 'HankenGroteskRegular', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    line-height: 35px;
    text-align: center;
    letter-spacing: 0.33px;
    color: #adb4cb;
  }
`

const BuildingBlocksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 10%;
  flex-wrap: wrap;
`

const BlocksCards = styled.a`
  background: #f9fafc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.0726053);
  border-radius: 12px;
  border: 0px solid transparent;
  margin: 1rem;
  height: auto;
  width: 320px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  flex-wrap: wrap;
  flex-direction: column;
  &:hover {
    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.14);
  }
  .border-line {
    height: 7px;
    width: 100%;
    background: linear-gradient(89.35deg, #ffa05c 0%, #ff7958 99.99%);
    overflow: hidden;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  &.pm .border-line {
    background: linear-gradient(89.35deg, #ffa05c 0%, #ff7958 99.99%);
  }
  &.os .border-line {
    background: linear-gradient(89.35deg, #02d9ea 0%, #02eae6 99.99%);
  }
  &.api .border-line {
    background: linear-gradient(89.35deg, #ddcf82 0%, #3dcfd1 99.99%);
  }
  &.ui .border-line {
    background: linear-gradient(89.35deg, #e7947c 0%, #ae56ae 99.99%);
  }
  &.cli .border-line {
    background: linear-gradient(89.35deg, #fed760 0%, #ffb595 99.99%);
  }
  &.ds .border-line {
    background: linear-gradient(89.35deg, #8a4fc7 0%, #c56cd6 99.99%);
  }
  .blocks-container {
    padding: 35px;
  }

  p {
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.4;
    min-height: 175px;
    letter-spacing: 0.2px !important;
    text-align: left;
    color: #7f8198 !important;
  }
  h1 {
    font-size: 38px !important;
    font-family: 'HankenGroteskLight', sans-serif;
    font-weight: 300;
    color: #212b36;
    font-style: normal;
    font-stretch: normal;
    line-height: 2;
    text-align: left;
    margin-top: 20px !important;
  }
`

const GreyText = styled.p`
  font-size: 21px;
  line-height: 35px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.315px;
  text-align: center;
  color: #637381;
  margin-bottom: 0 !important;
`

const SectionTitle = styled.h2`
  font-size: 38px !important;
  font-family: 'HankenGroteskRegular';
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.48 !important;

  text-align: center;
  padding: 0 !important ;
  color: #212b36 !important;
  letter-spacing: -0.447059px;
`

const UseCasesContainer = styled(Container)`
  flex: auto;
  display: flex;
  flex-direction: column;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0 !important;
`

const UseCaseCard = styled.div`
  padding: 30px;
  max-width: 85vw;
  background: #f9fafc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.0726053);
  border-radius: 12px;

  @media (min-width: 1026px) {
    width: 1020px;
  }
  width: auto;
  min-height: 405px !important;
  margin: auto;
  display: flex;
  &:hover {
    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.14);
  }
  &.third {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    h2,
    p {
      width: 500px;
      max-width: 100% !important;
    }
  }
  h2 {
    margin-top: 16px !important;
    margin-bottom: 30px;
    padding-top: 0 !important;
    font-size: 38px !important;
    font-family: 'HankenGroteskRegular', sans-serif;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.2 !important;
    letter-spacing: -0.447059px;
    color: #212b36;
    max-width: 500px !important;
  }
  p {
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.55;
    letter-spacing: 0.24px !important;
    color: #7f8198 !important;
    max-width: 500px !important;
  }
  &.for-daos.for-dapps .for-daos-img-div {
    text-align: right;
  }
`

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
    background-image: linear-gradient(84deg, #028084, #007e96);
    transition: all 0.25s ease-in-out;
  }
`

const MainContainer = styled.div`
  background-color: ${theme.mainBackground};
`

const IndexContainer = styled.div`
  .white-section {
    background: white;
  }
  .grey-section {
    background-color: #f9fafc;
  }
  h1,
  h2,
  p,
  span,
  a,
  button {
    font-family: 'HankenGroteskRegular', 'Overpass', sans-serif;
  }
  h2.light {
    font-family: 'HankenGroteskLight', sans-serif !important;
  }
`

module.exports = Index
