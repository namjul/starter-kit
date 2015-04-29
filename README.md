# UDMSK

**U**sability **D**esign **M**anagement **S**tarter **K**it.

# Verzeichis Aufbau

```
.
├── /build/                     # The folder for compiled output
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /public/                    # Static files
├── /src/                       # The source code of the application
│   ├── /helper/                # Helper functions
    ├── /templates/             # HTML templates for server-side rendering, emails etc.
│   ├── /components/            # Components
│   ├── /styles/                # CSS styles (deprecated, put CSS into components' folders)
│   └── /app.js                 # Client-side startup script
│── package.json                # Build commands & list of 3rd party libraries and utilities
└── webpack.config.js           # Webpack configuration for bundling and optimization
```

# Features

* ES6
* CommonJS, AMD, ES6 Module
* JS/CSS Minification
* TODOs
* Server (Clickdummy, Backend, FileServer)
* Less, CSS4 
* editorconfigs
* jsLint (jshint)
* Changelog
* Documentation
* gitconfigs
* Tests
* Distribution
* Semver
* Watch
* hotreload
* Bower & NPM Modules
* Windows & Linux & OSX
* Hashing
* Copying
* Pagespeed
* Procfile
* Image optimization

## Anwendung

Fork oder klone dieses Repo, und dann folgendes ausführen:

```
git clone -o udm-starter-kit git@10.0.0.102:udm/udm-starter-kit.git MyApp
cd MyApp
npm install
npm start
```

## Building

```
npm run build 
```

## Watching

```
npm run watch
```

## Dev server

```
npm start
```

## Testing

The tests use Karma, Mocha and Chai through PhantomJS. See the example test in
app/components/pages/__tests__/index.js. The test suite can be run like so:

```
npm test
```

To run the tests in watch mode (tests will re-run each time a file changes), use this instead:

```
npm run test:watch
```


## Deployment

Zunächst müssen Dokku Remotes erstellt werden.

```
git remote add dokku dokku@udm-websolutions.at:MyApp
git remote add dokku-staging dokku-staging@udm-websolutions.at:MyApp
```

Anschließend kann deployed werden

```
npm run deploy:stage
npm run deploy:prod
```

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

## Todo

Auflisten aller vorhandenen TODO:'s Kommentare.

```
npm run todo -s
```

## Linting

If you'd like your JavaScript to be linted, copy the .eslintrc.example to
.eslintrc. I've included my own defaults, feel free to modify them to your own
taste. For more information on configuring ESLint, consult its documentation.
Linting is run before each webpack build when a .eslintrc file is present.

Install eslint and babel-eslint NPM packages globally.
It’s important to stress “globally” here. Don’t forget the -g.

```
npm install -g eslint
npm install -g babel-eslint
```

Make sure eslint is in your PATH now:

```
eslint -v
```


## .editorconfig

An example .editorconfig file is provided with sensible defaults for
JavaScript. Feel free to modify .editorconfig.example to match your own
preferences, then renamed the file to .editorconfig and use an IDE or editor
that supports EditorConfig.

## Update
You can always fetch and merge the recent changes from this repo back into your own project:

```
git checkout master
git fetch udm-starter-kit
git merge udm-starter-kit/master
npm install
```

## Sources

- [https://github.com/gowravshekar/bootstrap-webpack]
- [https://github.com/kriasoft/react-starter-kit]