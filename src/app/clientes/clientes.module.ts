import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListarComponent } from './listar/listar.component';
import { MaterialModule } from '../material/material.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FichaClienteComponent } from './ficha-cliente/ficha-cliente.component';

@NgModule({
  declarations: [ListarComponent, CadastroComponent, FichaClienteComponent],
  imports: [
    ClientesRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [
    ListarComponent
  ]
})
export class ClientesModule { }
