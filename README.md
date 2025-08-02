# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                     | Action                                           |
| :-------------------------- | :----------------------------------------------- |
| `npm install`               | Installs dependencies                            |
| `npm run dev`               | Starts local dev server at `localhost:4321`      |
| `npm run build`             | Build your production site to `./dist/`          |
| `npm run preview`           | Preview your build locally, before deploying     |
| `npm run astro ...`         | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help`   | Get help using the Astro CLI                     |
| `npm run test:visual`       | Run visual regression tests with Playwright      |
| `npm run test:visual:local` | Run visual tests locally with LambdaTest         |

## 🎨 Visual Testing

This project includes visual regression testing with LambdaTest SmartUI. Tests automatically run when pushing to the `staging` branch or creating pull requests.

### Setup

1. Add LambdaTest credentials to GitHub Secrets:
   - `LT_USERNAME`
   - `LT_ACCESS_KEY`
   - `SMARTUI_PROJECT_TOKEN`

2. For local testing:
   ```bash
   export LT_USERNAME="your_username"
   export LT_ACCESS_KEY="your_access_key"
   export SMARTUI_PROJECT_TOKEN="your_project_token"
   npm run test:visual:local
   ```

See [Visual Testing Documentation](./docs/VISUAL_TESTING.md) for detailed setup and usage instructions.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
