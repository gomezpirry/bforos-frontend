// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serviceUrl: 'http://localhost:3000',
  clientId: 'APP-WT2P3CALSH158B05',
  githubClientId: '4e6355f193093178a78e',
  githubClientSecret: '3a639cdb94d830043a8c3e8e247cbe6a6d5ab41d',
  githubApi: "https://github.com/login/oauth/access_token",
  githubUserApi: "https://api.github.com/user",
  orcidUrl: 'https://sandbox.orcid.org/oauth/token',
  orcidClientId: 'APP-WT2P3CALSH158B05',
  orcidClientSecret: '1823fac6-14e9-4a70-a4aa-f48ba620f332',
  redirectUrl: 'localhost:4200/login',
  orcidUserUrl: 'https://api.sandbox.orcid.org/v2.1/'

};
