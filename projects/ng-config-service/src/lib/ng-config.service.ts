import {
  Injectable,
  APP_INITIALIZER,
  Provider,
  InjectionToken,
  Inject,
  Optional,
} from '@angular/core'
import { HttpClient } from '@angular/common/http'

const defaultFilePath = 'assets/config/config.json'

export let NG_CONFIG_URL_TOKEN = new InjectionToken<string>('configuration url')

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
  private settings: { [key: string]: any }

  constructor(
    private http: HttpClient,
    @Optional()
    @Inject(NG_CONFIG_URL_TOKEN)
    private url?: string,
  ) {}

  /**
   * Load the configuration settings using HttpClient get method.
   *
   * @returns A function that returns a Promise.
   * The function is used by the factory method in defining `APP_INITIALIZER` provide.
   */
  public load(): () => Promise<void> {
    if (!this.url) {
      this.url = defaultFilePath
    }
    return () => {
      return this.http
        .get(this.url)
        .toPromise()
        .then(data => {
          this.settings = data
        })
        .catch(err => {
          console.error(`ConfigService failed to load config file ${this.url}: ${err}`)
        })
    }
  }

  /**
   * Get the configuration value for the specified key.
   *
   * @param key The key of the configuration value.
   * @returns The value of the specified configuration key.
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
 * The AOT requires a function, not an expression (arrow function or funciton expression)
 * @ignore
 */
export function initializeService(config: ConfigService) {
  return config.load()
}

/**
 * Initialize the `APP_INITIALIZER` provider.
 * It should be added to the `providers` property in AppModule definition.
 */
export const bootConfigServiceProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeService,
  multi: true,
  deps: [ConfigService],
}
