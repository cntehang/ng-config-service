import { TestBed } from '@angular/core/testing'

import { ConfigService } from './ng-config.service'

describe('ConfigServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: ConfigService = TestBed.get(ConfigService)
    expect(service).toBeTruthy()
  })
})
