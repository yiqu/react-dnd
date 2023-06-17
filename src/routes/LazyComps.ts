import loadable from '@loadable/component';

export const PokemonsLayout = loadable(() => import('../core/PokemonsLayout'));
export const PokemonsAllLayout = loadable(() => import('../core/all/PokemonsAll'));

export const AboutLazy = loadable(() => import('../about/About'));
export const NotFoundLazy = loadable(() => import('../404/NotFound'));
