import { Component } from '@angular/core'
import { ConfigService } from 'ng-config-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  configValue = 'not defined'

  constructor(public configService: ConfigService) {
    this.configValue = configService.get('testKey')
  }
}
