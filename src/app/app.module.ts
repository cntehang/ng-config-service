import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'

import { bootConfigServiceProvider, NG_CONFIG_URL_TOKEN } from 'ng-config-service'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: NG_CONFIG_URL_TOKEN,
      useValue: 'assets/config/config2.json',
    },
    bootConfigServiceProvider(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
