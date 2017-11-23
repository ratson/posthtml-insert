# posthtml-insert

PostHTML plugin to insert content after HTML tag.

## Installation

```
npm install posthtml-insert --save
```

## Usage

<!-- eslint-disable strict,no-console,node/no-missing-require -->

```js
const posthtml = require('posthtml')
const insert = require('posthtml-insert')

posthtml([insert({ selector: 'body', content: '<div>test</div>' })])
  .process('<body></body>')
  .then(({ html }) => {
    console.log(html)
    // => '<body><div>test</div></body>'
  })
```
