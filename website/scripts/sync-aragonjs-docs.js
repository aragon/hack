const { syncPages } = require('./sync-util')

const GIT_REF = 'master'
const REPO = 'aragon/aragon.js'

const pages = [
  {
    destination: '/docs/aragon-api/js-ref-quick-start.md',
    id: 'api-js-quick-start',
    title: 'Quick Start',
    sidebarLabel: 'Quick Start',
    hideTitle: true,
    contentLocation: 'docs/QUICK_START.md',
  },
  {
    destination: '/docs/aragon-api/js-ref-api.md',
    id: 'api-js-ref-api',
    title: 'aragonAPI for Javascript',
    sidebarLabel: 'App API',
    hideTitle: true,
    contentLocation: 'docs/API.md',
  },
  {
    destination: '/docs/aragon-api/js-ref-providers.md',
    id: 'api-js-ref-providers',
    title: 'aragonAPI for providers',
    sidebarLabel: 'Providers',
    hideTitle: true,
    contentLocation: 'docs/PROVIDERS.md',
  },
  {
    destination: '/docs/aragon-api/js-ref-wrapper.md',
    id: 'api-js-ref-wrapper',
    title: 'aragonAPI for wrapper',
    sidebarLabel: 'Wrapper',
    hideTitle: true,
    contentLocation: 'docs/WRAPPER.md',
  },
  {
    destination: '/docs/aragon-api/js-ref-architecture.md',
    id: 'api-js-ref-architecture',
    title: 'aragonAPI for architecture',
    sidebarLabel: 'Architecture of apps',
    hideTitle: true,
    contentLocation: 'docs/ARCHITECTURE.md',
  },
  {
    destination: '/docs/aragon-api/js-guide-bg-scripts.md',
    id: 'api-js-guide-bg-scripts',
    title: 'Background Scripts',
    sidebarLabel: 'Background Scripts',
    hideTitle: true,
    contentLocation: 'docs/BACKGROUND_SCRIPTS.md',
  },
  {
    destination: '/docs/aragon-api/js-ref-react.md',
    id: 'api-js-ref-react',
    title: 'aragonAPI for React',
    sidebarLabel: 'React API',
    hideTitle: true,
    contentLocation: 'packages/aragon-api-react/README.md',
  },
]

const locationReferenceMap = {
  'https://github.com/aragon/aragon.js/blob/master/docs/API.md':
    '/docs/aragon-api/api-js-ref-api.html',
  'https://github.com/aragon/aragon.js/blob/master/docs/BACKGROUND_SCRIPTS.md':
    '/docs/aragon-api/api-js-guide-bg-scripts.html',
  'https://github.com/aragon/aragon.js/blob/master/docs/API.md#aragonapp':
    '/docs/aragon-api/api-js-ref-api.html#aragonapp',
  'https://github.com/aragon/aragon.js/blob/master/docs/API.md#network':
    '/docs/aragon-api/api-js-ref-api.html#network',
  '/docs/API.md': '/docs/aragon-api/api-js-ref-api.html',
  '/docs/WRAPPER.md': '/docs/aragon-api/api-js-ref-wrapper.html',
  '/docs/PROVIDERS.md': '/docs/aragon-api/api-js-ref-providers.html',
  '/docs/ARCHITECTURE.md': '/docs/aragon-api/api-js-ref-architecture.html',
  '/docs/BACKGROUND_SCRIPTS.md':
    '/docs/aragon-api/api-js-guide-bg-scripts.html',
  '/packages/aragon-api-react/README.md':
    '/docs/aragon-api/api-js-ref-react.html',
}

syncPages(pages, locationReferenceMap, GIT_REF, REPO)
