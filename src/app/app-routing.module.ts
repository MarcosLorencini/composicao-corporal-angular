import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { PartnerlistComponent } from './partnerlist/partnerlist.component';
import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AddAlunoComponent } from './add-aluno/add-aluno.component';
import { AddComposicaoComponent } from './add-composicao/add-composicao-component/add-composicao-component';
import { ComposicaoListComponent } from './composicao-list/composicao-list.component';
import { GraficoComponent } from './grafico/grafico.component';

const routes: Routes = [
  { path: '', redirectTo: 'view-aluno', pathMatch: 'full' },
  { path: 'view-aluno', component: AlunoListComponent },
  { path: 'add-aluno', component: AddAlunoComponent },
  { path: 'add-composicao', component: AddComposicaoComponent },
  { path: 'list-composicao', component: ComposicaoListComponent },
  { path: 'gerar-grafico', component: GraficoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
