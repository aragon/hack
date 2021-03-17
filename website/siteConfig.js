const React = require('react')
const { BaseStyles, PublicUrl } = require('@aragon/ui')
const ServerStyleSheet = require('styled-components').ServerStyleSheet
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup
const hljsDefineSolidity = require('highlightjs-solidity')

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
  editUrl: 'https://github.com/aragon/hack/edit/master/docs/',
  cname: 'hack.aragon.org',
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  projectName: 'hack',
  organizationName: 'aragon',

  headerLinks: [],

  cleanUrl: true,

  

  twitterUsername: 'AragonProject',

  users,

  /* path to images for header/footer */
  headerIcon: 'img/navbar-logo.svg',
  footerIcon: 'img/footer.svg',
  favicon: 'img/favicon.png',
  menumore: 'img/menumore.svg',
  menubar: 'img/menubar.svg',
  prevArrow: 'img/prev-arrow.svg',
  nextArrow: 'img/next-arrow.svg',

  /* colors for website */
  // #00c8e4
  colors: {
    primaryColor: '#3b3b3b',
    secondaryColor: '#00b4e6',
  },

  /* custom fonts for website */
  fonts: {
    myFont: ['HkGrotesk', 'Overpass'],
    myOtherFont: ['-apple-system', 'system-ui'],
  },
  algolia: {
    apiKey: '9dff0383c32107d6c174f15e259bb23a',
    indexName: 'aragon',
    algoliaOptions: {}, // Optional, if provided by Algolia
  },

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: 'Creative Commons ' + new Date().getFullYear() + ' Aragon Project',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'atom-one-dark',
    hljs: function(hljs) {
      hljsDefineSolidity(hljs)
    },
  },

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  docsSideNavCollapsible: true,

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
      <!-- Countly -->
      <script type="text/javascript">
        var Countly = Countly || {};
        Countly.q = Countly.q || [];
        //provide countly initialization parameters
        Countly.app_key = 'f2e5a11f624ff93a5799b3e00d05d8ca8a7e3ec2';
        Countly.url = 'https://analytics.aragon.org/';
        Countly.inactivity_time = 10;
        Countly.q.push(['track_sessions']);
        Countly.q.push(['track_pageview']);
        Countly.q.push(['track_clicks']);
        Countly.q.push(['track_errors']);
        (function() {
          var cly = document.createElement('script'); cly.type = 'text/javascript';
          cly.async = true;
          cly.src = 'https://analytics.aragon.org/sdk/web/countly.min.js';
          cly.onload = function(){Countly.init()};
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cly, s);
        })();
      </script>
      <!-- End Countly code -->
      ${html.slice(0, insertStylesAt)}
      ${sheet.getStyleTags()}
      <script>
        window.intercomSettings = {
          app_id: "v5igxkky"
        };
      </script>

      <script>
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/v5igxkky';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      </script>
      ${html.slice(insertStylesAt)}
    `.trim()
  },
}

module.exports = siteConfig
