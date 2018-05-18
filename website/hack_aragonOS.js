const fs = require('fs')

const aragonOSKey = 'aragonOS'
const docsKey = 'docs'
const docsApiKey = 'docs-api'

const sidebarsObj = require('./sidebars.json')

// remove aragonOS from docs
let { [aragonOSKey]: aragonOS, ...new_docs } = sidebarsObj[docsKey]
if (aragonOS === undefined) {
  aragonOS = ["aragonos-ref"]
}

// and add it to docs-api if it was not there (trying to make the operation idempotent)
let new_docs_api
if (!(aragonOSKey in sidebarsObj[docsApiKey])) {
  new_docs_api = Object.assign({[aragonOSKey] : aragonOS}, sidebarsObj[docsApiKey])
} else {
  new_docs_api = sidebarsObj[docsApiKey]
}
const newSidebarsObj = { [docsKey] : new_docs, [docsApiKey]: new_docs_api }

fs.writeFileSync('sidebars.json', JSON.stringify(newSidebarsObj, null, 2))
