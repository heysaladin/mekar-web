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

import { number, letter } from 'utils/masking';

import listPartners from 'data/branch.json';

import {
  asyncConnect
} from 'redux-connect';
import * as articlesActions from 'redux/modules/public/articles';
import dataPawnSimulation from 'data/pawn/simulation.json';
// import listPartners from 'data/branch.json';

import SearchBox from './SearchBox';

import sampleImage from './img/mekar.jpg';

import {
    Container,
    Content,
    Spacer,
    Button,
    Link,
    Loader,
    Landing,
} from '../../UI';

// import registerValidation from './registerValidation';

import styles from './profileStyles';
// @injectSheet(styles)

// @connect(state => {
//   const profileData = {
//     data: {
//       profile: {
//         accountName: 'Milan',
//         accountNumber: '0987654321',
//         address: 'Jalan Patra Kuningan X',
//         addressById: 'Jalan Patra Kuningan XV',
//         bank: '1',
//         bankBranch: 'KPC Kuningan',
//         birthday: '1995-2-9',
//         birthplace: '190',
//         city: '190',
//         cityById: '190',
//         code: 'P1700188',
//         email: 'm.milan@gmail.com',
//         gender: 'P',
//         handphone: '085891550128',
//         id: 21453,
//         idCard: '1234567890',
//         mothername: 'Upiek',
//         name: 'Muhammad Milan',
//         photoIDCard: 'https://s3-ap-southeast-1.amazonaws.com/image-static-pinjam/activities/21453/2017/03/15/b66bac28296847053c00e4894efb5830.jpg',
//         photoProfile: 'https://s3-ap-southeast-1.amazonaws.com/image-static-pinjam/activities/21453/2017/03/15/a219fe78b36360de59e19b4fd072190d.jpg'
//       }
//     }
//   };
//   return ({
//     identity: state.auth.identity,
//     profile: profileData,
//     loading: false
//   });
// }, {
// })

// @reduxForm({ form: 'register', validate: registerValidation })

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
  // }
  // static propTypes = {
    // location: PropTypes.object.isRequired,
    // sheet: PropTypes.object.isRequired,
    // register: PropTypes.func.isRequired,
    // notifSend: PropTypes.func.isRequired,
    // ...propTypes
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

  // -------------------------------
  componentWillMount = () => {
    const { load } = this.props;
    const { categories } = this.state;
    const that = this;
    // Tambah temporary category, untuk dapatkan semua katergori
    // categories.unshift({ label: 'Semua', value: '0' });
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
    setTimeout(() => {
      console.log(this.state.articles);
    }, 100);
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

  // -------------------------------

  /**
   * Melakukan pengecekan teks setiap ada perubahan input pada inputText
   * Jika teks (karakter) yang di-input-kan memiliki kesamaan dengan data NAMA atau ALAMAT mitra
   * list data akan muncul sesuai teks yang diinputkan
   *
   * @param {string} searchName
   * @returns {object}
   * @memberOf PartnersAddress
   */
  // onSearch = (searchName: string) => {
  //   setTimeout(() => {
  //     const resultPartners = listPartners
  //       .branchs
  //       .filter(mitra => mitra.name.toLowerCase().includes(searchName.toLowerCase()) ||
  //       mitra.address.toLowerCase().includes(searchName.toLowerCase()));
  //     if (searchName !== '') {
  //       this.setState({ branchPartnersState: resultPartners });
  //     } else {
  //       this.setState({ branchPartnersState: listPartners.branchs });
  //     }
  //   }, 100);
  // }

  /**
   * Cek apakah sedang dalam keadaan oauth / tidak
   *
   * @returns {boolean}
   * @memberOf Register
   */
  // getInitialValues = () => {
  //   const { location } = this.props;
  //   return location.state && location.state.oauth;
  // }

  /**
   * Mendapatkan data dari file data/branch.json dan merubah isinya menjadi array of object
   *
   * @returns {object}
   * @memberOf PartnersAddress
   */
  // getPartners = () => {
  //   const partners = [];
  //   let idx = 0;

  //   this
  //     .state
  //     .branchPartnersState
  //     .map((branch) => {
  //       if (branch.visible !== false) {
  //         ++idx;
  //         branch.number = idx;
  //         partners.push(branch);
  //       }
  //       return branch;
  //     });

  //   return partners;
  // }

  // // register = data => this.successRegister(data);
  // /**
  //  * Handle registrasi
  //  *
  //  * @param {object} data - Berisi username, password, dan rememberme
  //  * @return {Promise<data>}
  //  * @memberOf Register
  //  */
  // register = (data: {message: string, user_id: string}) => this.props.register(data).then(this.successRegister);

  // /**
  //  * Handle sukses setelah login
  //  *
  //  * @param {object} result - Berisi info callbacks dari @function register
  //  * @return {object}
  //  * @memberOf Register
  //  */
  // successRegister = (result: {message: string, user_id: string}) => {
  //   console.log('register done');
  //   this
  //     .props
  //     .notifSend({ message: 'You\'r now registered !', kind: 'success' });
  //   return result;
  // }

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
      // articlesData,
      sheet: {
        classes
      },
      // handleSubmit, submitting
    } = this.props;

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


    // const { loading,
    // } = this.props;
  //  const { sheet: {
  //      classes
  //    } } = this.props;
    console.log(this.state.articles);
    let articlesCollection;
    // let articlesCollection = articlesData;
    // if (articlesData) {
      // articlesCollection = articlesData;
    // let articlesCollectionNoImage;
    if (this.getLayout() === false) {
      articlesCollection = [];
      // articlesCollectionNoImage = this.state.articles;
    } else if (this.getLayout() === true) {
      // articlesCollectionNoImage = [];
      articlesCollection = this.state.articles;
    }
    console.log(articlesCollection);
    // }
    // else {
    //   articlesCollection = articlesData;
    // }

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
