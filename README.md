# ng-config-service

> A simple and flexible runtime config service for Angular application.

## Installing / Getting started

There are three steps to setup the config service using the default configuration file path of `assets/config/config.json`.

1. Install the `ng-config-service` package: `npm install ng-config-service`
1. Create a configuration JSON file `assets/config/config.json` in your project.
1. Bootstrap the config service in the root module. Because the config service use the `HttpClient` to fetch the configuration data, please make sure that `HttpClientModule` is imported in the root module.

The last step uses a const `bootConfigServiceProvider` that is exported from the `ng-config-service`. This const is a `APP_INITIALIZER` provider that uses a factory method to load configuration data during Angular bootstrap. The following code is an example using the default configuration file path.

```ts
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { bootConfigServiceProvider } from 'ng-config-service'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],

  // use the APP_INITIALIZER to load configuration data
  providers: [bootConfigServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### A Different Configuration Data URL

If you want to use a different URL of a configuration file path or an HTTP API, you only need to assign the URL to a pre-defined injection token `NG_CONFIG_URL_TOKEN` in the above `providers` metadata. The following is an example.

```ts
providers: [
  {
    provide: NG_CONFIG_URL_TOKEN,
    useValue: 'path/to/my-config-file.json',  // could be an URL API or an environment variable
  },
  bootConfigServiceProvider,
],
```

### Usage

The config service can be injected and its `public get<T>(key: string): T | undefined` method is used to get a configuration value. Following is a demo:

```ts
import { ConfigService } from 'ng-config-service'

@Component({
  //...
})
export class MyComponent {
  constructor(private configService: ConfigService) {}

  myMethod() {
    const aValue = this.configService.get('aKey')
  }
}
```

### Error

If the config service fails to load the configuration data, due to either an invalid URL or wrong JSON syntax, it throws an Error exception that stops the Angular application bootstrap.

## Developing

The [Design Document](./docs/design.md) and the [Development Document](./docs/develop.md) describe the design consideration and the development details.

### Built With

The project uses [Angular CLI](https://cli.angular.io/).

### Prerequisites

It should be compatible with Angular 6.0 or later.

### Setting up Dev

The source code has two projects created by Angular CLI and uses its [library support](https://github.com/angular/angular-cli/wiki/stories-create-library). It has a regular Angular application served as a demo project that uses the config service library. The config service source code is located in `projects/ng-config-service` folder.

### Building

Because of the limitation of Angular CLI, both the `package.json` and the `project/ng-config-service/package.json` should use the name `name` of `ng-config-service`. For each new publish, update both `package.json` files to use the same `version` value.

In project root, build the library project using `npm run build-lib`.

The demo app is build with the regular Angular CLI: `ng build`. To run the demo, use `ng serve --open` and you should see the property value configured in `assets/config/config.json` file.

### Deploying / Publishing

To create the NPM package, run `npm run package`.
To publish the NPM package, run `npm run publish`.

The `cross-var` package is used to provide cross-platform portability.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](https://github.com/cntehang/ng-config-service/tags).

## Tests

We use the demo app to test configuration service. Use `ng test` to run the test.

## Style guide

It uses [`tslint-angular`](https://github.com/mgechev/tslint-angular) and [`prettier`](https://prettier.io/) to enforce a consistent code format. The detail styles are defined in the [`tslint.json` file](./tslint.json) and the [`.prettierrc` file](./prettierrc).

## Code Documentation

The project uses [Compodoc](https://compodoc.app/) to generate code documents. Just run `npm run docs` to generate documents in the `dist/documentation` folder.
