const { syncPages } = require('./sync-util')

const GIT_REF = 'docs/update-api'
const REPO = 'aragon.js'
const BASE_CONTENT_URL = `https://raw.githubusercontent.com/0xGabi/${REPO}/${GIT_REF}/docs`

const pages = [
  {
    fileLocation: '/docs/js-ref-app.md',
    id: 'aragonjs-ref-app',
    title: 'aragonJS - App API',
    sidebarLabel: 'App API',
    hideTitle: true,
    contentURL: `${BASE_CONTENT_URL}/APP.md`,
  },
  {
    fileLocation: '/docs/js-ref-providers.md',
    id: 'aragonjs-ref-providers',
    title: 'aragonJS - Providers',
    sidebarLabel: 'Providers',
    hideTitle: true,
    contentURL: `${BASE_CONTENT_URL}/PROVIDERS.md`,
  },
  {
    fileLocation: '/docs/js-ref-wrapper.md',
    id: 'aragonjs-ref-wrapper',
    title: 'aragonJS - Wrapper API',
    sidebarLabel: 'Wrapper API',
    hideTitle: true,
    contentURL: `${BASE_CONTENT_URL}/WRAPPER.md`,
  },
  {
    fileLocation: '/docs/js-guide-bg-scripts.md',
    id: 'aragonjs-guide-bg-scripts',
    title: 'aragonJS - Background Scripts',
    sidebarLabel: 'Background Scripts',
    hideTitle: true,
    contentURL: `${BASE_CONTENT_URL}/BACKGROUND_SCRIPTS.md`,
  },
  {
    fileLocation: '/docs/js-ref-hooks.md',
    id: 'aragonjs-ref-hooks',
    title: 'aragonJS - React Hooks',
    sidebarLabel: 'React Hooks',
    hideTitle: true,
    contentURL: `${BASE_CONTENT_URL}/HOOKS.md`,
  },
]

const locationReferenceMap = {
  '/docs/APP.md': '/docs/aragonjs-ref-app.html',
  '/docs/WRAPPER.md': '/docs/aragonjs-ref-wrapper.html',
  '/docs/PROVIDERS.md': '/docs/aragonjs-ref-providers.html',
  '/docs/BACKGROUND_SCRIPTS.md': '/docs/aragonjs-guide-bg-scripts.html',
  '/docs/HOOKS.md': '/docs/aragonjs-ref-hooks.html',
}

syncPages(pages, locationReferenceMap)
