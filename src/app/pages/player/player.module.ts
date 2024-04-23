import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArtistaItemImagemComponent } from 'src/app/components/artista-item-imagem/artista-item-imagem.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { BuscasRecentesComponent } from 'src/app/components/buscas-recentes/buscas-recentes.component';
import { CardArtistasComponent } from 'src/app/components/card-artistas/card-artistas.component';
import { PainelDireitoComponent } from 'src/app/components/painel-direito/painel-direito.component';
import { PainelEsquerdoComponent } from 'src/app/components/painel-esquerdo/painel-esquerdo.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { RodapeUsuarioComponent } from 'src/app/components/rodape-usuario/rodape-usuario.component';
import { TopArtistaComponent } from 'src/app/components/top-artista/top-artista.component';
import { TopArtistasComponent } from 'src/app/components/top-artistas/top-artistas.component';
import { ArtistasComponent } from '../artistas/artistas.component';
import { HomeComponent } from '../home/home.component';
import { ListaMusicasComponent } from '../lista-musicas/lista-musicas.component';
import { PesquisarComponent } from '../pesquisar/pesquisar.component';
import { PlayerComponent } from './player.component';
import { PlayerRotas } from './player.routes';



@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistaComponent,
    PainelDireitoComponent,
    BuscasRecentesComponent,
    TopArtistasComponent,
    ArtistaItemImagemComponent,
    PlayerCardComponent,
    ListaMusicasComponent,
    BannerComponent,
    ArtistasComponent,
    CardArtistasComponent,
    PesquisarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRotas),
    FontAwesomeModule,
    FormsModule
  ]
})
export class PlayerModule { }
