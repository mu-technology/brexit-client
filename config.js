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
    '@angular2-material/core': {
      format: 'cjs',
      defaultExtension: 'js',
      main: 'core.js'
    },
    '@angular2-material/toolbar': {
      format: 'cjs',
      defaultExtension: 'js',
      main: 'toolbar.js'
    },
    '@angular2-material/card': {
      format: 'cjs',
      defaultExtension: 'js',
      main: 'card.js'
    },
    '@angular2-material/button': {
      format: 'cjs',
      defaultExtension: 'js',
      main: 'button.js'
    },
  },

  map: {
    "angular2": "node_modules/angular2",
    "@angular2-material": "node_modules/@angular2-material",
    "angulartics2": "npm:angulartics2@1.0.1",
    "redux": "node_modules/redux/dist/redux.js",
    "redux-logger": "node_modules/redux-logger/dist/index.js",
    "rxjs": "node_modules/rxjs",
    "ts": "github:frankwallis/plugin-typescript@4.0.2",
    "typescript": "npm:typescript@1.8.9",
    "github:frankwallis/plugin-typescript@4.0.2": {
      "typescript": "npm:typescript@1.8.9"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:@angular2-material/card@2.0.0-alpha.2": {
      "@angular2-material/core": "npm:@angular2-material/core@2.0.0-alpha.2",
      "angular2": "npm:angular2@2.0.0-beta.15"
    },
    "npm:@angular2-material/core@2.0.0-alpha.2": {
      "angular2": "npm:angular2@2.0.0-beta.15"
    },
    "npm:@angular2-material/toolbar@2.0.0-alpha.2": {
      "angular2": "npm:angular2@2.0.0-beta.15"
    },
    "npm:angular2@2.0.0-beta.15": {
      "reflect-metadata": "npm:reflect-metadata@0.1.2",
      "rxjs": "npm:rxjs@5.0.0-beta.6",
      "zone.js": "npm:zone.js@0.6.11"
    },
    "npm:angulartics2@1.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:reflect-metadata@0.1.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rxjs@5.0.0-beta.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:typescript@1.8.9": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:zone.js@0.6.11": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
