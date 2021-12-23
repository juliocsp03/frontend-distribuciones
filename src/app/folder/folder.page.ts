import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var Plotly
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  @ViewChild('myDiv', {static: true}) miDiv:ElementRef;
  public folder: string;
  constructor(private activatedRoute: ActivatedRoute) { 
  }

  // ngAfterViewInit(){
  //   var data = [
  //     {
  //       x: ['giraffes', 'orangutans', 'monkeys'],
  //       y: [20, 14, 23],
  //       type: 'bar'
  //     }
  //   ];
  //   Plotly.newPlot(this.miDiv.nativeElement, data);
  // }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
