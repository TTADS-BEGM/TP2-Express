import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { PartidosComponent } from './partidos/partidos.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DetallePartidoComponent } from './detalle-partido/detalle-partido.component';
import { RouterModule }   from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    PartidosComponent,
    FooterComponent,
    HeaderComponent,
    DetallePartidoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'detalle/:id',
        component: DetallePartidoComponent
      },
      {
        path: '',
        redirectTo: '/principal',
        pathMatch: 'full'
      },
      {
        path: 'principal',
        component: PartidosComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
