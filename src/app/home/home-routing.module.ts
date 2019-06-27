import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesModule } from '../clientes/clientes.module';
import { EditarComponent } from './editar/editar.component';
 import { ListarComponent } from '../clientes/listar/listar.component';

const routes: Routes = [

  { path: '', component: ListarComponent }
];

@NgModule({
  imports: [ClientesModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
