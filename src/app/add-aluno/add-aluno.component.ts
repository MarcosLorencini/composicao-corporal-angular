import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../aluno.service';
import {FormControl,FormGroup,Validators, FormBuilder} from '@angular/forms';
import { Aluno } from '../aluno';
@Component({
  selector: 'app-add-aluno',
  templateUrl: './add-aluno.component.html',
  styleUrls: ['./add-aluno.component.css']
})
export class AddAlunoComponent implements OnInit {
  
  constructor(private alunoservice:AlunoService, private formBuilder: FormBuilder) { }
  alunosaveform: FormGroup;
  aluno : Aluno=new Aluno();
  submitted = false;
  sucessSubmitted = false;

  ngOnInit() {
    //this.submitted=false;
    this.alunosaveform= this.formBuilder.group({
      aluno_nome: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.alunosaveform.controls; }
  
 
  
  saveAluno(saveAluno){
    this.submitted = true;
    if (this.alunosaveform.invalid) {
      return;
    }
    this.sucessSubmitted = true;
    this.aluno=new Aluno();   
    this.aluno.aluno_nome=this.AlunoNome.value;
    this.save();
  }

  

  save() {
    this.alunoservice.createAluno(this.aluno)
      .subscribe(data => console.log(data), error => console.log(error));
    this.aluno = new Aluno();
  }

  get AlunoNome(){
    return this.alunosaveform.get('aluno_nome');
  }

  addAlunoForm(){
    this.sucessSubmitted = false;
    this.submitted=false;
    this.alunosaveform.reset();
  }
}
