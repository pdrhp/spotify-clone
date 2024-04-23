import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { IMusica } from 'src/app/Interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrls: ['./lista-musicas.component.scss']
})
export class ListaMusicasComponent implements OnInit, OnDestroy {


  bannerImagemUrl = '';
  bannerTexto = '';

  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();
  playIcone = faPlay;

  title = '';

  subs: Subscription[] = [];

  constructor(
    private activeRouter : ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
    ) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
    console.log('abriu')
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  obterMusicas(){
    const sub = this.activeRouter.paramMap
      .subscribe(async params => {
        const tipo = params.get('tipo');
        const id = params.get('id');
        await this.obterDadosPagina(tipo, id);
      })

      this.subs.push(sub);
  }

  async obterDadosPagina(tipo: string, id: string){
    if(tipo === 'playlist')
      await this.obterDadosPlaylist(id);
    else
      await this.obterDadosArtistas(id);
  }

  async obterDadosPlaylist(playlistId: string){
    const playlist = await this.spotifyService.buscarMusicasPlaylist(playlistId);
    this.definirDadosDaPagina(playlist.nome, playlist.imagemUrl, playlist.musicas, playlist.nome)
  }

  async obterDadosArtistas(artistaId: string){
    const artista = await this.spotifyService.buscarArtistaComMusicas(artistaId);
    this.definirDadosDaPagina(artista.nome, artista.imagemUrl, artista.musicas, artista.nome)
  }

  definirDadosDaPagina(bannerTexto: string, bannerImagemUrl: string, musicas: IMusica[], playlistNome : string){
    this.bannerImagemUrl = bannerImagemUrl;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
    this.title = 'Musicas Playlist: ' + playlistNome;
  }

  obterMusicaAtual(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  async executarMusica(musica: IMusica){
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  obterArtistas(musica : IMusica){
    return musica.artistas.map(artista => artista.nome).join(', ');
  }

}
