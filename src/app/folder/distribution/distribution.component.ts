import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DistributionsService } from '../../api/distributions.service'

declare var Plotly
@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss'],
})
export class DistributionComponent implements OnInit {
  @ViewChild('myDiv', {static: true}) miDiv:ElementRef;
  private selectValue: string;
  private cardinality: number;
  private mu: number;
  private l: number;
  private p: number;
  private n: number;
  private r: number;
  private sigma: number;
  private data: any;

  constructor(private d_service: DistributionsService) { 
  }

  showForm(){
    Plotly.purge(this.miDiv.nativeElement)
    this.cardinality = null;
    this.data = null;
    this.mu = null;
    this.l = null;
    this.p = null;
    this.n = null;
    this.r = null;
    this.sigma = null;
  }

  getGeneratedDistribution(distribution){
    switch (distribution){
      case 'normal':
        this.getData(this.normalDistribution(distribution));
        break;
      case 'exponencial':
        this.getData(this.exponentialDistribution(distribution));
        break;
      case 'poisson':
        this.getData(this.poissonDistribution(distribution));
        break;
      case 'binomial':
        this.getData(this.binomialDistribution(distribution));
        break;
      case 'binomial_negativa':
        this.getData(this.negativeBinomialDistribution(distribution));
        break;
    } 
  }

  getData(data){
    this.d_service.getData(data).toPromise().then(res=>{
      this.data = res;
      console.log(this.data)
      this.fillPlotly()
    });
  }

  fillPlotly(){
    let x:any = [];
    var data = [
      {
        x: this.data['data']['distribution'],
        // y: this.data['data']['distribution'],
        type: 'histogram'
      }
    ];
    Plotly.newPlot(this.miDiv.nativeElement, data);
  }

  normalDistribution(distribution){
    let data:any = {
      distrib: distribution,
      type: "sample",
      dictionary: {
        cardinality: this.cardinality,
        mu: this.mu,
        sigma: this.sigma
      }
    }
    return data;
    // this.d_service.getData(data).toPromise().then(res=>{
    //   console.log(res);
    // });
  }

  exponentialDistribution(distribution){
    let data:any = {
      distrib: distribution,
      type: "sample",
      dictionary: {
        cardinality: this.cardinality,
        l: this.l,
      }
    }
    return data;
  }

  poissonDistribution(distribution){
    let data:any = {
      distrib: distribution,
      type: "sample",
      dictionary: {
        cardinality: this.cardinality
      }
    }
    return data;
  }

  binomialDistribution(distribution){
    let data:any = {
      distrib: distribution,
      type: "sample",
      dictionary: {
        cardinality: this.cardinality,
        p: this.p,
        n: this.n
      }
    }
    return data;
  }

  negativeBinomialDistribution(distribution){
    let data:any = {
      distrib: distribution,
      type: "sample",
      dictionary: {
        cardinality: this.cardinality,
        p: this.p,
        r: this.r
      }
    }
    return data;
  }

  ngOnInit() {}

}
