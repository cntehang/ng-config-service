# Angular Configuration Service Development

This document describes the development details of the Angular Configuration Service `ng-config-service` library.

## The NPM Package Name

The first development taks is to find an NPM package name for this library. The name is found available by checking the 404 response of the [https://www.npmjs.com/package/ng-config-service](https://www.npmjs.com/package/ng-config-service).

## The Library Project

There are two common ways to create the library project: 1) starting from scratch like the [Ionic-configuration-service](ionic-configuration-service), or, 2) use the library support in Angular CLI 6. The first method has the benefit of a small project size and is independent of Angular CLI tools. But it requires the manual setup of compiling and testing. The second method is simpler but brings additional projects and dependencies. This project uses the second method because it is easy to setup. The Angular CLI generates an application project and a library project. The application project is used as an example project showing how to use the configuration service. The [Angular library blogs](angular-library-series) give good introduction of creating Angular library.

### Create a New Workspace

Angular CLI creates an application to host the library project. Create a new Angular workspace and a lib project using the following commands:

```sh
ng new ng-config-service-app
mv ng-config-service-app ng-config-service
cd ng-config-service
ng generate library ng-config-service
```

Remove `ng-config-service.component.spec.ts`, `ng-config-service.component.ts`, and `ng-config-service.module.ts` because only the service file and its test file are used. Also change the `public_api.ts` to remove the component and module

[ionic-configuration-service]: https://github.com/Ritzlgrmft/ionic-configuration-service
[angular-library-series]: https://blog.angularindepth.com/the-angular-library-series-publishing-ce24bb673275
[ng-config]: https://github.com/BizAppFramework/ng-config
[ngx-config]: https://github.com/fulls1z3/ngx-config
[ng-config-service]: https://github.com/cntehang/ng-config-service
