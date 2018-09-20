# ng-config-service

> A simple and flexible runtime config service for Angular application.

This runtime config service is simple to use with one line to initialize it and one single method to get configuration values. Nonetheless, it is flexible to support different usage scenarios: flexible configuration schema and flexible configuration file path that supports enviornment variables. Because it uses `HttpClient` to retrieve the configuration data from the specified URL, the configuration source can be an API that returns configuration in JSON format.

[The Angular application enviornments](https://github.com/angular/angular-cli/wiki/stories-application-environments) is a build time configuration tool that is not appriopriate for runtimee because any change in the envirornment requires a rebuild/recompile of the source code. The runtime config service doesn't need rebuild/recompile of the source code to change the configuration.

## Installing / Getting started

There are three steps to setup the config service.

1. Install the `ng-config-service` packge: `npm install ng-config-service`
1. Create a configuration JSON file in your project. The default path is `assets/config/config.json`. If the file is in a different location, the file path has to be passed as a parameter to initialize DI proivders. **The file path is a relative path string without the leading "src" part**.
1. Initialize the config service DI providers and add them in the root module.

The last step uses a uitility function `initConfigServiceProviders` that is exported from the `ng-config-service`. The utility function take an optional URL parameter of configuration data and returns both a `ConfigService` provide and an `APP_INITIALIZER` provide. The `APP_INITIALIZER` uses a factory function that loads configuration data from the specified URL during Angular bootstrap. The following code is an example showing the initialization and provision of the `ConfigService` provide and the `APP_INITIALIZER` provide.

Because the config service use `HttpClient` to fetch the configuration data, please make sure that `HttpClientModule` is imported in the root module.

```ts
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { initConfigServiceProviders } from 'ng-config-service'

// the initConfigServiceProviders call returns an array that has a `ConfigService` provide and an `APP_INITIALIZER` provide
// the initConfigServiceProviders method can take a URL parameter of configuration data.
// If the URL parameter is missing, the default configuration file path of  'assets/config/config.json' is used.
const configServiceProviders = [...initConfigServiceProviders()]

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],

  // add the two provides
  providers: [configServiceProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Then the config service can be injected and its `public getProperty<T>(key: string): T | undefined` method is used to get a configuration value. Following is a demo:

```ts
import { ConfigService } from 'ng-config-service'

@Component({
  //...
})
export class MyComponent {
  constructor(private configService: ConfigService) {}

  myMethod() {
    const aValue = this.configService.getProperty('aKey')
  }
}
```

## Developing

### Built With

The project uses [Angular CLI](https://cli.angular.io/).

### Prerequisites

It should be compatible with Angular 6.0 or later.

### Setting up Dev

The source code has several projects created by Angular CLI and uses its [library support](https://github.com/angular/angular-cli/wiki/stories-create-library). It has a regular Angular application served as a demo project that uses the config service library. The config service source code is located in `projects/ng-config-service` folder.

### Building

Because of the limitation of Angular CLI, both the `package.json` and the `project/ng-config-service/package.json` should use the name `name` of `ng-config-service`. For each new publish, use the same `version` value.

In project root, build the library project using `npm run build-lib`.

The demo app is build with the regular Angular CLI: `ng build`. To run the demo, use `ng serve --open` and you should see the property value configured in `assets/config/config.json` file.

### Deploying / Publishing

To create the NPM package, run `npm run package`.
To publish the NPM package, run `npm run publish`.

The `cross-var` package is used to provide cross-platform protability.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](https://github.com/cntehang/ng-config-service/tags).

## Tests

Test the config service project.

## Style guide

It uses [`tslint-angular`](https://github.com/mgechev/tslint-angular) and [`prettier`](https://prettier.io/) to enforce a consistent code format. The detail styles are defined in the [`tslint.json` file](./tslint.json) and the [`.prettierrc` file](./prettierrc).
