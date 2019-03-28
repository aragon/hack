const { syncPages } = require('./sync-util')

const GIT_REF = 'master'
const REPO = 'aragon.js'
const BASE_CONTENT_URL = `https://raw.githubusercontent.com/aragon/${REPO}/${GIT_REF}/docs`

const pages = [
  {
    fileLocation: '/docs/js-intro.md',
    id: 'aragonjs-intro',
    title: 'aragonAPI - Introduction',
    sidebarLabel: 'Introduction',
    hideTitle: true,
    contentURL: `${BASE_CONTENT_URL}/README.md`
  },
  {
    fileLocation: '/docs/js-ref-app.md',
    id: 'aragonjs-ref-app',
    title: 'aragonAPI - App',
    sidebarLabel: 'App',
    hideTitle: true,
    contentURL: `${BASE_CONTENT_URL}/APP.md`
  },
  {
    fileLocation: '/docs/js-ref-providers.md',
    id: 'aragonjs-ref-providers',
    title: 'aragonAPI - Providers',
    sidebarLabel: 'Providers',
    hideTitle: true,
    contentURL: `${BASE_CONTENT_URL}/PROVIDERS.md`
  },
  {
    fileLocation: '/docs/js-ref-wrapper.md',
    id: 'aragonjs-ref-wrapper',
    title: 'aragonAPI - Wrapper',
    sidebarLabel: 'Wrapper',
    hideTitle: true,
    contentURL: `${BASE_CONTENT_URL}/WRAPPER.md`
  },
  {
    fileLocation: '/docs/js-guide-bg-scripts.md',
    id: 'aragonjs-guide-bg-scripts',
    title: 'aragonAPI - Background Scripts',
    sidebarLabel: 'Background Scripts',
    hideTitle: true,
    contentURL: `${BASE_CONTENT_URL}/BACKGROUND_SCRIPTS.md`
  }
]

const locationReferenceMap = {
  '/docs/README.md': '/docs/aragonjs-intro.html',
  '/docs/APP.md': '/docs/aragonjs-ref-app.html',
  '/docs/WRAPPER.md': '/docs/aragonjs-ref-wrapper.html',
  '/docs/PROVIDERS.md': '/docs/aragonjs-ref-providers.html',
  '/docs/BACKGROUND_SCRIPTS.md': '/docs/aragonjs-guide-bg-scripts.html'
}

syncPages(pages, locationReferenceMap)
