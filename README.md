# AngularJS 1.X Seed with ES6, component based

## Description

This project is my opiniated seed to get started with angular 1.X written in ES6 with the component pattern. 
Possibility to make a mobile application using cordova or even an accelerated webview with cocoonjs.

## Technologies used

* [Cocoonjs](https://www.ludei.com/cocoonjs/) : This is an accelerated webview for mobile (uses [Cordova](https://cordova.apache.org/))
* [AngularJS](https://angularjs.org/) : Production Ready single page javascript framework
* [Gulp](http://gulpjs.com/): Streaming build system
* [Bower](http://bower.io/) and [NPM](https://www.npmjs.com/) : Package managers
* [Yeoman](http://yeoman.io/) : Generator to ease development. We created one for this project : [angular-es6-components](https://github.com/epayet/generator-angular-es6-components)
* [Karma](http://karma-runner.github.io/0.12/index.html) : Unit test runner
* [Jasmine](http://jasmine.github.io/2.0/introduction.html) : BDD (Behavior Driven Development) oriented test framework
* [Protractor](http://angular.github.io/protractor/#/) : End to end testing for AngularJS (UI Test)
* [ES6](http://es6-features.org/#Constants) : We use the last version of Javascript. This is not supported by every browser, so we have to transpile it to ES5 in the build system. We currently use [Browserify](http://browserify.org/), but we could be using [Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started) or [Babel](https://babeljs.io/)

## Setup

You need [NodeJS and NPM](https://nodejs.org/) installed.

### Install application dependencies

Install command line utility: `npm install -g bower`. Then install application dependencies.

* `bower install`
* `npm install`

### Development

Install build system: `npm install -g gulp`.

To start working, you need to build and launch the development server. There is a file watcher to reload the browser when you save a file. Do this via the command: `gulp`.

### Mobile

Simplified scripts are in the package.json file. These work for sure on a unix system. They automatically install the needed cordova plugins and platform related commands.

You need cordova and cocoonjs installed: `npm install -g cordova cocoonjs`

#### Android

A working android environment is needed ([SDK](https://developer.android.com/sdk/index.html), environment variables, etc.). See detailed instructions on the [cordova website](https://cordova.apache.org/docs/en/4.0.0/guide_platforms_android_index.md.html).

You first need to install the platform:

* With WebView+ (Android < 5): `npm run-script redeploy-android-webviewplus`
* Without WebView+ (Android >= 5): `npm run-script redeploy-android`

Then to build the application and run on a device: `npm run-script android`

#### IOS

You need to be on mac os and have xCode installed. See detailed instructions on the [cordova website](http://cordova.apache.org/docs/en/2.5.0/guide_getting-started_ios_index.md.html).

You first need to install the platform: `npm run-script redeploy-ios`.

Then you can build for ios: `npm run-script ios`. To run on a device, you need XCode.

### Use the generator

You need yeoman and the last version of the generator installed: `npm install -g yo generator-angular-es6-components`

Create a component: `yo angular-es6-components:component newComponent`. This will generate a new component in the selected module. Don't forget to add it to the parent module.

### Unit Tests

`gulp test`

### E2E Tests

`gulp e2e` (Beware of the proxy!)

## Architecture

We use a component oriented architecture with a messaging system.

### Component architecture

Here is the common structure of a module containing one component:

```
├── product/                        * Component directory
│   ├── product.controller.js       * Component controller (no logic)
│   ├── product.controller.spec.js  * Unit test file for the controller
│   ├── product.css                 * Style
│   ├── product.directive.js        * Angular directive, parameters declaration
│   ├── product.html                * View
│   ├── product.js                  * Angular component declaration in a scoped module
│   ├── product.service.js          * Service (logic)
│   └── product.service.spec.js     * Service unit test
└── myApp.business.js               * Parent module definition registering child components
```

### Project structure

```
├── app/                            * Source code of the application
│   ├── app.config.js               * The config file of the application (routes, etc.)
│   ├── app.constants.js            * Constants (service urls, etc.)
│   │── app.js                      * Declaration of the angular application 
│   ├── app.run.js                  * The first file to run when application starts
│   ├── assets/                     * Images, etc.
│   ├── components/                 * The main components
│   │   ├── business                * Reusable components
│   │   ├── appName.components.js   * Declaration of the components
│   │   ├── container/              * The container of every views
│   │   ├── orchestration/          * Event listening and forwarding
│   │   └── plugins/                * Plugins components (event, http, etc.)
│   ├── css/                        * Global CSS files
│   ├── index.html                  * Entry point HTML
│   ├── init.js                     * Entry point JS (angular bootstaping pollyfills)
│   └── views/                      * Views of the application, use container components
├── bower_components/               * Third party libraries install via bower
├── bower.json                      * The list of the third party libraries
├── coverage/                       * The result of the unit test coverage
├── dist/                           * The compiled application via gulp
├── e2e/                            * The e2e tests
│   ├── dist/                       * Compiled e2e tests
│   └── src/                        * Source e2e tests (ES6)
├── gulpfile.js                     * Contains the gulp build tasks
├── karma.conf.js                   * The config file for karma test runner
├── mobile/                         * The cordova directory project
│   ├── config.xml                  * Cordova config file
│   ├── hooks/                      * Used for plugins
│   ├── platforms/                  * Cordova platforms
│   ├── plugins/                    * Cordova plugins
│   ├── res/                        * Resource files (splash, icons, etc.)
│   └── www/                        * Compiled web source files
├── node_modules/                   * Third party libraries used for gulp
├── package.json                    * The list of the third party libraries for gulp
├── protractor.conf.js              * The config file for e2e tests
└── README.md 
```

### Testing

We use 2 types of testing: Unit and E2E (UI)

#### Unit

We test the controllers, the services and the orchestrators. Each method should have at least one unit test to validate its behavior. Adding behavior means new tests, changing behavior means changing existing tests.

#### E2E

We use the PageObject pattern. We have at one spec file for each view. We try to decouplate as much as possible of angular. We generally have one e2e test for each user story.

### Gulp tasks

The main gulp tasks are:

* `gulp`: This is the default task. It builds the web application, launches a development web server and set up a file watcher to reload the browser when a file is changed.
* `gulp build`: This build the application and put the compiled files to the dist folder.
* `gulp build:mobile`: This build the application for the web and mobile (www folder of the mobile project)
* `gulp test`: Launch the unit tests with karma
* `gulp e2e`: Launch the e2e tests

You can use the environment variable ENVIRONMENT to build the application for production or not (changes the constants of the application, see the file app.constants.js). Example: `ENVIRONMENT=PROD gulp build` on a unix system, or on windows: `set ENVIRONMENT=PROD` before calling `gulp`;

## Resources

### Debugging

* https://github.com/phonegap/phonegap/wiki/Debugging-in-PhoneGap
* https://developer.chrome.com/devtools/docs/remote-debugging#debugging-webviews

### Angular with ES6

* http://cameronjroe.com/code/angular-movie-search/
* http://busypeoples.github.io/post/testing-angular-es6/
* http://www.michaelbromley.co.uk/blog/350/exploring-es6-classes-in-angularjs-1-x
* https://github.com/michaelbromley/angular-es6
* https://github.com/Swimlane/angular-systemjs-seed
* https://github.com/gocardless/es6-angularjs
* https://github.com/angular/material-start/tree/es6
* http://rangle.io/blog/how-to-embrace-angular-2-today-with-future-friendly-angular-1-3/
* https://github.com/angular-class/NG6-starter

###Angular Component pattern

* http://teropa.info/blog/2014/10/24/how-ive-improved-my-angular-apps-by-banning-ng-controller.html
* http://busypeoples.github.io/post/thinking-in-components-angular-js/

### Browserify

* http://benclinkinbeard.com/talks/2014/ng-conf

### ES6 itself

* http://cameronjroe.com/code/angular-movie-search/
* http://es6-features.org

### E2E testing

* http://angular.github.io/protractor/#/
* http://ramonvictor.github.io/protractor/slides
* http://eisenbergeffect.bluespire.com/untitled/
