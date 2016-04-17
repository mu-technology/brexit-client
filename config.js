System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  typescriptOptions: {
    "tsconfig": true
  },
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "app/": "src/",
    "github:*": "jspm_packages/github/*"
  },

  packages: {
    "app": {
      "main": "main",
      "defaultExtension": "ts",
      "format": "system",
      "meta": {
        "*.ts": {
          "loader": "ts"
        }
      }
    },
    "@angular2-material/core": {
      "format": "cjs",
      "defaultExtension": "js",
      "main": "core.js"
    },
    "@angular2-material/toolbar": {
      "format": "cjs",
      "defaultExtension": "js",
      "main": "toolbar.js"
    },
    "@angular2-material/card": {
      "format": "cjs",
      "defaultExtension": "js",
      "main": "card.js"
    },
    "@angular2-material/button": {
      "format": "cjs",
      "defaultExtension": "js",
      "main": "button.js"
    },
    "angulartics2": {
      "defaultExtension": "js",
      "main": "index.js"
    }
  },

  map: {
    "@angular2-material": "node_modules/@angular2-material",
    "angular2": "node_modules/angular2",
    "angulartics2": "node_modules/angulartics2",
    "redux": "node_modules/redux/dist/redux.js",
    "redux-logger": "node_modules/redux-logger/dist/index.js",
    "rxjs": "node_modules/rxjs",
    "ts": "github:frankwallis/plugin-typescript@4.0.2",
    "typescript": "npm:typescript@1.8.9",
    "github:frankwallis/plugin-typescript@4.0.2": {
      "typescript": "npm:typescript@1.8.9"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:typescript@1.8.9": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    }
  }
});
