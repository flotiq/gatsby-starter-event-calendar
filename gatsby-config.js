const appConfig = require('./appConfig');
require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    {
      "resolve": "gatsby-source-flotiq",
      "options": {
        "baseUrl": process.env.GATSBY_FLOTIQ_BASE_URL,
        "authToken": process.env.FLOTIQ_API_KEY,
        "forceReload": false,
        "includeTypes": ['event']
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/media`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-event-calendar',
        short_name: 'starter-calendar',
        start_url: '/',
        background_color: appConfig.theme.background,
        theme_color: appConfig.theme.brand,
        display: 'minimal-ui',
        icon: 'media/icon.svg',
      },
    },
    'gatsby-plugin-offline',
  ],
};
