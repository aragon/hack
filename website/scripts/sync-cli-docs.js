const { syncPages } = require('./sync-util')

const GIT_REF = 'master'
const REPO = 'aragon/aragon-cli'

const pages = [
  {
    destination: '/docs/cli-intro.md',
    id: 'cli-intro',
    title: 'Using the aragonCLI',
    sidebarLabel: 'Introduction',
    hideTitle: true,
    contentLocation: 'docs/Intro.md'
  },
  {
    destination: '/docs/cli-main-commands.md',
    id: 'cli-main-commands',
    title: 'Main commands',
    sidebarLabel: 'Main commands',
    contentLocation: 'docs/Main-commands.md'
  },
  {
    destination: '/docs/cli-apm-commands.md',
    id: 'cli-apm-commands',
    title: 'aragonPM commands',
    sidebarLabel: 'APM commands',
    contentLocation: 'docs/Apm-commands.md'
  },
  {
    destination: '/docs/cli-dao-commands.md',
    id: 'cli-dao-commands',
    title: 'DAO commands',
    sidebarLabel: 'DAO commands',
    contentLocation: 'docs/Dao-commands.md'
  },
  {
    destination: '/docs/cli-ipfs-commands.md',
    id: 'cli-ipfs-commands',
    title: 'IPFS commands',
    sidebarLabel: 'IPFS commands',
    contentLocation: 'docs/Ipfs-commands.md',
  },
  {
    destination: '/docs/cli-global-confg.md',
    id: 'cli-global-confg',
    title: 'Global configuration',
    sidebarLabel: 'Global configuration',
    contentLocation: 'docs/Global-confg.md'
  }
]

const locationReferenceMap = {}

syncPages(pages, locationReferenceMap, GIT_REF, REPO)
