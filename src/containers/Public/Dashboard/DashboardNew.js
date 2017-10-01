import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import {
  Link
} from 'react-router';
// import {
//   reduxForm
// } from 'redux-form';
import {
  connect
} from 'react-redux';
import {
  asyncConnect
} from 'redux-connect';
import * as articlesActions from 'redux/modules/public/articles';
import dataPawnSimulation from 'data/pawn/simulation.json';
import listPartners from 'data/branch.json';

import {
  Card,
  CardHeader
} from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {
  MdClose
} from 'react-icons/lib/md';

import { reduxForm,
  Field,
  // propTypes
} from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { number, letter } from 'utils/masking';

import SearchBox from './SearchBox';
import sampleImage from './img/mekar.jpg';

import {
  Container,
  // Header,
  Spacer,
  Loader,
  Landing,
  Button,
  Content
} from '../../UI';
import Layout from '../../App/Layout';

// import Layout from '../../App/Layout';
import Theme from '../../App/Theme';

// import listPartners from 'data/branch.json';

// import {
//   asyncConnect
// } from 'redux-connect';
// import * as articlesActions from 'redux/modules/public/articles';
// import dataPawnSimulation from 'data/pawn/simulation.json';
// import listPartners from 'data/branch.json';

// import SearchBox from './SearchBox';

// import sampleImage from './img/mekar.jpg';

// import {
//     Container,
//     Content,
//     Spacer,
//     Button,
//     Link,
//     Loader,
//     Landing,
// } from '../../UI';

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
    // margin: '-116px auto 0',
    margin: '18px auto 0'
  },
  listWrapper: {
    width: '100%',
    // margin: '50px auto',
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
  textCenter: Layout.textCenter,
  //
  formWrap: {
    padding: '10%',
    margin: '0 auto'
  },
  formEditWrapper: {
    position: 'absolute',
    zIndex: 100,
    margin: '0 auto',
    left: 0,
    right: 0,
    width: '88%',
    padding: 15,
    background: 'white',
    boxShadow: '0 0 3px rgba(0,0,0,.5)',
    color: 'black',
    borderRadius: 5
  },
  dangerText: {
    color: 'red'
  },
  blockAction: {
    width: '100%',
    marginTop: 18,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 48,
    height: 48
  },
  buttonCloseIcon: {
    width: 24,
    height: 24,
    color: Theme.secondaryTextColor
  },
  titleContent: {
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 30
  },
  positionButton: {
    position: 'absolute',
    marginTop: -28
  },
  flatButton: {
    border: 'solid 1px #888'
  },
  flatButtonLabel: {
    verticalAlign: 'top'
  },
  // openingArea: {
  //   background: '#2a6d5e',
  //   width: '100%',
  //   height: 130,
  //   marginTop: -50,
  //   backgroundImage: 'linear-gradient(120deg,#447f2c 0%,#2a6d5e 100%)'
  // },
  card: {
    borderRadius: '5px !important',
    overflow: 'hidden',
    marginTop: -68,
    marginBottom: 50
  },
  // contentWrapper: {
  //   margin: '-116px auto 0'
  // },
  // listWrapper: {
  //   width: '100%',
  //   margin: '30px auto',
  //   display: 'flex',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   flexWrap: 'wrap'
  // },
  // gridItem: {
  //   width: 'auto',
  //   margin: '8px 0'
  // },
  gridItemFull: {
    width: '100%',
    margin: '8px 0'
  },
  // gridCard: {
  //   width: 280,
  //   minHeight: 255,
  //   background: 'white',
  //   borderRadius: 8,
  //   boxShadow: '0 0 5px rgba(0,0,0,.25)',
  //   position: 'relative',
  //   margin: '126px auto 0'
  // },
  // gridContentWrapper: {
  //   width: 252,
  //   margin: '-126px auto 0',
  //   position: 'absolute',
  //   left: 0,
  //   right: 0
  // },
  // gridImageWrapper: {
  //   width: 252,
  //   height: 252,
  //   borderRadius: 8,
  //   overflow: 'hidden'
  // },
  // gridImage: {
  //   width: 'auto',
  //   height: 'inherit',
  //   margin: '0 auto'
  // },
  // gridTitle: {
  //   textAlign: 'center',
  //   color: '#15904e',
  //   fontWeight: 'bold',
  //   textTransform: 'capitalize',
  //   margin: '15px 0 0'
  // },
  // gridBodyCopy: {
  //   textAlign: 'center',
  //   color: '#ababab',
  //   fontSize: 12,
  //   margin: '5px 0'
  // },
  // textCenter: Layout.textCenter,
  textUppercase: {
    textTransform: 'uppercase'
  },
  noMargin: {
    margin: 0
  },
  noPadding: {
    padding: 0
  },
  header: {
    borderRadius: '5px 5px 0 0 !important',
    background: Theme.colorGrey,
    textAlign: 'center'
  },
  headerRight: {
    borderRadius: '5px 5px 0 0 !important',
    background: Theme.colorGrey,
    textAlign: 'right'
  },
  headerTitle: {
    fontSize: Layout.fontSize,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  headerText: {
    paddingRight: 0
  },
  wrap: {
    padding: Layout.margin,
    textAlign: 'center'
  },
  summaryContainer: {
    background: Theme.colorGreyLight
  },
  summaryWrap: {
    padding: Layout.margin
  }
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

export default class Dashboard extends Component {
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

  constructor(props) {
    super(props);
    // this.state = {
    //   open: false, dialogOpen: false, openEdit: false, branchPartnersState: listPartners.branchs, appraisalHistories: [], formShow: false
    // };
    this.handleToggleEditForm = this.handleToggleEditForm.bind(this);
  }

  state = {
    open: false,
    dialogOpen: false,
    openEdit: false,
    branchPartnersState: listPartners.branchs,
    appraisalHistories: [],
    formShow: false,
    category: 0, // Default ke opsi -> Semua
    categories: dataPawnSimulation.categories,
    name: null,
    articles: [],
    // branchPartnersState: listPartners.branchs,
  }
  componentWillMount = () => {
    const { load } = this.props;
    // const { categories } = this.state;
    const that = this;
    // Tambah temporary category, untuk dapatkan semua katergori
    // categories.unshift({ label: 'Semua', value: '0' });
    setTimeout(() => {
      load().then(result => {
        that.setState({
          // categories,
          articles: result });
      });
    }, 100);
  }
  componentDidMount = () => {
    const { articlesData } = this.props;
    if (articlesData) {
      this.setState({ articles: articlesData });
    }
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ articles: nextProps.articlesData });
  }
  componentWillUnmount = () => {
    const { categories } = this.state;
    // Buang temporary
    // categories.shift();
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
    const { articlesData } = this.props;
    if (articlesData) {
      setTimeout(() => {
        const resultPartners =
        this.state.articles
          .filter(mitra => mitra.title.toLowerCase().includes(searchName.toLowerCase())
        );
        if (searchName !== '') {
          this.setState({ articles: resultPartners });
        } else {
          this.setState({ articles: articlesData });
        }
      }, 100);
    }
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


  getLayout = () => {
    const { articlesData } = this.props;


    if (articlesData) {
      let layoutSelected = false;
      articlesData.map(
        (article) => {
          if (
          this.filterDot(article.articleId) === '.' ||
          this.filterDot(article.title) === '.' ||
          this.filterDot(article.category) === '.'
          ) {
            layoutSelected = true;
          } else {
            layoutSelected = false;
          }
          return console.log('selesai');
        });
      return layoutSelected;
    }
  }

  filterDot = (param) => {
    let valueDot = '';
    if (typeof param === 'string') {
      valueDot = (param.substr(param.length - 4)).charAt(0);
    }
    return valueDot;
  };


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

  handleToggle = () => this.setState({ open: !this.state.open });

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleToggleEditForm = (id) => {
    this.setState({ openEdit: !this.state.openEdit });
    console.log(id);
  }

  render() {
    const { loading,
     } = this.props;
    const { sheet: {
        classes
      } } = this.props;

    let articlesCollection;
    let articlesCollectionNoImage;

    if (this.getLayout() === false) {
      articlesCollection = [];
      articlesCollectionNoImage = this.state.articles;
    } else if (this.getLayout() === true) {
      articlesCollectionNoImage = [];
      articlesCollection = this.state.articles;
    }

    console.log(this.state.formShow);

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        labelStyle={{ color: 'red' }}
        label="Delete"
        primary
        keyboardFocused
        onTouchTap={this.handleDialogClose}
      />,
    ];

    return (
      <div>
        <div className={classes.openingArea}></div>
        <Container style={styles.contentWrapper}>
          <Helmet
            title="Some Title of List" />
          <Card style={{
            borderRadius: '5px !important',
            overflow: 'hidden',
            marginTop: -68,
            marginBottom: 50
          }}>
            <CardHeader title="Dashboard" textStyle={styles.headerText} titleStyle={styles.headerTitle} style={styles.headerRight}>
              <div className={classes.positionButton}><FlatButton style={styles.flatButton} labelStyle={styles.flatButtonLabel} label="Tampilkan Data Lain" primary onTouchTap={this.handleToggle} /></div>
            </CardHeader>
            <Content className={classes.noPadding}>
              <h1 className={classes.titleContent}>Some Title</h1>
              <div className={classes.wrap}>
                <SearchBox onSearch={this.onSearch} />
                <div>
                  {/* Tampilkan loader jika data sedang di load */}
                  {loading && <Loader />}
                  {/* Tampil jika data kosong */}
                  {(!articlesCollection) && <Landing small>Belum ada informasi</Landing>}
                  <Spacer />
                  {/* Tampilan riwayat taksiran */}
                  {!loading && articlesCollection.length > 0 &&
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
                                <div className={classes.blockAction}>
                                  <RaisedButton
                                    label="Edit"
                                    onTouchTap={() => this.handleToggleEditForm(mitra.articleId)}
                                  />
                                  <RaisedButton
                                    labelStyle={styles.dangerText}
                                    label="Delete"
                                    onTouchTap={this.handleDialogOpen}
                                  />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                        )}
                    </div>
                  }
                  {!loading && articlesCollection.length === 0 && <Content style={Layout.textCenter}>
                    <h4 style={{ display: 'block', textAlign: 'center' }}>Nama toko atau alamat yang Anda cari belum ada.<br /> Mohon cari dengan kata kunci lain</h4>
                  </Content>
                  }
                  {!loading && articlesCollectionNoImage.length > 0 &&
                    <div className={classes.listWrapper} zDepth={1}>
                      {articlesCollectionNoImage.map(
                        (mitra) => <div key={`mitra-${mitra.articleId}`} className={classes.gridItem}>
                          <Link href={`/details/${mitra.articleId}`}>
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
                                <h4 className={classes.gridTitle}>{mitra.title}</h4>
                                <p className={classes.gridBodyCopy}>{mitra.category}</p>
                                <div className={classes.blockAction}>
                                  <RaisedButton
                                    label="Edit"
                                    onTouchTap={() => this.handleToggleEditForm(mitra.articleId)}
                                  />
                                  <RaisedButton
                                    labelStyle={styles.dangerText}
                                    label="Delete"
                                    onTouchTap={this.handleDialogOpen}
                                  />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                        )}
                        {!loading && articlesCollectionNoImage.length === 0 && <Content style={Layout.textCenter}>
                          <h4 style={{ display: 'block', textAlign: 'center' }}>Nama toko atau alamat yang Anda cari belum ada.<br /> Mohon cari dengan kata kunci lain</h4>
                        </Content>
                        }
                    </div>
                  }
                  <Spacer />
                </div>
              </div>
            </Content>
          </Card>
          <Spacer />
        </Container>
        <Dialog
          title="Anda yakin akan menghapus item ini?"
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          Tekan 'Delete' untuk menghapus atau tekan 'Cancel' untuk membatalkan.
        </Dialog>
        <Drawer containerStyle={{ zIndex: 50 }} open={this.state.open}>
          <IconButton
            iconStyle={styles.buttonCloseIcon}
            style={styles.buttonClose}
            onTouchTap={this.handleToggle}>
            <MdClose />
          </IconButton>
          <Spacer />
          <Spacer />
          <Spacer />
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
        <Drawer openSecondary containerStyle={this.state.openEdit ? { zIndex: 51, width: 'inherit' } : { zIndex: 51, width: 256 }} open={this.state.openEdit}>
          <IconButton
            iconStyle={styles.buttonCloseIcon}
            style={styles.buttonClose}
            onTouchTap={this.handleToggleEditForm}>
            <MdClose />
          </IconButton>
          <Spacer />
          <Spacer />
          <Spacer />
          <form /* onSubmit={handleSubmit} */ noValidate className={classes.formWrap}>
            <div style={styles.textAlignLeft}>
              <Field
                name="name"
                component={TextField}
                floatingLabelText="Nama Lengkap"
                normalize={letter}
                fullWidth />
              <Field
                name="handphone"
                type="tel"
                component={TextField}
                floatingLabelText="Nomor Handphone"
                normalize={number}
                fullWidth />
              <Field
                name="email"
                type="email"
                component={TextField}
                floatingLabelText="Email"
                fullWidth />
              <Field
                name="password"
                type="password"
                component={TextField}
                floatingLabelText="Kata Sandi"
                fullWidth />
            </div>

            <Spacer />
            <Spacer />
            <p>Dengan mendaftar sebagai anggota berarti Anda menerima &nbsp;<br />
              <Link to="/bantuan/syarat-ketentuan" target="_blank">Syarat &amp; Ketentuan</Link>
            </p>
            <Spacer />
            <Button
              id="signup-submit"
              label="Daftar"
              type="submit"
              /* submitting={submitting} */
              secondary />
          </form>
        </Drawer>
      </div>
    );
  }
}
