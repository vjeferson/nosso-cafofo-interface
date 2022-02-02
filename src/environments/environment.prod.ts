export const environment = {
    production: true,
    apiUrl: (window as any)._env.apiUrl,
    debug: (window as any)._env.debug || false,
    appIdFacebook: (window as any)._env.appIdFacebook,
    appSecretFacebook: (window as any)._env.googleClientId,
    googleClientId: (window as any)._env.googleClientId
};
