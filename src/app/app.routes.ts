import { Routes } from "@angular/router";
import { usuarioEstaLogadoResolver } from "./resolvers/usuario-esta-logado.resolver";

export const AppRotas : Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(m => m.PlayerModule),
    // canMatch: [autenticadoGuard],
    resolve: {
      usuarioEstaLogado: usuarioEstaLogadoResolver
    }
  }
]
