import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../aluno.service';
import { Aluno } from '../aluno';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {

 constructor(private alunoservice:AlunoService, private router: Router, private dataService: DataService, private formBuilder: FormBuilder) { }
 alunoupdateform: FormGroup;
  alunosArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  alunos: Observable<Aluno[]>;
  aluno : Aluno=new Aluno();
  deleteMessage=false;
  alunolist:any;
  isupdated = false; 
  submitted = false;   
 

  ngOnInit() {
    // this.submitted=false;
     this.alunoupdateform= this.formBuilder.group({
      aluno_nome: ['', [Validators.required, Validators.minLength(6)]],
      aluno_id: ['', [Validators.required]]
    });

    // alunoupdateform=new FormGroup({
    //   aluno_id:new FormControl(),
    //   aluno_nome:new FormControl()
    // });
 
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };   
    this.alunoservice.getAlunoList().subscribe(data =>{
    this.alunos = data;
    this.dtTrigger.next();
    })
  }

   // convenience getter for easy access to form fields
   get f() { return this.alunoupdateform.controls; }
  
  deleteAluno(id: number) {
    this.alunoservice.deleteAluno(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.alunoservice.getAlunoList().subscribe(data =>{
            this.alunos =data
            })
        },
        error => console.log(error));
  }


  updateAluno(id: number){
    this.submitted=false;
    this.alunoservice.getAluno(id)
      .subscribe(
        data => {
          this.alunolist=data           
        },
        error => console.log(error));
  }

  gotToAddNoteByService(aluno: Aluno){
    this.dataService.setAluno(aluno);
    this.router.navigate(['/list-composicao'])
  }

  gerarGrafico(aluno: Aluno){
    this.dataService.setAluno(aluno);
    this.router.navigate(['/gerar-grafico'])
  }

 

  updateAlu(updalu){
    this.submitted = true;
    console.log(this.alunoupdateform)
    if (this.alunoupdateform.invalid) {
      console.log("xxxx");
      return;
      
    }
    console.log("yyyy");
    this.aluno=new Aluno(); 
   this.aluno.aluno_id=this.AlunoId.value;
   this.aluno.aluno_nome=this.AlunoNome.value;

   this.alunoservice.updateAluno(this.aluno.aluno_id,this.aluno)
   .subscribe(
    data => {     
      this.isupdated=true;
      this.alunoservice.getAlunoList().subscribe(data =>{
        this.alunos =data
        })
    },
    error => console.log(error));
  }

  get AlunoNome(){
    return this.alunoupdateform.get('aluno_nome');
  }
 
  get AlunoId(){
    return this.alunoupdateform.get('aluno_id');
  }

  changeisUpdate(){
    this.isupdated=false;
  }
}
