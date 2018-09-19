import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'

import { initConfigServiceProviders } from 'ng-config-service'

const configServiceProviders = [...initConfigServiceProviders()]

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [configServiceProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
