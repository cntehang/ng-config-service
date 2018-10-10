# Angular Configuration Service Development

This document describes the development details of the Angular Configuration Service `ng-config-service` library.

## The NPM Package Name

The first development taks is to find an NPM package name for this library. The name is found available by checking the 404 response of the [https://www.npmjs.com/package/ng-config-service](https://www.npmjs.com/package/ng-config-service).

## The Library Project

There are two common ways to create the library project: 1) starting from scratch like the [Ionic-configuration-service](ionic-configuration-service), or, 2) use the library support in Angular CLI 6. The first method has the benefit of a small project size and is independent of Angular CLI tools. But it requires the manual setup of compiling and testing. The second method is much simpler but brings additional projects and dependencies. This project uses the second method because it is easy to setup and less code. The Angular CLI generates an application project and a library project. The application project is used as an example project showing how to use the configuration service. The [Angular library blogs](angular-library-series) give good introduction of creating Angular library.

## Create a New Workspace

Angular CLI creates an application to host the library project. Create a new Angular workspace and a lib project using the following commands:

```sh
ng new ng-config-service-app
mv ng-config-service-app ng-config-service
cd ng-config-service
ng generate library ng-config-service
```

The project folder name is changed to `ng-config-service` to make it clear that it holds the `ng-config-service` project. Actually it has two Angular projects: 1) the `ng-config-service-app`, the sample app, and 2) the `ng-config-service`, the actual library to be published as an NPM package.

Remove the generated component/module files of `ng-config-service.component.spec.ts`, `ng-config-service.component.ts`, and `ng-config-service.module.ts` because only the service file and its test file are used. Also change the `public_api.ts` to remove the export statements for the component and the module.

## Change the `package.json` file

Because all build scripts are defined in the root `package.json` file and the real project name is `ng-config-service`, set the `"name": "ng-config-service"` in the root `package.json` thus the `name` can be used in NPM package build and publish.

## Handle Errors

If the `HttpClient` fails to load the configuraiton data, it should thrown an `Error`. The error message is created from the `HttpClient` error: either from `error.message` or `error.error.message` as shown in the following code: `error.message || (error.error ? error.error.message : 'undefined')`.

## CI

The project uses Travis CI to build and test the project. The test is headless but `--watch=false` doesn't work. Therefore we set `singleRun: true,` in the `karma.conf.js` for both the demo project and lib project to run all tests only once and exits.

Additionally, set `sudo: required` in `.travis.yml` because the chrome sandbox needs sudo.

[ionic-configuration-service]: https://github.com/Ritzlgrmft/ionic-configuration-service
[angular-library-series]: https://blog.angularindepth.com/the-angular-library-series-publishing-ce24bb673275
[ng-config]: https://github.com/BizAppFramework/ng-config
[ngx-config]: https://github.com/fulls1z3/ngx-config
[ng-config-service]: https://github.com/cntehang/ng-config-service
