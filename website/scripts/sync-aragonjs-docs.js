const fetch = require('node-fetch')
const fs = require('fs')

const GIT_REF = 'feat/generate-docs-from-sources' //TODO change to master

const PAGES = [
  {
    fileLocation: '/docs/js-intro.md',
    id: 'aragonjs-intro',
    title: 'aragonAPI - Introduction',
    hideTitle: true,
    sidebarLabel: 'Introduction',
    contentURL: `https://raw.githubusercontent.com/aragon/aragon.js/${GIT_REF}/docs/README.md`
  },
  {
    fileLocation: '/docs/js-ref-app.md',
    id: 'aragonjs-ref-app',
    title: 'aragonAPI - App API Reference',
    hideTitle: true,
    sidebarLabel: 'App API Reference',
    contentURL: `https://raw.githubusercontent.com/aragon/aragon.js/${GIT_REF}/docs/APP.md`
  },
  {
    fileLocation: '/docs/js-ref-providers.md',
    id: 'aragonjs-ref-providers',
    title: 'aragonAPI - Providers API Reference',
    hideTitle: true,
    sidebarLabel: 'Providers API Reference',
    contentURL: `https://raw.githubusercontent.com/aragon/aragon.js/${GIT_REF}/docs/PROVIDERS.md`
  },
  {
    fileLocation: '/docs/js-ref-wrapper.md',
    id: 'aragonjs-ref-wrapper',
    title: 'aragonAPI - Wrapper API Reference',
    hideTitle: true,
    sidebarLabel: 'Wrapper API Reference',
    contentURL: `https://raw.githubusercontent.com/aragon/aragon.js/${GIT_REF}/docs/WRAPPER.md`
  },
  {
    fileLocation: '/docs/js-guide-bg-scripts.md',
    id: 'aragonjs-guide-bg-scripts',
    title: 'aragonAPI - Background Scripts guide',
    hideTitle: true,
    sidebarLabel: 'Background Scripts guide',
    contentURL: `https://raw.githubusercontent.com/aragon/aragon.js/${GIT_REF}/docs/BACKGROUND_SCRIPTS.md`
  }
]

const locationReferenceMap = {
  '/docs/README.md': '/docs/aragonjs-intro.html',
  '/docs/APP.md': '/docs/aragonjs-ref-app.html',
  '/docs/WRAPPER.md': '/docs/aragonjs-ref-wrapper.html',
  '/docs/PROVIDERS.md': '/docs/aragonjs-ref-providers.html',
  '/docs/BACKGROUND_SCRIPTS.md': '/docs/aragonjs-guide-bg-scripts.html'
}

async function sync ({ id, title, hideTitle, sidebarLabel, contentURL, fileLocation }) {
  const response = await fetch(contentURL)
  let remoteText = await response.text()
  // Fix the links
  remoteText = replaceAll(remoteText, locationReferenceMap)

  const header = `---
id: ${id}
title: ${title} 
sidebar_label: ${sidebarLabel}
hide_title: ${hideTitle || false} 
---
<!-- This file is generated by /website/scripts/sync-aragonjs-docs.js - changes will be overwritten! -->
`
  const result = header.concat('\n').concat(remoteText)
  // this script will be run from the website directory => we need to go up one level
  fs.writeFileSync(`../${fileLocation}`, result)
}

function replaceAll (string, mapObject) {
  const regex = new RegExp(Object.keys(mapObject).join('|'), 'gi')
  return string.replace(regex, matched => mapObject[matched])
}

PAGES.map(sync)
