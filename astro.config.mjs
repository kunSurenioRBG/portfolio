import { defineConfig } from 'astro/config'

import tunnel from 'astro-tunnel'
import icon from 'astro-icon'
import i18n from '@astrolicious/i18n'
import sitemap from 'astro-sitemap'
// import playformCompress from '@playform/compress'  <-- COMENTADO
// import compressor from 'astro-compressor'          <-- COMENTADO

// https://astro.build/config
export default defineConfig({
  // 1. URL base exacta de tu repositorio
  site: 'https://kunsureniorbg.github.io',
  base: '/porfolio',

  // 2. ESTA ES LA CLAVE: Renombramos la carpeta interna para evitar el guion bajo
  build: {
    assets: 'assets'
  },

  server: {
    host: true
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  compressHTML: false,
  integrations: [
    tunnel(),
    icon(),
    i18n({
      defaultLocale: 'es',
      locales: ['es', 'en'],
      routing: {
        prefixDefaultLocale: false
      }
    }),
    sitemap({
      canonicalURL: 'https://kunsureniorbg.github.io/porfolio',
      lastmod: new Date(),
      createLinkInHead: false,
      xmlns: {
        xhtml: true,
        news: false,
        video: false,
        image: false
      },
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es'
        }
      },
      serialize(item) {
        /* eslint-disable-next-line no-param-reassign */
        item.url = item.url.replace(/\/$/g, '')
        return item
      }
    })
    // playformCompress({ ... }), <--- Desactivado temporalmente
    // compressor()               <--- Desactivado temporalmente
  ]
})
