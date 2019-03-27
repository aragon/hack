const { syncPages } = require('./sync-util')

const GIT_REF = 'master'
const REPO = 'aragon-cli'
const BASE_CONTENT_URL = `https://raw.githubusercontent.com/aragon/${REPO}/${GIT_REF}/docs`

const pages = [
  {
    fileLocation: '/docs/cli-intro.md',
    id: 'cli-intro',
    title: 'Using the aragonCLI',
    sidebarLabel: 'Introduction',
    hideTitle: true,
    contentURL: `${BASE_CONTENT_URL}/Intro.md`
  },
  {
    fileLocation: '/docs/cli-main-commands.md',
    id: 'cli-main-commands',
    title: 'Main commands',
    sidebarLabel: 'Main commands',
    contentURL: `${BASE_CONTENT_URL}/Main-commands.md`
  },
  {
    fileLocation: '/docs/cli-apm-commands.md',
    id: 'cli-apm-commands',
    title: 'aragonPM commands',
    sidebarLabel: 'aragonPM commands',
    contentURL: `${BASE_CONTENT_URL}/Apm-commands.md`
  },
  {
    fileLocation: '/docs/cli-dao-commands.md',
    id: 'cli-dao-commands',
    title: 'DAO commands',
    sidebarLabel: 'DAO commands',
    contentURL: `${BASE_CONTENT_URL}/Dao-commands.md`
  },
  {
    fileLocation: '/docs/cli-global-confg.md',
    id: 'cli-global-confg',
    title: 'Global configuration',
    sidebarLabel: 'Global configuration',
    contentURL: `${BASE_CONTENT_URL}/Global-confg.md`
  }
]

const locationReferenceMap = {}

syncPages(pages, locationReferenceMap)
