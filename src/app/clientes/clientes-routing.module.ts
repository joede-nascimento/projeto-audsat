import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FichaClienteComponent } from './ficha-cliente/ficha-cliente.component';

const routes: Routes = [

  { path: '', component: ListarComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/:id', component: CadastroComponent },
  { path: 'ficha/:id', component: FichaClienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
