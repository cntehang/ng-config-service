import { Component } from '@angular/core'
import { ConfigService } from 'ng-config-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  propertyValue = 'not defined'

  constructor(service: ConfigService) {
    this.propertyValue = service.get('testKey')
  }
}
