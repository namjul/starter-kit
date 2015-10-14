# Starter Kit

Intended as a startingplace for a variety of projects.

# Directory Layout

```
.
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /lib/                   # Libraries and utilities
    ├── /templates/             # HTML templates for server-side rendering.
    ├── /mock/                  # Mock api.
│   ├── /components/            # Components
│   ├── /server.js              # Mock server
│   └── /app.js                 # Client-side startup script
│── package.json                # Build commands & list of 3rd party libraries and utilities
│── webpack.config.js           # Webpack configuration for bundling and optimization
│── CHANGELOG.md                # Project history
└── README.md                   # Project overview
```

## Building

```
npm run build 
npm run build:dist
```

## Watching

```
npm run build:watch
```

## Dev server

```
npm run serve
```

## Mock server

```
npm start
```

## Versioning

Patch:

```
npm version patch -m "Upgrade to %s for reasons"
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

List all //TODO:'s comments

```
npm run todo -s
```
