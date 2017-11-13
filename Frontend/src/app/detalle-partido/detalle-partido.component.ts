import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-detalle-partido',
  templateUrl: './detalle-partido.component.html',
  styleUrls: ['./detalle-partido.component.css']
})
export class DetallePartidoComponent implements OnInit {

  urlPartido: string = 'http://localhost:3000/api/partidos';
  partido;

  constructor(private http: HttpClient) { }

  ngOnInit() {
     var url = this.urlPartido+'PARAMETRO DEL ID';
     //Falta poder llamar a la api enviando el parametro del id del partido
     this.http.get(url).subscribe(data => {
      // Read the result field from the JSON response.
      this.partido = data;
    });
  }

}
