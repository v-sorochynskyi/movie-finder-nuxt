# Movie Finder

A movie discovery app built with Nuxt 3 and TypeScript. Search for films, browse by genre, and explore details — powered by a modern Vue 3 stack.

## Tech stack

- **Nuxt 3** — SSR/SSG framework
- - **TypeScript** — full type safety across the codebase
  - - **Pinia** — state management
    - - **Element Plus** — UI component library
      - - **Tailwind CSS** — utility-first styling
        - - **VueUse** — composable utilities
          - - **i18n** — internationalization support
            - - **Swiper** — touch-friendly carousels
              -
              - ## Getting started
              -
              - ### Prerequisites
              -
              - - Node.js 18+
                - - Yarn
                  -
                  - ### Setup
                  -
                  - ```bash
                    git clone https://github.com/v-sorochynskyi/movie-finder-nuxt.git
                    cd movie-finder-nuxt
                    yarn install
                    ```

                    Copy the environment file and fill in your API key:

                    ```bash
                    cp .env.example .env
                    ```

                    ### Development

                    ```bash
                    yarn dev
                    ```

                    App runs at `http://localhost:3000`

                    ### Production build

                    ```bash
                    yarn build
                    yarn preview
                    ```

                    ### Type check & lint

                    ```bash
                    yarn type-check
                    yarn lint
                    ```

                    ## Project structure

                    ```
                    ├── components/     # Reusable Vue components
                    ├── composables/    # Shared composition functions
                    ├── pages/          # File-based routing
                    ├── stores/         # Pinia state stores
                    ├── types/          # TypeScript type definitions
                    ├── i18n/           # Localization files
                    └── layouts/        # Page layout wrappers
                    ```Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment).
