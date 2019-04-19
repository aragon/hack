const { syncPages } = require('./sync-util')

const GIT_REF = 'master'
const REPO = 'aragon/aragon.js'

const pages = [
  {
    destination: '/docs/js-ref-app.md',
    id: 'aragonjs-ref-app',
    title: 'aragonAPI for Javascript',
    sidebarLabel: 'App API',
    hideTitle: true,
    contentLocation: 'docs/APP.md',
  },
  {
    destination: '/docs/js-ref-providers.md',
    id: 'aragonjs-ref-providers',
    title: 'aragonAPI for providers',
    sidebarLabel: 'Providers',
    hideTitle: true,
    contentLocation: 'docs/PROVIDERS.md',
  },
  {
    destination: '/docs/js-ref-wrapper.md',
    id: 'aragonjs-ref-wrapper',
    title: 'aragonAPI for wrapper',
    sidebarLabel: 'Wrapper',
    hideTitle: true,
    contentLocation: 'docs/WRAPPER.md',
  },
  {
    destination: '/docs/js-ref-architecture.md',
    id: 'aragonjs-ref-architecture',
    title: 'aragonAPI for architecture',
    sidebarLabel: 'Architecture of apps',
    hideTitle: true,
    contentLocation: 'docs/ARCHITECTURE.md',
  },
  {
    destination: '/docs/js-guide-bg-scripts.md',
    id: 'aragonjs-guide-bg-scripts',
    title: 'Background Scripts',
    sidebarLabel: 'Background Scripts',
    hideTitle: true,
    contentLocation: 'docs/BACKGROUND_SCRIPTS.md',
  },
  {
    destination: '/docs/js-ref-react.md',
    id: 'aragonjs-ref-react',
    title: 'aragonAPI for React',
    sidebarLabel: 'React API',
    hideTitle: true,
    contentLocation: 'packages/aragon-api-react/README.md',
  },
]

const locationReferenceMap = {
  '/docs/APP.md': '/docs/aragonjs-ref-app.html',
  '/docs/WRAPPER.md': '/docs/aragonjs-ref-wrapper.html',
  '/docs/PROVIDERS.md': '/docs/aragonjs-ref-providers.html',
  '/docs/ARCHITECTURE.md': '/docs/aragonjs-ref-architecture.html',
  '/docs/BACKGROUND_SCRIPTS.md': '/docs/aragonjs-guide-bg-scripts.html',
  '/packages/aragon-api-react/README.md': '/docs/aragonjs-ref-react.html',
}

syncPages(pages, locationReferenceMap, GIT_REF, REPO)
