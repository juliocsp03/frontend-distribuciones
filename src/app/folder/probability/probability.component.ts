import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DistributionsService } from '../../api/distributions.service'

declare var Plotly
@Component({
  selector: 'app-probability',
  templateUrl: './probability.component.html',
  styleUrls: ['./probability.component.scss'],
})
export class ProbabilityComponent implements OnInit {
  @ViewChild('myDiv', {static: true}) miDiv:ElementRef;
  private selectValue: string;
  private cardinality: number;
  private mu: number;
  private l: number;
  private p: number;
  private x: number;
  private n: number;
  private k: number;
  private r: number;
  private sigma: number;
  private data: any;
  private probability: number;

  constructor(private d_service: DistributionsService) { }

  showForm(){
    Plotly.purge(this.miDiv.nativeElement)
    this.cardinality = null;
    this.data = null;
    this.mu = null;
    this.l = null;
    this.p = null;
    this.n = null;
    this.x = null;
    this.k = null;
    this.r = null;
    this.sigma = null;
    this.probability = null;
  }

  getProbability(distribution){
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
      console.log(this.data);
      this.fillPlotly()
    });
  }

  fillPlotly(){
    let x:any = [];
    var data = [
      {
        x: 'x',
        y: this.data['data']['distribution'],
        type: 'bar'
      }
    ];
    Plotly.newPlot(this.miDiv.nativeElement, data);
  }

  normalDistribution(distribution){
    let data:any = {
      distrib: distribution,
      type: "probability",
      dictionary: {
        x: this.x,
        mu: this.mu,
        sigma: this.sigma,
        cardinality: 20
      }
    }
    return data;
  }

  exponentialDistribution(distribution){
    let data:any = {
      distrib: distribution,
      type: "probability",
      dictionary: {
        l: this.l,
        x: this.x,
        cardinality: this.x
      }
    }
    return data;
  }

  poissonDistribution(distribution){
    let data:any = {
      distrib: distribution,
      type: "probability",
      dictionary: {
        k: this.k,
        cardinality: this.k
      }
    }
    return data;
  }

  binomialDistribution(distribution){
    let data:any = {
      distrib: distribution,
      type: "probability",
      dictionary: {
        p: this.p,
        n: this.n,
        x: this.x,
        cardinality: this.x
      }
    }
    return data;
  }

  negativeBinomialDistribution(distribution){
    let data:any = {
      distrib: distribution,
      type: "probability",
      dictionary: {
        x: this.x,
        cardinality: this.x,
        p: this.p,
        r: this.r
      }
    }
    return data;
  }

  probabilidad(data){
    return data * 100;
  }

  ngOnInit() {}

}
