import { Routes } from "@angular/router";
import { ArtistasComponent } from "../artistas/artistas.component";
import { HomeComponent } from "../home/home.component";
import { ListaMusicasComponent } from "../lista-musicas/lista-musicas.component";
import { PesquisarComponent } from "../pesquisar/pesquisar.component";
import { PlayerComponent } from "./player.component";

export const PlayerRotas : Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'lista/:tipo/:id',
        component: ListaMusicasComponent
      },
      {
        path: 'artistas',
        component: ArtistasComponent
      },
      {
        path: 'pesquisar',
        component: PesquisarComponent
      }
    ]
  }
]
