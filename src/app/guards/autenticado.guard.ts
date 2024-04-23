import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

export const autenticadoGuard: CanMatchFn = (route, segments) => {

  const router = inject(Router)
  const spotifyService = inject(SpotifyService);
  const token = localStorage.getItem('token');

  if(!token){
    naoAutenticado(router);
  }

  return new Promise(async (res) => {
    const usuarioCriado = spotifyService.inicializarUsuario();
    if(usuarioCriado)
      res(true);
    else
      res(naoAutenticado(router));
  })

  return true;


};


function naoAutenticado(router : Router) {
  localStorage.clear();
  router.navigate(['login']);
  return false;
}

