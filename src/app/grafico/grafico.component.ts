import { Component,OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { ComposicoesService } from '../composicao.service';
import { DataService } from '../aluno-list/data.service';
import { Composicao } from '../composicao';
import { Aluno } from '../aluno';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-output-graph',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  Highcharts = Highcharts;
  public chartOptions1: any = {
    chart: {
      type: 'column'
   },
   title: {
      text: 'Composicao Corporal'
   },
   subtitle : {
      text: ''  
   },

    xAxis:{
        categories: ['Gordura', 'Musculo', 'Gordura Viceral'], title: {
        text: null
        } 
    },
   yAxis : {
      min: 0, title: {
         text: 'Porcentagem'
      },
      labels: {
         overflow: 'justify',
      }
   },
   
   tooltip : {
      valueSuffix: '%'
   },
   plotOptions : {
    column: {
         dataLabels: {
            enabled: true
         }
      }
   },
   credits:{
      enabled: false
   },
   series: []

  };


  
 public chartOptions2: any = {
    chart: {
      type: 'column'
   },
   title: {
      text: 'Composicao Corporal'
   },
   subtitle : {
      text: ''  
   },

    xAxis:{
        categories: ['Peso', 'IMC', 'Idade'], title: {
        text: null
        } 
    },
   yAxis : {
      min: 0, title: {
         text: ''
      },
      labels: {
         overflow: 'justify'
      }
   },
   tooltip : {
      valueSuffix: ''
   },
   plotOptions : {
    column: {
         dataLabels: {
            enabled: true
         }
      }
   },
   credits:{
      enabled: false
   },
   series: []

  };

  
  constructor(private composicoesservice:ComposicoesService, private dataService: DataService) { }

	
	id_aluno : number;
	alunos: Aluno = new Aluno();
  composicoesPorColuna = [];

   
  ngOnInit() {    
    let arrayRetorno = [];
    let arrayRetornoGraficoDois = [];
    let meses = [];
    let mesesGraficoDois = [];
    let dadosTabela = []; 
    let dadosTabelaGraficoDois = [];
    this.alunos = this.dataService.getAluno();
    this.id_aluno = this.alunos.aluno_id


		this.composicoesservice.getComposicoesGerarGraficoUm(this.id_aluno)
    .subscribe(data => {
          arrayRetorno.push(data);

              let j=0;
              let i = 0;
              let m = 0;
              arrayRetorno.forEach((value, index) => {
                 while( value[j][i] !== undefined){
                    for (i; i < value.length; i++) {
                        j=0;
                        for (j; j < value.length; j++) {

                          if(value[j][i] == undefined){
                              break;
                          }
                              dadosTabela.push(value[j][i]);
                              if(i==m && j == value.length-1){
                                let monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                                let d = new Date(value[j][i]);
                                meses.push(monthNames[d.getUTCMonth()]);
                                this.chartOptions1.series.push({
                                  name : meses,
                                  data : dadosTabela
                                })
                              }
                        }
                        m++;
                        meses = [];
                        dadosTabela = [];
                      }
                     
                      this.chartOptions1.subtitle.text = this.alunos.aluno_nome;
                    }
                   
           });
       
           Highcharts.chart('container1', this.chartOptions1);
          },
          error => console.log(error));
         
        this.composicoesservice.getComposicoesGerarGraficoDois(this.id_aluno)
        .subscribe(data => {
          arrayRetornoGraficoDois.push(data);
          
          let j=0;
          let i = 0;
          let m = 0;
          arrayRetornoGraficoDois.forEach((value, index) => {
            while( value[j][i] !== undefined){
              for (i; i < value.length; i++) {
                j=0;
                for (j; j < value.length; j++) {
                  if(value[j][i] == undefined){
                    break;
                  }
                  
                  dadosTabelaGraficoDois.push(value[j][i]);
                    if(i==m && j == value.length-1){
                      let monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                      let d = new Date(value[j][i]);
                      mesesGraficoDois.push(monthNames[d.getUTCMonth()]);
                      this.chartOptions2.series.push({
                        name : mesesGraficoDois,
                        data : dadosTabelaGraficoDois
                      })
                    }
                }
          
                    m++;
                    mesesGraficoDois = [];
                    dadosTabelaGraficoDois = [];
              }
                  this.chartOptions2.subtitle.text = this.alunos.aluno_nome;
            }
                              
          });
           
          Highcharts.chart('container2', this.chartOptions2);   
      },
            error => console.log(error));
            
      }



}