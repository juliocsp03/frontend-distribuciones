import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Calcular probabilidad', url: '/action/probability', icon: 'calculator' },
    { title: 'Generar muestras', url: '/action/distribution', icon: 'stats-chart' },
  ];
  constructor() {}
}
