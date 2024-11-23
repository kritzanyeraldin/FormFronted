# React + TypeScript + Vite

## Requisitos previos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas en tu sistema:

- **Node.js**: Versión 16 o superior. [Descargar Node.js](https://nodejs.org/)
- **pnpm**: Versión 7 o superior. Si no lo tienes instalado, puedes hacerlo ejecutando:

  ```bash
  npm install -g pnpm
  ```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/kritzanyeraldin/FormFronted.git
   cd FormFronted
   ```

2. Instala las dependencias del proyecto con **pnpm**:

   ```bash
   pnpm install
   ```

## Iniciar el servidor de desarrollo

Una vez instaladas las dependencias, inicia el servidor de desarrollo local con el siguiente comando:

```bash
pnpm dev
```

Esto abrirá automáticamente la aplicación en tu navegador, normalmente en `http://localhost:5173`.

---

¡Ahora estás listo para comenzar a desarrollar! 🚀
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
