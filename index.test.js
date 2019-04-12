'use strict'

const posthtml = require('posthtml')

const insert = require('.')

const HTML = '<body><div id="app"></div><div /></body>'

test('can insert content', async () => {
  const { html } = await posthtml([
    insert({ selector: 'body', content: '<div>test</div>' }),
  ]).process(HTML)

  expect(html).toBe(
    '<body><div id="app"></div><div></div><div>test</div></body>',
  )
})

test('throw for missing selector', () => {
  expect(() => insert({ content: '<div>test</div>' })).toThrow(/selector/)
})

test('throw for empty content', () => {
  expect(() => insert({ selector: 'body', content: '' })).toThrow(
    /content/,
  )
})
