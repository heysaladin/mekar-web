import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import {
  Link
} from 'react-router';
import {
  reduxForm
} from 'redux-form';
import {
  connect
} from 'react-redux';
import {
  asyncConnect
} from 'redux-connect';
import * as dataActions from 'redux/modules/public/categories';

import sampleImage from './img/mekar.jpg';
import SearchBox from './SearchBox';
import styles from './pagesStyles';

import {
  Container,
  Header,
  Spacer,
  Loader,
  Landing,
  Content
} from '../../UI';
import Layout from '../../App/Layout';

// Inisialiasi action
const { load: loadData } = dataActions;

@injectSheet(styles)

@asyncConnect([
  {
    deferred: true,
    promise: ({ store: {
        dispatch
      } }) => {
      const promises = [];

      /**
       * Request data
       */
      promises.push(dispatch(loadData()));

      return Promise.all(promises);
    }
  }
])
@connect(state => ({
  data: state.categories.data,
  loading: state.categories.loading
}), {
  ...dataActions
})

@reduxForm({ form: 'formData', formKey: 'formData' })

export default class Categories extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool
  }

  static defaultProps = {
    data: null,
    loading: false
  }

  state = {
    dataAsState: [],
    collection: null,
    collectionNoImage: null
  }

  componentWillMount = () => {
    const { load } = this.props;
    const that = this;
    setTimeout(() => {
      load().then(result => {
        that.setState({
          dataAsState: result });
      });
    }, 100);
  }

  componentDidMount = () => {
    const { data } = this.props;
    if (data) {
      this.setState({ dataAsState: data });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ dataAsState: nextProps.data });
  }

  componentWillUnmount = () => {
    console.log('clear');
  }

  /**
   * Melakukan pengecekan teks setiap ada perubahan input pada inputText
   * Jika teks (karakter) yang di-input-kan memiliki kesamaan dengan data
   * daftar data akan muncul sesuai teks yang diinputkan
   *
   * @param {string} searchName
   * @returns {object}
   * @memberOf PartnersAddress
   */
  onSearch = (searchName) => {
    const { data } = this.props;
    if (data) {
      setTimeout(() => {
        const resultPartners =
        this.state.dataAsState
          .filter(mitra => mitra.title.toLowerCase().includes(searchName.toLowerCase())
        );
        if (searchName !== '') {
          this.setState({ dataAsState: resultPartners });
        } else {
          this.setState({ dataAsState: data });
        }
      }, 100);
    }
  }

  /**
   * Menentukan Layout dengan atau tanpa gambar
   */
  getLayout = () => {
    const { data } = this.props;

    if (data) {
      let layoutSelected = false;
      data.map(
        (dataMap) => {
          if (
          this.filterDot(dataMap.categoryId) === '.' ||
          this.filterDot(dataMap.name) === '.'
          ) {
            layoutSelected = true;
          } else {
            layoutSelected = false;
          }
          return layoutSelected;
        });
      return layoutSelected;
    }
  }

  /**
   * Memeriksa data apakah mempunyai data gambar (seperti gambar) atau tidak
   */
  filterDot = (param) => {
    let valueDot = '';
    if (typeof param === 'string') {
      valueDot = (param.substr(param.length - 4)).charAt(0);
    }
    return valueDot;
  };

  render() {
    const {
      loading,
      sheet: {
        classes
      }
    } = this.props;

    let collection;
    let collectionNoImage;

    if (this.getLayout() === false) {
      collection = [];
      collectionNoImage = this.state.dataAsState;
    } else if (this.getLayout() === true) {
      collection = this.state.dataAsState;
      collectionNoImage = [];
    }

    return (
      <div>
        <div className={classes.openingArea}></div>
        <Container className={classes.contentWrapper}>
          <Helmet
            title="Categories" />
          <Spacer />
          <Header primaryText="Categories" />
          <SearchBox onSearch={this.onSearch} />
          <span className={classes.verticalLine}></span>
          <div>
            {/* Tampilkan loader jika data sedang di load */}
            {loading && <Loader />}
            {/* Tampil jika data kosong */}
            {(!collection || !collectionNoImage) && <Landing small>Belum ada informasi</Landing>}
            <Spacer />
            {/* Tampilan riwayat taksiran */}
            {!loading && collection && collection.length > 0 &&
              <div className={classes.listWrapper} zDepth={1}>
                {collection.map(
                  (mitra) => <div key={`mitra-${mitra.categoryId}`} className={classes.gridItem}>
                    <Link href={`/details/${mitra.categoryId}`}>
                      <div className={classes.gridCard}>
                        <div className={classes.gridContentWrapper}>
                          <div className={classes.gridImageWrapper}>
                            <img className={classes.gridImage} src={`${sampleImage}`} alt="Mekar" />
                          </div>
                          <h4 className={classes.gridTitle}>{mitra.name}</h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                  )}
              </div>
            }
            {!loading && collectionNoImage && collectionNoImage.length > 0 &&
              <div className={classes.listWrapper} zDepth={1}>
                {collectionNoImage.map(
                  (mitra) => <div key={`mitra-${mitra.categoryId}`} className={classes.gridItem}>
                    <Link href={`/details/${mitra.categoryId}`}>
                      <div style={{
                        width: 280,
                        position: 'relative',
                        background: 'white',
                        boxShadow: '0 0 5px rgba(0,0,0,.25)',
                        borderRadius: 8,
                        minHeight: 65
                      }}>
                        <div style={{
                          left: 0,
                          width: 252,
                          right: 0,
                          position: 'absolute',
                          margin: '0 auto'
                        }}>
                          <div style={{
                            width: 252,
                            overflow: 'hidden',
                            borderRadius: 8
                          }}>
                            <img style={{
                              width: 'auto',
                              height: 'inherit',
                              margin: '0 auto',
                              display: 'none'
                            }} src={`${sampleImage}`} alt="Mekar" />
                          </div>
                          <h4 className={classes.gridTitle}>{mitra.name}</h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                  )}
              </div>
            }
            {!loading && collection && collection.length === 0 && collectionNoImage && collectionNoImage.length === 0 && <Content style={Layout.textCenter}>
              <h4 style={{ display: 'block', textAlign: 'center' }}>The content you are looking for does not exist.<br /> Please search with other keywords!</h4>
              </Content>
            }
            <Spacer />
          </div>
          <Spacer />
        </Container>
      </div>
    );
  }
}
