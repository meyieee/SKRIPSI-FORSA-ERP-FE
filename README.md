# FORSA (Control File - Supply Chain Management) v1.0.0 | Front-End

This project was created via Metronic & bootstrapped with [Create React App](https://github.com/facebook/create-react-app) TypeScript.

## Getting Started

- [Code Rules & Guidelines](#code-rules--guidelines)
- [Installation](#installation)
- [Files Structure](#files-structure)
- [Learn More](#learn-more)

## Code Rules & Guidelines

1. Use pascal case to name a `.tsx` file. Example: `PriorityTable.tsx`
2. Use camel case to name a `.ts` file. Example: `_models.ts`
3. Use kebab case to name a folder. Example: `cf-priority`
4. Indent spaces 2
5. Import hierarchy:
  - npm packages/webpack (react at the top)
  - Metronic components
  - general personal components
  - in-folder components (_models & _requests first, respectively)
6. API hierarchy: GET, POST, PUT, DELETE
7. Define prop types, avoid using "any" unless it's absolutely necessary
8. Folder name format: **CATEGORY (MOST TO LEAST GENERAL)** - MODULE NAME. Example: `ops-asset-mgt` or `cf-ops-reading`
9. File name format: **MODULE NAME - FUNCTIONALITY**. Example `PriorityTable.tsx` or `PurchaseOrderAdd.tsx`
10. Order of logic based on order of UI functionality. Example: CF functionality order: fetch data, search filter, status filter pagination
11. Unless required, do not modify Metronic components. Keep Metronic & personal components separate.
12. Be mindful of code styling (indentation, white space, etc.)
13. Practice commenting & documenting when coding
14. Regularly "git pull" to avoid code conflicts
15. Do not redeclare API endpoints if you want to use them in other modules. Simply import them from their respective modules.

### /module Folder Structure:
  - /add-edit     ==> form, add, & edit components
  - /core         ==> _models (data type & validation schema) & _requests (API requests)
  - /components   ==> module-related components (modals, etc.)
  - /Wrapper.tsx  ==> component wrapper (if any)
  - /Table.tsx    ==> module table component
  - /Page.tsx     ==> module page routes

### /coming-soon Folder Structure:
  - /routes       ==> for the routes
  - /ui           ==> for the pages

## Installation

Please follow the installation instructions from [Metronic's official documentation page](https://preview.keenthemes.com/metronic8/react/docs/docs/quick-start).

## Files Structure

| Path | Description |
|--|--|
| **/build** | The built output. Run command `npm build` to build it. |
| **/node_modules** | The `package.json` file in the app root defines what libraries will be installed into `node_modules/` when you run `npm install`. |
| **/public** | Folder contains the index.html file so you can tweak it, Change `<title>`, insert additional `<link>` and `<script>` tags. For more details check [official documentation](https://create-react-app.dev/docs/using-the-public-folder/#docsNav). Also in '/public/media' folder you able to find all images/icons/SVGs and `Splash Screen` styles. |
| **/src** | Your app lives in the src folder. All React components, styles and anything else your app needs go here. |
| **/src/_metronic** | Metronic template. Do not modify this folder unless it is necessary. |
| **/src/_metronic/assets** | Contains the Metronic common parts: ts(Layout ts helpers), plugins(icons plugins), sass(common style structure). |
| **/src/_metronic/helpers** | Contains shared utils which are used by all application modules. |
| **/src/_metronic/partials** | Contains shared components which are used by all application modules. |
| **/src/_metronic/layout** |  |
| **/src/_metronic/layout/core** | Contains Layout core logic which is based on React.Context. Also includes layout configuration file(DefaultThemeConfig.ts). |
| **/src/_metronic/layout/components** | Contains Layout components (Layout, Header, Aside, Footer...). |
| **/src/app** | Created by the development team. |
| **/src/app/__tests__** | Include test files and folders to store unit tests. |
| **/src/app/coming-soon** | Contains application pages that are yet to be made into modules |
| **/src/app/components** | This folder holds reusable UI components. |
| **/src/app/custom-hooks** | Store custom React hooks that encapsulate reusable logic. |
| **/src/app/functions** | Place utility functions, helper classes, or modules that provide common functionality across the project. |
| **/src/app/jsons** | Keep constant values, enums, or configuration files. |
| **/src/app/modules** | Contains application lazy modules |
| **/src/app/routing** |  |
| **/src/app/routing/AppRoutes.tsx** | Routes entry point. |
| **/src/app/routing/PrivateRoutes.tsx** | Private routes entry point. (Pages are unavailable for unauthorized users) |
| **/src/app/App.tsx** | is the application entry point. Also contain main Routing. Application routing is based on [React Routing](https://reacttraining.com/react-router/web). |
| **/src/index.tsx** | The TypeScript entry point. |
| **/package.json** | Contains meta data about app or module. Most importantly, it includes the list of dependencies to install from npm when running npm install. |

## Learn More

You can learn more in the [Metronic documentation and its listed references](https://preview.keenthemes.com/metronic8/react/docs/docs/references).