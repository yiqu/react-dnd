import loadable from '@loadable/component';

export const FilmsLayout = loadable(() => import('../../src/core/FilmsLayout'));
export const FilmsAllLayout = loadable(() => import('../../src/core/all/FilmsAll'));

export const AboutLazy = loadable(() => import('../about/About'));
export const NotFoundLazy = loadable(() => import('../404/NotFound'));
