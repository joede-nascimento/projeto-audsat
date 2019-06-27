import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ClientesService } from '../../shared/clientes.service';
import { Subscriber } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  formulario: FormGroup;
  displayedColumns: string[] = ['nome', 'email', 'cep', 'telefone', 'status'];
  dataSource: any = [];
  clientes: any = [];
  resultsLength = 0;
  urlPagina: string = window.location.href;
  

  constructor(
    private formBuilder: FormBuilder,
    private service: ClientesService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.listarClientes();
    this.dataSource.paginator = this.paginator

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null,Validators.required],
      cep: [null, Validators.required]
    });


  }


  listarClientes(){
    this.service.getClientes()
    .subscribe(
      data => {
        this.dataSource = data;
        this.clientes = data;
        this.resultsLength = this.clientes.length;
      },
      error => {
        console.error(error);
      }
    );
  }

  buscarCliente(){
    console.log("entro no busca cliente");

    this.listarClientes();

    for( let i = 0; i < this.clientes.length; i++){
      if(this.clientes[i].nome == this.formulario.get('nome').value 
      && this.clientes[i].email == this.formulario.get('email').value
      && this.clientes[i].cep == this.formulario.get('cep').value){
      
      this.router.navigate(['/clientes/ficha',this.clientes[i].id]);
      }else{
        console.log("nao acho");
      }
    }

  }

  mostraErro(campo){
    return campo.invalid && campo.touched
  }

}
