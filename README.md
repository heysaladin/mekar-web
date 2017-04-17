# Mekar Website

Workspace Frontend for Mekar Website


## Composition
- Express
- Redux
- ReactJS
- Webpack

## Third-party Components

- Material UI : <https://github.com/callemall/material-ui>
- Flex : <https://github.com/tcoopman/react-flexbox>
- Form : <https://github.com/christianalfoni/formsy-react>
- Modal : <https://github.com/marcio/react-skylight>
- Icons : <https://github.com/gorangajic/react-icons>
- Maps : <https://github.com/istarkov/google-map-react>
- CSS : <https://github.com/js-next/react-style>
- Scroll: <https://github.com/fisshy/react-scroll> 
- Validator : <https://github.com/chriso/validator.js>
- [CLONED] Carousel : <https://github.com/xiaolin/react-image-gallery>
- [CLONED] Lightbox : <https://github.com/abhirathore2006/react-image-lightbox-universal>
- [CLONED] Dropzone : <https://github.com/felixrieseberg/React-Dropzone-Component>


## Usage

**Install the dependencies:**

`npm install`

**Make environment config from .dist:**

`cp config/environment.json.dist config/environment.json`

**Run on Development mode:**

`npm run dev`

**Test:**

`npm run test`

**Building and Preview Running Production Server:**

```
#!shell

npm run build
npm run start

```


**Run on Production Server:**
 
```
#!shell

npm install pm2 -g # skip this if you've already install pm2

npm run online # for online
npm run reonline # for reonline
npm run offline # for offline
```
 



## Extended Components Roadmap
- Link
- TextField
- SelectField


## Note
Cloned from React Redux Universal Hot Example <https://github.com/erikras/react-redux-universal-hot-example>