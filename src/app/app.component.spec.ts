import { TestBed, async } from '@angular/core/testing'

import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { ApplicationInitStatus } from '@angular/core'

import { bootConfigServiceProvider, NG_CONFIG_URL_TOKEN } from 'ng-config-service'

const testConfigValue = 'Test Config Value'
const testConfigValue2 = 'Test Config Value2'

// ToDo: need to find out how to test wrong URL
// Angular throws an exception when config service throws an error

describe('Config Service with default URL', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      providers: [bootConfigServiceProvider],
    }).compileComponents()
  }))

  // the TestBed doesn't support useFactory in APP_INITIALIZER
  // Below is a quick fix from https://github.com/angular/angular/issues/24218
  beforeEach(async () => {
    await TestBed.get(ApplicationInitStatus).donePromise
  })

  runTests(testConfigValue)
})

describe('Config Service with specified URL', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: NG_CONFIG_URL_TOKEN,
          useValue: 'assets/config/config2.json',
        },
        bootConfigServiceProvider,
      ],
    }).compileComponents()
  }))

  // the TestBed doesn't support useFactory in APP_INITIALIZER
  // Below is a quick fix from https://github.com/angular/angular/issues/24218
  beforeEach(async () => {
    await TestBed.get(ApplicationInitStatus).donePromise
  })

  runTests(testConfigValue2)
})

function runTests(expectedValue: string) {
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))

  it('should inject the config service', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app.configService).toBeTruthy()
  }))

  it(`should have a config value ${expectedValue}`, async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app.configValue).toEqual(expectedValue)
  }))

  it('should render the config value', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('#config-value').textContent).toContain(expectedValue)
  }))
}
