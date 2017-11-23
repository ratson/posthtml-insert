'use strict'

const matcher = require('posthtml-match-helper')
const parser = require('posthtml-parser')

module.exports = ({ selector, content }) => {
  if (!selector) {
    throw new Error('selector is required')
  }
  if (!content) {
    throw new Error('content is required and can not be empty')
  }
  const insertContent = parser(content)
  return tree => {
    tree.match(matcher(selector), node =>
      Object.assign({}, node, {
        content: (node.content || []).concat(insertContent),
      })
    )
    return tree
  }
}
