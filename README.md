# Barebone Project
----------

## Setting up 

This is a description of the set-up procedure as it currently stands. This set-up procedure will be streamlined further in the future.


### Install node.js and node package manager (npm).

From Debian and Ubuntu based distributions, use the following commands:

```
sudo apt-get install nodejs
sudo apt-get install nodejs-legacy
sudo apt-get install npm
```

For other distributions, you will not need the nodejs-legacy package. For information about other distributions, see:
[Installing node.js via package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)


### Install Grunt Client

To use the `grunt-cli`, it must be installed globally.

```
sudo npm install -g grunt-cli
```


### Install SASS Ruby Gem

This gem is required for compilation of .scss files to CSS. To use install and use the SASS gem, Ruby must be installed. Check Ruby is installed with `ruby -v`.

Install Ruby, if it is not installed: `sudo apt-get install ruby`

Then, install Ruby SASS gem: `sudo gem install sass`

Updating Gems, you may encounter this issue (windows machine)
SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed
This article https://gist.github.com/luislavena/f064211759ee0f806c88 , section "Installing using update packages" should sort the problem.


### Install Dependencies

This project has two kinds of dependencies in this project: tools and libraries.

Tools:

*  are for managing and testing the application
*  are specified in `package.json`.
*  are installed via `npm`, the node package manager.


Libraries:

*  are specified in `bower.json`.
*  are installed via `bower`, a client-side code package manager.
*  include angular, and any other libraries needed.

In this project, `npm install` has been configured to automatically run `bower install`, so we can simply run:

```
npm install
```

This will create the following folders:

* `node_modules` - contains the npm packages for tools needed.
* `app/bower_components` - contains bower packages for libraries needed.


### Serve the client

Serve the client using the default grunt task, run with the command `grunt` or `grunt serve`. (More Details about this Grunt task a section below.)


---


## Project's Grunt tasks

### grunt serve (default task)

This task can be used to serve the client on port 9000.

Command: `grunt` or `grunt serve`

Options:

`--env` - Choose from a set of pre-configured API hosts to use

Sample usage: `grunt --env=dev`

`--test` - Boolean flag, if set run unit tests continuously while serving the client. Recommended during development.

`--build`- Boolean flag. Used for testing / debugging a build of the client. Runs unit tests, builds the app for deployment if they pass, finally serves the app's build.

Details:

- Before serving the client: This task installs any project dependencies, injects them into relevant files, compiles any assets requiring compilation to the `.tmp` directory.

- While serving the client: watches for changes in assets, and re-compiles any assets requiring compilation. If new dependencies are installed, automatically injects them into relevant files.

- Optionally: Continuously runs unit test concurrently to serving the client.


### grunt jsdoc

This task generates documentation for the client javascript assets. Command must be run from the client root directory.

Command: `grunt jsdoc`


### grunt styleguide

This task generates styleguide documentation for the client SCSS assets.

Command: `grunt styleguide`


### grunt test

This command can be used to run the client test (unit test and, optionally, end-to-end tests) separately from serving the client. The default behaviour of this task is to run tests continuously.

Command: `grunt test`

Options:

`--type=single` - Run a single run of unit-tests, instead of running them continuously.

`--e2e`- Also run the client's end-to-end tests. (Usage recommended together with the `--type=single` option, as Protractor does not offer a live watch option.) Ensure the client with `grunt serve` if using this option.


### grunt e2etest

Run end-to-end tests on their own. Ensure you are serving the client with `grunt serve` before running this.

Command: `grunt e2etest`


### grunt build

Builds the client application for deployment. Gathers all assets (images, scripts, styles, html) in a directory `dist` at the client's root. Assets are concatenated (where suitable) and minified, ready for deployment.

Command: `grunt build`

Options:

`--env` - Choose from a set of pre-configured API hosts to use. If no environment variable is passed, the environment defaults to `dist`.

Sample usage: `grunt build --env=dev`

---

## Testing

There are two kinds of tests in the client application: Unit tests and End to End tests.


### Unit Tests

#### About Unit tests

Unit tests are written in [Jasmine 2.0](http://jasmine.github.io/), and run with the [Karma Test Runner](http://karma-runner.github.io/0.12/index.html). We provide a Karma configuration file to run them.

* Configuration for karma is found at `karma.conf.js`
* Unit tests are found in files in each module's `/test` directory and should use the prefic `.spec.js`.

#### Dependencies

If you have run `npm install`, then all necessary dependencies should already be installed.

#### Running Unit Tests

There are 2 ways to run unit tests:

- Continuous: Karma will watched source and test files for changes and re-runs the tests whenever a change is made. This is the recommended strategy; if your unit tests are being run every time you save a file then you receive instant feedback on any changes that break the expected code functionality.

- Single: Karma runs tests once then terminates, outputting results.

See information about the client's grunt tasks for details about how to run both continuous and single runs of the client's unit tests.


### End-to-End Tests

#### About End-to-End Tests

End-to-end tests are written in [Jasmine][jasmine]. These tests are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has special features for Angular applications.

* the configuration is found at `protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/*.js`

Protractor simulates interaction with our web app and verifies that the application responds correctly. Therefore, our web server needs to be serving up the application, so that Protractor can interact with it.

#### Dependencies

Since Protractor is built upon WebDriver we need to install this. This is done automatically by the grunt task set up to run the end-to-end tests. Running `npm install` will set up all other packages needed for end-to-end testing.

#### How to create tests

Easiest way to create new E2E tests is probably to install [Selenium Builder](http://sebuilder.github.io/se-builder/), a firefox extension.
Once installed, start a new recording session and proceed until the end. Once the recording is finished, go to File > Export > Node.JS - Protractor to export the session. You can directly export this file into the `e2e-test` folder with the js extension and it will be executed during the next testing session.

#### Running End-to-end tests

See information about the client's grunt tasks for details about how to run the client's end-to-end tests.


---

## Building the application for deployment

### Building only

A Grunt task has been created to build the client application for deployment. See information about the client's grunt tasks for details.

### Testing / debugging the build

See information about the client's grunt tasks for details about testing the build. (Specifically see docs on `grunt serve` task with `--build` options.

### Outstanding issues with the build process

Due an issue in the minification of the ngDialog library, the `mangle` option of the Grunt uglify task has to be disabled. This slightly increases the size of our minified assets, which is not ideal. Resolving this issue is not a priority at present, but would be worth addressing closer to final deployment.