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
];

const siteConfig = {
  title: 'Aragon Developer Portal',
  tagline: 'What you need to get started building with Aragon',
  url: 'https://hack2.aragon.one',
  baseUrl: '/',
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  projectName: 'hack-docs',
  organizationName: 'aragon',

  headerLinks: [
    {doc: 'getting-started', label: 'Get started'},
    {doc: 'tutorial', label: 'Tutorial'},
    {doc: 'aragonos-ref', label: 'aragonOS'},
    {doc: 'aragonjs-ref', label: 'aragon.js'},
    {doc: 'aragonui-intro', label: 'Aragon UI'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],

  // If you have users set above, you add it here:
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
    theme: 'default',
  },

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
