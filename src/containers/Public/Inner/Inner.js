import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import { Link } from 'react-router';
import {
  reduxForm
} from 'redux-form';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import * as articlesActions from 'redux/modules/public/articles';
import dataPawnSimulation from 'data/pawn/simulation.json';
import listPartners from 'data/branch.json';
import SearchBox from './SearchBox';
import sampleImage from './img/mekar.jpg';
import { Container, Header,
  Spacer, Loader, Landing } from '../../UI';
import Layout from '../../App/Layout';

const styles = {
  openingArea: {
    background: '#2a6d5e',
    width: '100%',
    height: 150,
    marginTop: -50,
    backgroundImage: 'linear-gradient(120deg,#447f2c 0%,#2a6d5e 100%)'
  },
  verticalLine: {
    display: 'block',
    width: 2,
    height: 25,
    margin: '0 auto',
    background: '#6ec8ce',
    position: 'absolute',
    left: 0,
    right: 0
  },
  contentWrapper: {
    margin: '-116px auto 0'
  },
  listWrapper: {
    width: '100%',
    margin: '50px auto',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  gridItem: {
    width: 'auto',
    margin: '8px 0'
  },
  gridCard: {
    width: 280,
    height: 212,
    background: 'white',
    borderRadius: 8,
    boxShadow: '0 0 5px rgba(0,0,0,.25)',
    position: 'relative',
    margin: '126px auto 0'
  },
  gridContentWrapper: {
    width: 252,
    margin: '-126px auto 0',
    position: 'absolute',
    left: 0,
    right: 0
  },
  gridImageWrapper: {
    width: 252,
    height: 252,
    borderRadius: 8,
    overflow: 'hidden'
  },
  gridImage: {
    width: 'auto',
    height: 'inherit',
    margin: '0 auto'
  },
  gridTitle: {
    textAlign: 'center',
    color: '#15904e',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: '15px 0 0'
  },
  gridBodyCopy: {
    textAlign: 'center',
    color: '#ababab',
    fontSize: 12,
    margin: '5px 0'
  },
  textCenter: Layout.textCenter
};

// Inisialiasi action
const { load: loadArticles } = articlesActions;

@injectSheet(styles)

@asyncConnect([
  {
    deferred: true,
    promise: ({ store: {
        dispatch
      } }) => {
      const promises = [];

      /**
       * Request data riwayat taksiran
       */
      promises.push(dispatch(loadArticles()));

      return Promise.all(promises);
    }
  }
])
@connect(state => ({ articlesData: state.articles.data, loading: state.articles.loading }), {
  ...articlesActions
})

@reduxForm({ form: 'formArticles', formKey: 'formArticles' })

export default class Inner extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    articlesData: PropTypes.object.isRequired,
    loading: PropTypes.bool
  }
  static defaultProps = {
    articlesData: null,
    loading: false
  }
  state = {
    category: 0, // Default ke opsi -> Semua
    categories: dataPawnSimulation.categories,
    name: null,
    articles: [],
    branchPartnersState: listPartners.branchs,
  }
  componentWillMount = () => {
    const { load } = this.props;
    const { categories } = this.state;
    const that = this;
    // Tambah temporary category, untuk dapatkan semua katergori
    categories.unshift({ label: 'Semua', value: '0' });
    setTimeout(() => {
      load().then(result => {
        that.setState({ categories, articles: result });
      });
    }, 100);
  }
  componentDidMount = () => {
    const { articlesData } = this.props;
    if (articlesData) {
      console.log(articlesData);
      this.setState({ articles: articlesData });
    }
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ articles: nextProps.articlesData });
  }
  componentWillUnmount = () => {
    const { categories } = this.state;
    // Buang temporary category
    categories.shift();
    this.setState({ categories });
  }

  /**
   * Melakukan pengecekan teks setiap ada perubahan input pada inputText
   * Jika teks (karakter) yang di-input-kan memiliki kesamaan dengan data NAMA atau ALAMAT mitra
   * list data akan muncul sesuai teks yang diinputkan
   *
   * @param {string} searchName
   * @returns {object}
   * @memberOf PartnersAddress
   */
  onSearch = (searchName) => {
    setTimeout(() => {
      const resultPartners = this.state.articles
        .branchs
        .filter(mitra => mitra.title.toLowerCase().includes(searchName.toLowerCase()) ||
        mitra.category.toLowerCase().includes(searchName.toLowerCase()));
      if (searchName !== '') {
        this.setState({ articles: resultPartners });
      } else {
        this.setState({ articles: this.state.articles });
      }
    }, 100);
  }

  /**
   * Mendapatkan data dari file data/branch.json dan merubah isinya menjadi array of object
   *
   * @returns {object}
   * @memberOf PartnersAddress
   */
  getPartners = () => {
    const partners = [];
    let idx = 0;

    this
      .state
      .branchPartnersState
      .map((branch) => {
        if (branch.visible !== false) {
          ++idx;
          branch.number = idx;
          partners.push(branch);
        }
        return branch;
      });

    return partners;
  }

  searchOnChange = (searchCategory) => {
    const { name } = this.state;
    const { load } = this.props;
    const that = this;

    setTimeout(() => {
      that.setState({ category: searchCategory });
      load({ name: { name }, category: searchCategory || 0 }).then(result => {
        that.setState({ articles: result });
      });
    }, 100);
  }

  render() {
    const { loading, articlesData } = this.props;
    const { sheet: {
        classes
      } } = this.props;
    if (articlesData) {
      console.log(articlesData);
    }
    const articlesCollection = this.state.articles;
    console.log(articlesCollection);
    return (
      <div>
        <div className={classes.openingArea}></div>
        <Container style={styles.contentWrapper}>
          <Helmet
            title="Some Title of List" />
          <Spacer />
          <Header primaryText="Some Title of List" />
          <SearchBox onSearch={this.onSearch} />
          <span className={classes.verticalLine}></span>
          <div>
            {/* Tampilkan loader jika data sedang di load */}
            {loading && <Loader />}
            {/* Tampil jika data kosong */}
            {(!articlesCollection) && <Landing small>Belum ada informasi</Landing>}
            <Spacer />
            {/* Tampilan riwayat taksiran */}
            {!loading && articlesCollection &&
              <div className={classes.listWrapper} zDepth={1}>
                {articlesCollection.map(
                  (mitra) => <div key={`mitra-${mitra.articleId}`} className={classes.gridItem}>
                    <Link href={`/details/${mitra.articleId}`}>
                      <div className={classes.gridCard}>
                        <div className={classes.gridContentWrapper}>
                          <div className={classes.gridImageWrapper}>
                            <img className={classes.gridImage} src={`${sampleImage}`} alt="Mekar" />
                          </div>
                          <h4 className={classes.gridTitle}>{mitra.title}</h4>
                          <p className={classes.gridBodyCopy}>{mitra.category}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  )}
              </div>
            }
            <Spacer />
          </div>
          <Spacer />
        </Container>
      </div>
    );
  }
}
