import { Injectable, APP_INITIALIZER, Provider } from '@angular/core'
import { HttpClient } from '@angular/common/http'

const defaultFilePath = 'assets/config/config.json'

/**
 * A configuration service class that uses HttpClient to load configuration settings.
 *
 * To use it, first call the `load()` method to load the configuration.
 * Then use the `get()` method to get a value for a specific key.
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  private settings: { [key: string]: any }

  private configUrl = defaultFilePath

  /**
   * Load the configuration settings using HttpClient get method.
   *
   * @param {string} configUrl The URL of the configuration data.
   * @returns {() => Promise<void>} A function that returns a Promise.
   * The function is used by the factory method in defining `APP_INITIALIZER` provide.
   */
  public load(configUrl?: string): () => Promise<void> {
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

  /**
   * Get the configuration value for the specified key.
   *
   * @param {string} key The key of the configuration value.
   * @returns {T | Undefined} The value of the specified configuration key.
   */
  public get<T>(key: string): T | undefined {
    let result: T | undefined

    if (this.settings) {
      result = this.settings[key]
    }
    return result
  }
}

/**
 * Called by a `APP_INITIALIZER` provider factory to load configuration and return a promise.
 * @ignore
 */
function initializeService(configUrl: string) {
  return (config: ConfigService) => {
    return config.load(configUrl)
  }
}

/**
 * Initialize the `APP_INITIALIZER` provider.
 *
 * @param configUrl The configuration data URL
 * @returns {Provider[]} A ConfigService DI provider and the `APP_INITIALIZER` provider.
 * The result are added to the `providers` property in AppModule definition.
 */
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
