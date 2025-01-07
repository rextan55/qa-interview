module.exports = {
  apps: [
    {
      name: 'ui',
      script: 'pnpm chess-ui:serve',
      instance: 1,
    },
    {
      name: 'server',
      script: 'pnpm chess-backend:serve',
      instance: 1,
    },
  ],
};
