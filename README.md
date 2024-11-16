# RoutineHive 🐝📅 | [🇧🇩 বাংলা](./README.BN.md)

A tool to simplify class routines and retake course section selection

## Motive 💡

Our BUBT website combines all class routines into one long page, making it challenging for students to quickly find their specific routine. Additionally, selecting the best retake course section is not easy, as students need to evaluate all sections to find those with the smallest gaps between periods.

## To Do 📋

- [ ] Refactor my messy code.
- [ ] Add a search box in the Course dropdown menu.
- [ ] Sort retake sections by the period gap.
- [ ] Improve error handling with clear messages.
- [ ] Add support for selecting old semester routines.
- [ ] Implement cache support for fallback in case the BUBT website fails.
- [ ] Add unit tests.

## Installation 🛠️

1. **Clone the repository**
   ```bash
   git clone https://github.com/kurtnettle/bubt-routine-hive
   cd bubt-routine-hive
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables:**

   Create a `.env` file in the project root and configure the required variables. The Cloudflare Worker URL is necessary to bypass CORS issues when fetching HTML content.
   ```env
   PUBLIC_BUBT_ROUTINE_URL=https://www.bubt.edu.bd/home/routines
   PUBLIC_PROXY_URL=<YOUR WORKER URL>
   ```

4. **Build and preview the app locally 🚀**
   ```bash
   npm run build
   npm run preview
   ```

## Developing 💻

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building 🔨

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


## Contributing 🤝

I welcome contributions from the community! To contribute, please follow these steps:

1. **Fork the Repository**: Create a personal copy of the repository to work on.
2. **Open an Issue**: If you find a bug or have an idea for a new feature, please open an issue to discuss it.
3. **Submit a Pull Request**: Once you’ve made changes, submit a pull request for review. Ensure your changes are well-tested and adhere to the project’s coding standards.

### Guidelines
- Ensure your code follows the project’s style guide and conventions.
- Provide tests for any new functionality or bug fixes.
- Keep your pull requests focused on a single issue or feature to streamline the review process.

Thank you for contributing to the project! Your efforts help make this a better resource for everyone. ✨


## License 📜

This project is licensed under the **GPLv3 License**. See the [LICENSE](LICENSE) file for full details.

By contributing to this project, you agree that your contributions will be licensed under the GPLv3 License as well.
