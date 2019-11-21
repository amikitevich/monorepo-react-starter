# Monorepo with ejected create App

The project uses:

- Lerna
- yarn workspaces
- typescript
- ejected create React App

## Get Started
* clone or download the repository.
* find&replace @project-namespace to your own namespace
* lerna bootstrap
* yarn run:client-app

## Client-App

Typescript Cra with ejected config
rewrited config looks like the code:

```
/* rewrite cra-config */
// commented code if exists
sharedPackages: [path.resolve(__dirname, '../../uikit')],
/* end rewrite cra-config */
```
