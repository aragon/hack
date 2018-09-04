const React = require('react')
const { BaseStyles, PublicUrl } = require('@aragon/ui')
const ServerStyleSheet = require('styled-components').ServerStyleSheet
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'district0x',
    image: '/img/users/district0x.svg',
    infoLink: 'https://district0x.io',
    pinned: true,
  },
  {
    caption: 'Decentraland',
    image: '/img/users/decentraland.png',
    infoLink: 'https://decentraland.org',
    pinned: true,
  },
  {
    caption: 'Althea',
    image: '/img/users/althea.jpg',
    infoLink: 'https://altheamesh.com',
    pinned: true,
  },
  {
    caption: 'DAppNode',
    image: '/img/users/dappnode.png',
    infoLink: 'https://dappnode.io',
    pinned: true,
  },
  {
    caption: 'Pando',
    image: '/img/users/pando.png',
    infoLink: 'https://github.com/ryhope/pando',
    pinned: true,
  },
  {
    caption: 'Espresso',
    image: '/img/users/espresso.png',
    infoLink: 'https://github.com/espresso-org',
    pinned: true,
  },
  {
    caption: 'Giveth',
    image: '/img/users/giveth.png',
    infoLink: 'https://giveth.io',
    pinned: true,
  },
]

const siteConfig = {
  title: 'Aragon Developer Portal',
  tagline: 'What you need to get started building with Aragon',
  url: 'https://hack.aragon.org',
  baseUrl: '/',
  cname: 'hack.aragon.org',
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  projectName: 'hack-docs',
  organizationName: 'aragon',

  headerLinks: [
    {doc: 'getting-started', label: 'Get started'},
    {doc: 'tutorial', label: 'Tutorial'},
    {doc: 'aragonos-intro', label: 'aragonOS'},
    {doc: 'aragonjs-ref', label: 'aragon.js'},
    {doc: 'aragonui-intro', label: 'Aragon UI'},
    {page: 'help', label: 'Help'}
  ],

  cleanUrl: true,

  editUrl: 'https://github.com/aragon/hack/tree/master/docs/',

  twitterUsername: 'AragonProject',

  users,

  /* path to images for header/footer */
  headerIcon: 'img/isotype.svg',
  footerIcon: 'img/isotype.svg',
  favicon: 'img/favicon.png',

  /* colors for website */
  // #00c8e4
  colors: {
    primaryColor: '#3b3b3b',
    secondaryColor: '#00b4e6',
  },

  /* custom fonts for website */
  fonts: {
    myFont: [
      "Overpass",
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Creative Commons ' +
    new Date().getFullYear() +
    ' Aragon Project',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'atom-one-dark',
  },

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',

  renderToString: element => {
    const sheet = new ServerStyleSheet()
    const html = renderToStaticMarkup(
      sheet.collectStyles(
        React.createElement(
          PublicUrl.Provider,
          { url: '/aragon-ui/' },
          React.createElement(BaseStyles, { enableLegacyFonts: true }),
          element
        )
      )
    )
    const insertStylesAt = html.lastIndexOf('</body>')
    return `
      <!DOCTYPE html>
      <script type="text/javascript">
        var _paq = _paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="https://arastats.eu/staats/";
          _paq.push(['setTrackerUrl', u+'piwik.php']);
          _paq.push(['setSiteId', '7']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
        })();
      </script>
      <noscript><img src="https://arastats.eu/staats/piwik.php?idsite=7&amp;rec=1" style="border:0" alt="" /></noscript>
      ${html.slice(0, insertStylesAt)}
      ${sheet.getStyleTags()}
      ${html.slice(insertStylesAt)}
    `.trim()
  },
}

module.exports = siteConfig
