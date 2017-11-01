import React, {
    Component,
    PropTypes
} from 'react';
import Helmet from 'react-helmet';
import {
    Card,
    CardHeader
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
    connect
} from 'react-redux';
import injectSheet from 'react-jss';
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

import {
  // number,
  letter } from 'utils/masking';

import listPartners from 'data/branch.json';

import {
  asyncConnect
} from 'redux-connect';
import * as articlesActions from 'redux/modules/public/articles';
import dataPawnSimulation from 'data/pawn/simulation.json';

import SearchBox from './SearchBox';

import sampleImage from './img/mekar.jpg';

import {
    Container,
    Content,
    Spacer,
    Button,
    // Link,
    Loader,
    Landing,
} from '../../UI';

import styles from './profileStyles';

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
    loading: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
  }

  static defaultProps = {
    articlesData: null,
    loading: false
  }

  constructor(props) {
    super(props);
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
    selectedDataEdit: null,
  }

  // -------------------------------
  componentWillMount = () => {
    const { load,
    } = this.props;
    const { categories } = this.state;
    const that = this;
    // Tambah temporary category, untuk dapatkan semua katergori
    setTimeout(() => {
      load().then(result => {
        that.setState({
          categories,
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

  loadDataForm = (id) => {
    const {
      initialize, articlesData
    } = this.props;
    const selectIndex = articlesData.find(articlesDataVal => articlesDataVal.articleId === id);
    setTimeout(() => {
      initialize(articlesData[articlesData.indexOf(selectIndex)]);
      this.handleToggleEditForm(id);
    }, 100);
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
      sheet: {
        classes
      },
    } = this.props;

    // const nama = 'joko';

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

    let articlesCollection;
    if (this.getLayout() === false) {
      articlesCollection = [];
    } else if (this.getLayout() === true) {
      articlesCollection = this.state.articles;
    }

    return (
      <div>
        <div className={classes.openingArea}></div>
        <Container>
          <Helmet title="Dashboard" />
          <Spacer />
          <Card style={styles.card}>
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
                  {!loading && articlesCollection
                  .length > 0 && <div className={classes.listWrapper}>
                    {!loading && articlesCollection
                      .map(
                        (mitra) => <div key={`mitra-${mitra.articleId}`} className={classes.gridItem}>
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
                                  onTouchTap={() => this.loadDataForm(mitra.articleId)}
                                />
                                <RaisedButton
                                  labelStyle={styles.dangerText}
                                  label="Delete"
                                  onTouchTap={this.handleDialogOpen}
                                />
                              </div>
                            </div>
                          </div>
                          <div id={`item${mitra.articleId}`}></div>
                        </div>
                        )
                    }
                  </div>}
                  {!loading && articlesCollection
                    .length === 0 && <Content className={classes.textCenter}>
                      <h4>Nama toko atau alamat yang Anda cari belum ada.<br /> Mohon cari dengan kata kunci lain</h4>
                    </Content>
                  }
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
          <MenuItem>Article</MenuItem>
          <MenuItem>Category</MenuItem>
          <MenuItem>User</MenuItem>
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
                name="title"
                component={TextField}
                floatingLabelText="Title"
                ref={(textField) => { this.title = textField; }}
                normalize={letter}
                fullWidth />
              <Field
                name="category"
                component={TextField}
                floatingLabelText="Category"
                ref={(textField) => { this.category = textField; }}
                normalize={letter}
                fullWidth />
            </div>

            <Spacer />
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
