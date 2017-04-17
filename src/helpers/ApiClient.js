import superagent from 'superagent';
// import cookie from 'js-cookie';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

// function formatUrl(path) {
//   const adjustedPath = path[0] !== '/' ? `/${path}` : path;
//   if (__SERVER__) {
//     // Prepend host and port of the API server to the path.
//     return `http://${config.apiHost}:${config.apiPort + adjustedPath}`;
//   }
//   // Prepend `/api` to relative URL, to proxy to API server.
//   return `/api${adjustedPath}`;
// }

function formatUrl(path) {
  const adjustedPath = path[0] !== '/'
    ? `/${path}`
    : path;
  return config.apiEndpoint + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data, headers, files, fields } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        request.type('form');

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (headers) {
          request.set(headers);
        }

        if (this.token) {
          request.set('Authorization', `Bearer ${this.token}`);
        }

        if (files) {
          files.forEach(file => request.attach(file.key, file.value));
        }

        if (fields) {
          fields.forEach(item => request.field(item.key, item.value));
        }

        // Attach token & userId (Takeout after featherjs run)
        // const token = cookie.get('pinjam-token');
        // if (token) {
        //   request.set('Authorization', `Bearer ${token}`);
        //   if (data) {
        //     data.userId = cookie.get('pinjam-id');
        //   }
        // } else if (typeof req !== 'undefined') {
        //   request.set('Authorization', `Bearer ${cookie.get('pinjam-token')}`);
        //   if (data) {
        //     data.userId = req.cookie.get('pinjam-id');
        //   }
        // }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)));
      });
    });
  }

  setJwtToken(token) {
    this.token = token;
  }
}
