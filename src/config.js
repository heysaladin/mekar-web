require('babel-polyfill');

const configEnvironment = require('../config/environment.json');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || '0.0.0.0',
  apiPort: process.env.APIPORT,
  // apiHost: configEnvironment.APIHOST,
  // apiPort: configEnvironment.APIPORT,
  apiPrefix: configEnvironment.APIPREFIX,
  apiEndpoint: `${configEnvironment.APIHOST}:${configEnvironment.APIPORT}${configEnvironment.APIPREFIX}`,
  secretKey: configEnvironment.SECRETKEY,
  appUploader: configEnvironment.VENDOR.amazon.s3,
  appPinjamKontrak: configEnvironment.PINJAM_KONTRAK,
  appBaseUrl: configEnvironment.BASEURL,
  app: {
    title: 'Mekar Mainsite',
    description: 'Website for Mekar.co.id',
    copyright: '© 2017 Mekar Generator',
    head: {
      titleTemplate: '%s | Mekar Mainsite',
      meta: [
        { name: 'description', content: 'Website for Mekar.co.id' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'React Redux Example' },
        { property: 'og:image', content: 'https://mekar.co.id/favicon.ico' },
        { property: 'og:locale', content: 'id_ID' },
        { property: 'og:title', content: 'Mekar Mainsite' },
        { property: 'og:description', content: 'Website for Mekar.co.id' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@mekarindonesia' },
        { property: 'og:creator', content: 'Mekar Dev' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    },
    social: {
      facebook: {
        name: 'Facebook',
        url: 'https://www.facebook.com/Mekar.ID',
        sharerUrl: 'https://facebook.com/sharer.php'
      },
      instagram: {
        name: 'Instagram',
        url: 'https://www.instagram.com/mekarindonesia'
      },
      twitter: {
        name: 'Twitter',
        url: 'https://twitter.com/mekarindonesia',
        username: 'mekarindonesia',
        sharerUrl: 'https://twitter.com/intent/tweet'
      },
      youtube: {
        name: 'Youtube',
        url: 'https://www.youtube.com/channel/UCGd8BUjSqrVZcTrvB8IlkUA'
      }
    },
    hotline: {
      url: 'https://mekar.co.id',
      email: {
        label: 'cs@mekar.co.id',
        value: 'cs@mekar.co.id'
      },
      phone: {
        label: '021 2750 6800',
        value: '+622127506800'
      }
    },
    carrier: {
      to: 'careers@mekar.co.id',
      cc: 'febri@mekar.co.id',
      subject: '[Karier Mekar.co.id] ',
      body: 'Sisipkan CV dan Tulis lamaran Anda disini'
    }
  }
}, environment);
