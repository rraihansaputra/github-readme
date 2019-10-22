# github-readme

This is an SPA built to list a GitHub user's repository and display their README.

This project is built with Vue.

Due to limitations of the GitHub API, this will only be able to serve 60 API requests per hour.
## Project setup
```
npm install
```
Installs all depedencies needed to develop the application
### Run the application with hot-reload
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
Files will be compiled on `dist`.

#### Serving for production
As this project uses the `history.pushState` for its' routing, configuration needs to be done according to the `vue-router` docs.

https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
