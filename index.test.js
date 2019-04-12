'use strict'

const posthtml = require('posthtml')

const insert = require('.')

const HTML = '<body><div id="app"></div><span /></body>'

test('can insert content', async () => {
  const { html } = await posthtml([
    insert({ selector: 'body', content: '<div>test</div>' }),
  ]).process(HTML)

  expect(html).toBe(
    '<body><div id="app"></div><span></span><div>test</div></body>',
  )
})

test('throw for missing selector', () => {
  expect(() => insert({ content: '<div>test</div>' })).toThrow(/selector/)
})

test('throw for empty content', () => {
  expect(() => insert({ selector: 'body', content: '' })).toThrow(/content/)
})

test('can insert content begin', async () => {
  const { html } = await posthtml([
    insert({ selector: 'body', content: '<div>test</div>', where: 'begin' }),
  ]).process(HTML)

  expect(html).toBe(
    '<body><div>test</div><div id="app"></div><span></span></body>',
  )
})

test('can insert content before', async () => {
  const { html } = await posthtml([
    insert({ selector: '#app', content: '<div>test</div>', where: 'before' }),
  ]).process(HTML)

  expect(html).toBe(
    '<body><div>test</div><div id="app"></div><span></span></body>',
  )
})

test('can insert content after', async () => {
  const { html } = await posthtml([
    insert({ selector: '#app', content: '<div>test</div>', where: 'after' }),
  ]).process(HTML)

  expect(html).toBe(
    '<body><div id="app"></div><div>test</div><span></span></body>',
  )
})
