import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-partido',
  templateUrl: './detalle-partido.component.html',
  styleUrls: ['./detalle-partido.component.css']
})
export class DetallePartidoComponent implements OnInit {

  urlPartido: string = 'http://localhost:3000/api/partidos/';
  partido;

  constructor(private http: Http,
    private route: ActivatedRoute) { }

  ngOnInit() {
  /*    var url = this.urlPartido+'PARAMETRO DEL ID';
     //Falta poder llamar a la api enviando el parametro del id del partido
     this.http.get(url).subscribe(data => {
      // Read the result field from the JSON response.
      this.partido = data;
    }); */
    this.route.params.subscribe(params => {
      this.getPartido(params['id'])
      .subscribe(
          partido => this.partido = partido, //Bind to view
           err => {
               // Log errors if any
               console.log(err);
           });
    });


    
  }

  getPartido(id: any){
    return this.http.get(this.urlPartido+id)
                    // ...and calling .json() on the response to return data
                    .map((res:Response) => res.json()) 
                    //...errors if any
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
