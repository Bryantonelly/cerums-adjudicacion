import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SedesService {
  url: String = environment.sistema+"sedes/"
  constructor(private http: HttpClient) { }

  getAdjudicadas(){
    return this.http.get(this.url+"adjudicadas");
  }

  getNoAdjudicadas(){
    return this.http.get(this.url+"noAdjudicadas");
  }

  getFavoritos(){
    return this.http.get(this.url+"favoritos");
  }

  cambiarEstado(estado: number, id: number){
    return this.http.post(this.url+"actualizar/"+estado+"/"+id, null);
  }

  cambiarFavorito(estado: number, id: number){
    return this.http.post(this.url+"actualizarFav/"+estado+"/"+id, null);
  }
}
