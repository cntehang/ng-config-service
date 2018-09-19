import { Injectable, APP_INITIALIZER, Provider } from '@angular/core'
import { HttpClient } from '@angular/common/http'

const defaultFilePath = 'assets/config/config.json'

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  private settings: { [key: string]: any }

  private configUrl = defaultFilePath

  public load(configUrl?: string) {
    if (configUrl) {
      this.configUrl = configUrl
    }
    return () => {
      return this.http
        .get(this.configUrl)
        .toPromise()
        .then(data => {
          this.settings = data
        })
        .catch(err => {
          console.error(`ConfigService failed to load config file ${this.configUrl}: ${err}`)
        })
    }
  }

  public getProperty<T>(key: string): T | undefined {
    let result: T | undefined

    if (this.settings) {
      result = this.settings[key]
    }
    return result
  }
}

function initializeService(configUrl: string) {
  return (config: ConfigService) => {
    return config.load(configUrl)
  }
}

export function initConfigServiceProviders(configUrl?: string): Provider[] {
  return [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeService(configUrl),
      multi: true,
      deps: [ConfigService],
    },
  ]
}
