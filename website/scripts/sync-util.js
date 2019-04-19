const fetch = require('node-fetch')
const fs = require('fs')

async function syncPages(pages, locationReferenceMap, gitRef, repo) {
  Promise.all(
    pages.map(page => syncPage(page, locationReferenceMap, gitRef, repo))
  )
}

async function syncPage(page, locationReferenceMap, gitRef, repo) {
  const {
    id,
    title,
    hideTitle,
    sidebarLabel,
    contentLocation,
    destination,
  } = page

  const contentURL = `https://raw.githubusercontent.com/${repo}/${gitRef}/${contentLocation}`
  const editURL = `https://github.com/${repo}/blob/${gitRef}/${contentLocation}`

  const response = await fetch(contentURL)
  let remoteText = await response.text()
  // Fix the links
  if (
    locationReferenceMap &&
    Object.keys(locationReferenceMap).length !== 0 &&
    locationReferenceMap.constructor === Object
  ) {
    remoteText = replaceAll(remoteText, locationReferenceMap)
  }

  const header = `---
id: ${id}
title: ${title}
custom_edit_url: ${editURL}
sidebar_label: ${sidebarLabel}
hide_title: ${hideTitle || false}
---
<!-- Please consider editing this file here: ${editURL} - thank you! -->
`
  const result = header.concat('\n').concat(remoteText)
  // this script will be run from the website directory => we need to go up one level
  fs.writeFileSync(`../${destination}`, result)
}

function replaceAll(string, mapObject) {
  const regex = new RegExp(Object.keys(mapObject).join('|'), 'gi')
  return string.replace(regex, matched => mapObject[matched])
}

module.exports = {
  syncPages,
}
