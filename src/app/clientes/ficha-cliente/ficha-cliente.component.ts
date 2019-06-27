import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../shared/clientes.service';


@Component({
  selector: 'app-ficha-cliente',
  templateUrl: './ficha-cliente.component.html',
  styleUrls: ['./ficha-cliente.component.css']
})
export class FichaClienteComponent implements OnInit {

  id: number = this.actRouter.snapshot.params.id;
  cliente: any = {};

  constructor(
    private actRouter: ActivatedRoute,
    private clientesService: ClientesService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.buscarUmCliente();
    
  }

  buscarUmCliente(){

    this.clientesService.getUmcliente(this.id)
    .subscribe(
      data => {
        this.cliente = data;
      },
      error => {
        console.error(error);
           }
    );
  }

  editarCliente(){
    console.log('clicou no editar');
    this.router.navigate(['/clientes/cadastro', this.id]);
  }

}
