import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Card from 'material-ui/Card/Card';
import Helmet from 'react-helmet';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import * as appraisalHistoriesActions from 'redux/modules/public/appraisalHistories';

import dataPawnSimulation from 'data/pawn/simulation.json';

import SelectFieldWrapper from '../../UI/Form/SelectFieldWrapper';
import { Container, Header, Content, Spacer, Loader, Landing } from '../../UI';

import SearchBox from './SearchBox/SearchBox';
import AppraisalItem from './AppraisalItem/AppraisalItem';
// import Summary from './Summary/Summary';

import styles from './appraisalHistoryStyles';

// Inisialiasi action
const { load: loadAppraisalHistories } = appraisalHistoriesActions;

/**
 * @export
 * @class AppraisalHistory
 * @extends {Component}
 */
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
      promises.push(dispatch(loadAppraisalHistories()));

      return Promise.all(promises);
    }
  }
])
@connect(state => ({ appraisalHistories: state.appraisalHistories.data, loading: state.appraisalHistories.loading }), {
  ...appraisalHistoriesActions
})

@reduxForm({ form: 'formAppraisalHistory', formKey: 'formAppraisalHistory' })

export default class AppraisalHistory extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    appraisalHistories: PropTypes.object,
    loading: PropTypes.bool
  }

  static defaultProps = {
    appraisalHistories: null,
    loading: false
  }

  state = {
    category: 0, // Default ke opsi -> Semua
    categories: dataPawnSimulation.categories,
    name: null,
    appraisalHistories: []
  }

  componentWillMount = () => {
    const { load } = this.props;
    const { categories } = this.state;
    const that = this;

    // Tambah temporary category, untuk dapatkan semua katergori
    categories.unshift({ label: 'Semua', value: '0' });

    setTimeout(() => {
      load().then(result => {
        that.setState({ categories, appraisalHistories: result });
      });
    }, 100);
  }

  componentWillUnmount = () => {
    const { categories } = this.state;

    // Buang temporary category
    categories.shift();

    this.setState({ categories });
  }

  /**
   * Handling pencarian saat ketik searchbox
   *
   * @param {string} searchName - Text dari searchbox
   * @return {void}
   * @memberOf AppraisalHistory
   */
  onSearch = (searchName: string) => {
    const { category } = this.state;
    const { load } = this.props;
    const that = this;

    setTimeout(() => {
      that.setState({ name: searchName, appraisalHistories: [] });
      load({
        name: searchName,
        category: category || 0
      }).then(result => {
        that.setState({ appraisalHistories: result });
      });
    }, 100);
  }

  /**
   * Handling pencarian saat pilih kategori
   *
   * @param {string} searchCategory - ID dari kategori terpilih
   * @return {void}
   * @memberOf AppraisalHistory
   */
  searchOnChange = (searchCategory: string) => {
    const { name } = this.state;
    const { load } = this.props;
    const that = this;

    setTimeout(() => {
      that.setState({ category: searchCategory });
      load({ name: { name }, category: searchCategory || 0 }).then(result => {
        that.setState({ appraisalHistories: result });
      });
    }, 100);
  }

  render() {
    const { loading, appraisalHistories } = this.props;

    const { sheet: {
      classes
    } } = this.props;

    return (
      <Container>
        <Helmet
          title="Riwayat Taksiran Online Terakhir" />
        <Spacer />
        <Header primaryText="Riwayat Taksiran Online Terakhir" />
        <Spacer />
        <Card>
          <Content className={classes.taksiran}>
            <SearchBox onSearch={this.onSearch} />

            <Field
              name="category"
              component={SelectFieldWrapper}
              onSelect={this.searchOnChange}
              floatingLabelText="Kategori"a
              fullWidth>
              {dataPawnSimulation.categories.map((category) => <MenuItem
                key={`category-${category.label}`}
                value={category.value}
                primaryText={category.label} />
              )}
            </Field>

            {/* Tampilkan loader jika data sedang di load */}
            {loading && <Loader />}

            {/* Tampil jika data kosong */}
            {(!appraisalHistories) && <Landing small>Belum ada informasi</Landing>}

            <Spacer />

            {/* Tampilan riwayat taksiran */}
            {!loading && appraisalHistories &&
              <Paper zDepth={1}>
                {appraisalHistories.data.map((appraisal) =>
                  <AppraisalItem key={`appraisal-${appraisal.id}`} data={appraisal} />)}
              </Paper>
            }

            <Spacer />

          </Content>
        </Card>

        <Spacer />

        {/* Di-hide sementara karena belum ada summary dari pinjaman */}
        {/* <Summary />*/}
      </Container>
    );
  }
}
