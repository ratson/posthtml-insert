'use strict'

const matcher = require('posthtml-match-helper')
const parser = require('posthtml-parser')

module.exports = ({ selector, content, where = 'end' }) => {
  if (!selector) {
    throw new Error('selector is required')
  }
  if (!content) {
    throw new Error('content is required and can not be empty')
  }
  const insertContent = parser(content)
  return tree => {
    let parentContent = null
    let matchedNode = null

    tree.match(matcher(selector), node => {
      matchedNode = node

      switch (where) {
        case 'before':
        case 'after': {
          tree.walk(n => {
            if (n && n.content && n.content.find(x => x === node)) {
              parentContent = n.content
            }
            return n
          })
          return node
        }
        case 'begin':
          return Object.assign({}, node, {
            content: insertContent.concat(node.content || []),
          })
        case 'end':
          return Object.assign({}, node, {
            content: (node.content || []).concat(insertContent),
          })
        default:
          throw new Error('where should be begin/end/before/after')
      }
    })

    if (parentContent) {
      const matchIndex = parentContent.findIndex(x => x === matchedNode)
      parentContent.splice(
        where === 'after' ? matchIndex + 1 : matchIndex,
        0,
        ...insertContent,
      )
    }

    return tree
  }
}
