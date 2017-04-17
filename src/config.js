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
    title: 'Pinjam Mainsite',
    description: 'Website for Pinjam.co.id',
    copyright: '© 2017 Gadai Pinjam Indonesia',
    head: {
      titleTemplate: '%s | Pinjam Mainsite',
      meta: [
        { name: 'description', content: 'Website for Pinjam.co.id' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'React Redux Example' },
        { property: 'og:image', content: 'https://pinjam.co.id/favicon.ico' },
        { property: 'og:locale', content: 'id_ID' },
        { property: 'og:title', content: 'Pinjam Mainsite' },
        { property: 'og:description', content: 'Website for Pinjam.co.id' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@pinjamindonesia' },
        { property: 'og:creator', content: 'Pinjam Dev' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    },
    social: {
      facebook: {
        name: 'Facebook',
        url: 'https://www.facebook.com/Pinjam.ID',
        sharerUrl: 'https://facebook.com/sharer.php'
      },
      instagram: {
        name: 'Instagram',
        url: 'https://www.instagram.com/pinjamindonesia'
      },
      twitter: {
        name: 'Twitter',
        url: 'https://twitter.com/pinjamindonesia',
        username: 'pinjamindonesia',
        sharerUrl: 'https://twitter.com/intent/tweet'
      },
      youtube: {
        name: 'Youtube',
        url: 'https://www.youtube.com/channel/UCGd8BUjSqrVZcTrvB8IlkUA'
      }
    },
    hotline: {
      url: 'https://pinjam.co.id',
      email: {
        label: 'cs@pinjam.co.id',
        value: 'cs@pinjam.co.id'
      },
      phone: {
        label: '021 2750 6800',
        value: '+622127506800'
      }
    },
    carrier: {
      to: 'careers@pinjam.co.id',
      cc: 'febri@pinjam.co.id',
      subject: '[Karier Pinjam.co.id] ',
      body: 'Sisipkan CV dan Tulis lamaran Anda disini'
    }
  }
}, environment);
