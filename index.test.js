'use strict'

const posthtml = require('posthtml')

const insert = require('.')

const HTML = '<body></body>'

test('can insert content', async () => {
  const { html } = await posthtml([
    insert({ selector: 'body', content: '<div>test</div>' }),
  ]).process(HTML)

  expect(html).toBe('<body><div>test</div></body>')
})

test('throw for missing selector', () => {
  expect(() => insert({ content: '<div>test</div>' })).toThrowError(/selector/)
})

test('throw for empty content', () => {
  expect(() => insert({ selector: 'body', content: '' })).toThrowError(
    /content/
  )
})
