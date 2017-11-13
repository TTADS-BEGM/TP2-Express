import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {

  urlActivos: string = 'http://localhost:3000/api/partidos';
  partidos;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
       this.http.get(this.urlActivos).subscribe(data => {
      // Read the result field from the JSON response.
      this.partidos = data;
    });
  }
  
}
