import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  private urlApi: string = `${environment.API}/clientes`;

  getClientes() {
    return this.http.get(this.urlApi).pipe(take(1));
  }

  getUmcliente(id){
    return this.http.get(`${this.urlApi}/${id}`).pipe(take(1));
  }

  criarcliente(cliente){
    return this.http.post(this.urlApi, cliente).pipe(take(1));
  }

  atualizarCliente(id, cliente){
    return this.http.put(`${this.urlApi}/${id}`, cliente).pipe(take(1));
  }

  getCep(campoCep){
    //Nova variável "cep" somente com dígitos.
    let cep = campoCep.replace(/\D/g, '');

    if (cep != "") {

      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(take(1));
      }
    }

  }

 
}
