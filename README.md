# UDMSK

**U**sability **D**esign **M**anagement **S**tarter **K**it.

# Verzeichis Aufbau

```
.
├── /build/                     # The folder for compiled output
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /assets/                # Static files which are copied to ./build on compile
│   ├── /components/            # React components
│   ├── /content/               # Website content (plain HTML or Markdown, Jade, you name it)
│   ├── /styles/                # CSS styles (deprecated, put CSS into components' folders)
│   ├── /templates/             # HTML templates for server-side rendering, emails etc.
│   ├── /app.js                 # Client-side startup script
│   └── /server.js              # Server-side startup script
│── package.json                # The list of 3rd party libraries and utilities
└── webpack.config.js           # Webpack configuration for bundling and optimization
```

# Features

* JavaScript
 * CommonJS, AMD
 * ES6
 * Bundler
* JS/CSS Minification
* TODOs
* Server (Clickdummy, Backend, FileServer)
* Less, Stylus, SASS, PostCSS
  * Autoprefixer
  * Bundler
  * CSS Base (reset)
* editorconfigs
* jsLint (jshint)
* Changelog
* gitconfigs
* Tests
* Distribution
* Semver
* Watch
* Livereload
* Bower & NPM Modules
* Windows & Linux & OSX
* Hashing
* Copying
* Pagespeed
* Procfile
* Image optimization

## Anwendung

Fork dieses Repo, und dann folgendes ausführen:

```
npm install
npm start
```

## Building

## Watching

## Testing

## Deployment

## Versionierung

Versionierung nach Semver - [http://semver.org/]

Patch:

```
npm version patch
```

Minor: 

```
npm version minor 
```

Major:

```
npm version major
```

## Sources

- [https://github.com/gowravshekar/bootstrap-webpack]
- [https://github.com/kriasoft/react-starter-kit]
