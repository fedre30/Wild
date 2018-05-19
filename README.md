# Wild - Keyboard Hero

> A Vue.js keyboard game. Looks like a guitar hero

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Components

```bash
**Game** : game interface which regroups all sub-components
  * Column : falling note zone (one note for each column)
     ** Note: note to be played by user (inside Column component)
  * Score : points incremented when user play notes syncronously
```
