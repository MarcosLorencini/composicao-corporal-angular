import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PartnerlistComponent } from './partnerlist/partnerlist.component';
import {DataTablesModule} from 'angular-datatables';
import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AddAlunoComponent } from './add-aluno/add-aluno.component';
import { AddComposicaoComponent } from './add-composicao/add-composicao-component/add-composicao-component';
import { ComposicaoListComponent } from './composicao-list/composicao-list.component';
import { GraficoComponent } from './grafico/grafico.component';
import { HighchartsChartComponent } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PartnerlistComponent,
    AlunoListComponent,
    AddAlunoComponent,
    AddComposicaoComponent,
    ComposicaoListComponent,
    GraficoComponent,
    HighchartsChartComponent,

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
