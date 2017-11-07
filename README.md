# kenote-react-base

React Base for kenote

[![Build Status][travis-image]][travis-url]
[![Codecov Status][codecov-image]][codecov-url]

[travis-image]: https://travis-ci.org/thondery/kenote-react-base.svg?branch=master
[travis-url]: https://travis-ci.org/thondery/kenote-react-base
[codecov-image]: https://img.shields.io/codecov/c/github/thondery/kenote-react-base/master.svg
[codecov-url]:   https://codecov.io/github/thondery/kenote-react-base?branch=master

## Requirements

- node ^6.0.0
- npm ^3.0.0

## Installation

```bash
$ git clone https://github.com/thondery/kenode-react-base.git <my-project-name>
$ cd <my-project-name>

$ yarn  # Install project dependencies (or `npm install`)
```

## Running the Project

```bash
$ yarn start  # Start the development server (or `npm start`)
```

| yarn \<script\> | Description |
|-----|-----|
| start | Serves your app at localhost:3000 |
| build | Builds the application to ./dist |

## Project Structure

```bash
├── dist
├── dll
│   └── manifest.json
├── src                                 # Application source code
│   ├── containers
│   │   └── root.js
│   ├── index.js                        # Application bootstrap and rendering
│   └── index.html                      # Main HTML page container for app
├── .babelrc
├── project.config.js
├── webpack.config.js
├── webpack.dev.config.js
├── webpack.dll.config.js
└── webpack.prod.config.js
```