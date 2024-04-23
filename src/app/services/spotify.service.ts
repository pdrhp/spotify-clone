import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Spotify from 'spotify-web-api-js';
import { SpotifyArtistaParaArtista, SpotifyMusicaParaMusica, SpotifyPlaylistParaPlaylist, SpotifySinglePlaylistParaPlaylist, SpotifyUserParaUsuario } from '../Common/spotifyHelper';
import { IArtista } from '../Interfaces/IArtista';
import { IMusica } from '../Interfaces/IMusica';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { IUsuario } from '../Interfaces/IUsuario';
import { SpotifyConfiguration } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  spotifyApi : Spotify.SpotifyWebApiJs = null;
  usuario : IUsuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario(){
    if(!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if(!token)
      return false;

    try {

      this.definirAcessToken(token);
      await this.obterSpotifiyUsuario();
      return !!this.usuario;

    } catch (error) {
      return false;
    }
  }

  async obterSpotifiyUsuario(){
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);

    }



  obterUrlLogin() {
    const authEndPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if(!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAcessToken(token : string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]>{
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {offset, limit});
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarMusicasPlaylist(playlistId : string, offset = 0, limit = 50){
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if(!playlistSpotify)
      return null;

    const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify);

    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, {offset, limit});

    playlist.musicas = musicasSpotify.items.map(musica => SpotifyMusicaParaMusica(musica.track as SpotifyApi.TrackObjectFull));

    return playlist;
  }

  async buscarArtistaComMusicas(artistaId : string, offset = 0, limit = 50){
    const artistaSpotify = await this.spotifyApi.getArtist(artistaId);

    if(!artistaSpotify)
      return null;

    const artista = SpotifyArtistaParaArtista(artistaSpotify);

    const musicasSpotify = await this.spotifyApi.getArtistTopTracks(artistaId, 'BR', {offset, limit});

    artista.musicas = musicasSpotify.tracks.map(musica => SpotifyMusicaParaMusica(musica));

    return artista;
  }

  async buscarTopArtistas(limit = 10):Promise<IArtista[]>{
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit=50): Promise<IMusica[]>{
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musicas.items.map(x => SpotifyMusicaParaMusica(x.track));
  }

  async executarMusica(musicaId : string){
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual() : Promise<IMusica>{
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyMusicaParaMusica(musicaSpotify.item);
  }

  async voltarMusica(){
    this.spotifyApi.skipToPrevious();
  }

  async proximaMusica(){
    this.spotifyApi.skipToNext();
  }

  async playMusica(){
    this.spotifyApi.play();
  }

  async PausaMusica(){
    this.spotifyApi.pause();
  }

  async PesquisarMusicas(pesquisa : string): Promise<IMusica[]>{
    const musicas = await this.spotifyApi.searchTracks(pesquisa);

    if(!musicas){
      return null;
    }

    return musicas.tracks.items.map(SpotifyMusicaParaMusica);
  }

  async PesquisarArtistas(pesquisa : string): Promise<IArtista[]>{
    const artistas = await this.spotifyApi.searchArtists(pesquisa);
    console.log(artistas);

    if(artistas.artists.items[0].images === undefined){
      return null;
    }

    return artistas.artists.items.map(SpotifyArtistaParaArtista);
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}



