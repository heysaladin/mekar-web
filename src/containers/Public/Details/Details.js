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
  MdChevronLeft
} from 'react-icons/lib/md';
import {
  reduxForm
} from 'redux-form';
import {
  connect
} from 'react-redux';
import {
  asyncConnect
} from 'redux-connect';
import * as articlesActions from 'redux/modules/public/articles';
// import dataPawnSimulation from 'data/pawn/simulation.json';
import listPartners from 'data/branch.json';

import sampleImage from './img/mekar.jpg';

import {
  Container,
  Header,
  Spacer
} from '../../UI';
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
    margin: '25px auto 0',
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
    width: 640,
    minHeight: 350,
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
  buttonBack: {
    color: 'white',
    textDecoration: 'none'
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
       * Request data
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

export default class Details extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    articlesData: PropTypes.object.isRequired,
    // loading: PropTypes.bool
  }

  state = {
    branchPartnersState: listPartners.branchs,
    appraisalHistories: []
  }

  /**
   * Mendapatkan data dari file data/branch.json dan merubah isinya menjadi array of object
   *
   * @returns {object}
   * @memberOf PartnersAddress
   */
  getPartners = () => {
    const { articlesData } = this.props;
    const partners = [];
    let idx = 0;

    const url = window.location.pathname;
    const splitUrl = url.split('/');
    const lastSegment = splitUrl[splitUrl.length - 1];

    articlesData
      .map((branch) => {
        if (
          branch.articleId === parseInt(lastSegment, 10)) {
          // console.log(lastSegment);
          // console.log(branch.articleId);
          ++idx;
          branch.number = idx;
          partners.push(branch);
        }
        return branch;
      });

    return partners;
  }

  render() {
    const {
        sheet: {
            classes
        },
    } = this.props;

    return (
      <div>
        <div className={classes.openingArea}></div>
        <Container style={styles.contentWrapper}>
          <Helmet
            title="Some Title of Details" />
          <Spacer />
          <Header primaryText="Some Title of Details" />
          <span className={classes.verticalLine}></span>
          <div>
            <div style={styles.buttonBack}>
              <Link style={styles.buttonBack} to="/inner"><MdChevronLeft />Kembali</Link>
            </div>
            {this
            .getPartners()
            .length > 0 && <div className={classes.listWrapper}>
              {this
                .getPartners()
                .map(
                  (mitra) => <div key={`mitra-${mitra.number}`} className={classes.gridItem}>
                    <div className={classes.gridCard}>
                      <div className={classes.gridContentWrapper}>
                        <div className={classes.gridImageWrapper}>
                          <img className={classes.gridImage} src={`${sampleImage}`} alt="Mekar" />
                        </div>
                        <h4 className={classes.gridTitle}>{mitra.title}</h4>
                        <p className={classes.gridBodyCopy}>{mitra.category}</p>
                      </div>
                    </div>
                  </div>
                  )
              }
            </div>
            }
          </div>
          <Spacer />
        </Container>
      </div>
    );
  }
}
