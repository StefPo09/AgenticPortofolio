import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Stefan Popa — Independent Developer',
    short_name: 'Stefan Popa',
    description: 'A portfolio of thoughtful digital products and useful software.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#10100f',
    theme_color: '#10100f',
  };
}
