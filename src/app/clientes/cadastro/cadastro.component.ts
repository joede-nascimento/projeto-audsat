import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ClientesService } from '../../shared/clientes.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  id: number = this.actRouter.snapshot.params.id;
  formulario: FormGroup;
  resultadoCep: any = {};
  msg: string = '';
  nomeCliente: string = '';
  nomeBtn: string = 'Cadastrar';
  estadoMsgSucess: string = "adicionado";
  estadoMsgError: string = "adicionar";
  cliente: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private actRouter: ActivatedRoute,

  ) { }



  ngOnInit() {

    if(this.id){
      this.nomeBtn = "Editar";
      this.estadoMsgSucess = "atualizado";
      this.estadoMsgError = "alterar";
      this.buscarUmCliente();
    }else{
      this.nomeBtn = "Cadastrar";
      this.estadoMsgSucess = "adicionado";
      this.estadoMsgError = "adicionar";
    }

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null,Validators.required],
      telefone: [null, Validators.required],
      cep: [null, Validators.required],
      status: ['ativo'],
      logradouro: [null],
      bairro: [null],
      cidade: [null],
      estado: [null]
    });

   
  }


  buscarUmCliente(){

    this.clientesService.getUmcliente(this.id)
    .subscribe(
      data => {
        this.cliente = data;
        this.formulario.patchValue({
          
          nome: this.cliente.nome,
          email: this.cliente.email,
          telefone: this.cliente.telefone,
          cep: this.cliente.cep
        });
        this.resultadoCep.logradouro = this.cliente.logradouro;
        this.resultadoCep.bairro = this.cliente.bairro;
        this. resultadoCep.localidade = this.cliente.cidade;
        this.resultadoCep.uf = this.cliente.estado;
      },
      error => {
        console.error(error);
        this.cliente = {};
           }
    );
  }



  buscaCep(){

    if(this.formulario.get('cep').value != ''){
      this.clientesService.getCep(this.formulario.get('cep').value).subscribe(
        data => {
          
          this.resultadoCep = data;
          this.formulario.patchValue({
            logradouro: this.resultadoCep.logradouro,
            bairro: this.resultadoCep.bairro,
            cidade: this.resultadoCep.localidade,
            estado: this.resultadoCep.uf
          });
        },
        error => {
          console.error(error);
        }
      );
    }
    
    
  }


  cadastrarCliente(){

    if(this.id){
      //atualizar cliente
      this.clientesService.atualizarCliente(this.id, this.formulario.value)
      .subscribe(
        data => {
          this.nomeCliente = this.formulario.get('nome').value;
          this.msg = 'success';
  
        },
        error => {
          console.error(error);
          this.nomeCliente = '';
          this.msg = 'error';
        }
      );
      
    }else{
      //Cadastrando cliente
      this.clientesService.criarcliente(this.formulario.value)
      .subscribe(
        data => {
          this.nomeCliente = this.formulario.get('nome').value;
          this.msg = 'success';
  
        },
        error => {
          this.nomeCliente = '';
          this.msg = 'error';
        }
      );
    }


  }

  mostraErro(campo){
    return campo.invalid && campo.touched
  }

}
