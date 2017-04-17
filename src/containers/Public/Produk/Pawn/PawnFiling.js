import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { Card } from 'material-ui/Card';
import { Field, reduxForm } from 'redux-form';
import { RadioButton } from 'material-ui/RadioButton';
import { RadioButtonGroup } from 'redux-form-material-ui';
import GoogleMap from 'google-map-react';
import MenuItem from 'material-ui/MenuItem';
import { debounce } from 'throttle-debounce';
import { TextField as MTextField } from 'material-ui';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import * as pawnFilingActions from 'redux/modules/product/pawn/filing';
import { load as loadPawnFiling } from 'redux/modules/product/pawn/filing';
import { createValidator, required } from 'utils/validation';
import { slugify, category } from 'utils/filter';

import {
  Container,
  Header,
  Content,
  Spacer,
  Button,
  Loader,
  Dropzone
} from '../../../UI';
import Layout from '../../../App/Layout';
import config from '../../../../config';
import Place from '../../../UI/Maps/Place';
import SelectFieldWrapper from '../../../UI/Form/SelectFieldWrapper';
import dataBranch from '../../../../data/branch.json';
import dataConstant from '../../../../data/constant.json';

import iconCOD from './Assets/ic-cod.svg';
// import iconPickUp from './Assets/ic-pickup.svg';
import iconVespa from './Assets/ic-vespa.svg';
import iconMoneyCash from './Assets/ic-money-cash.svg';
import iconSafes from './Assets/ic-brankas.svg';
// import iconMandiriEcash from './Assets/ic-mandiri-e-cash.png';
import InfoGold from './InfoGold';
import InfoJewelry from './InfoJewelry';
import InfoMotorCycle from './InfoMotorCycle';
import InfoLaptop from './InfoLaptop';
import InfoHandphone from './InfoHandphone';
import InfoCamera from './InfoCamera';
import InfoTabletPC from './InfoTabletPC';
import InfoCar from './InfoCar';

const style = {
  positionRelative: {
    position: 'relative'
  },
  noMargin: {
    margin: 0
  },
  wrap: {
    padding: Layout.margin
  },
  textCenter: {
    textAlign: 'center'
  },
  uploader: {
    textAlign: 'center'
  },
  branchLabel: {
    paddingTop: 2,
    paddingLeft: Layout.margin + 5
  },
  branchUnderline: {
    background: 'none',
    borderBottomStyle: 'none',
    border: 0
  },
  metode: {
    padding: 0,
    textAlign: 'left'
  },
  metodeIcons: {
    fontSize: Layout.fontSize,
    padding: '0px 20px'
  },

  radioButton: {
    marginBottom: Layout.marginLarge
  },

  radioButtonMarginBottom: Layout.marginLarge,

  radioButtonLabel: {
    paddingLeft: 54
  },

  radioButtonNote: {
    position: 'absolute',
    left: 94,
    top: '100%',
    lineHeight: '14px'
  },

  radioButtonIcon: {
    position: 'absolute',
    left: 34
  },
  errorMessage: {
    position: 'relative',
    paddingTop: 15,
    fontSize: 12,
    lineHeight: '12px',
    color: '#ED402F'
  }
};

@asyncConnect([
  {
    deferred: true,
    promise: ({
      params,
      store: {
        dispatch
      }
    }) => {
      return dispatch(loadPawnFiling(params));
    }
  }
])
@connect(state => ({ identity: state.auth.identity, filing: state.pawnFiling.data, loading: state.pawnFiling.loading, saveError: state.pawnFiling.saveError }), {
  ...pawnFilingActions
})

@reduxForm({
  form: 'pawnFiling',
  formKey: 'pawnFiling',
  initialValues: {
    methodDelivery: 'direct',
    methodDisbursement: 'now'
  },
  validate: createValidator({ branchId: [required] })
})

export default class PawnFiling extends Component {

  state = {
    mapCenter: dataBranch.center,
    photos: [],
    invalidRecommendationCode: '',
    invalidUpload: false
  }

  componentWillMount = () => {
    this.onTyping = debounce(500, this.onTyping);
  }

  onTyping = () => {
    const { validateRecommendationCode } = this.props;
    const givenRecommendedCode = this.refs.recommendationCode.input.value;

    return validateRecommendationCode({ recommendationCode: givenRecommendedCode }).then(result => {
      this.setState({
        invalidRecommendationCode: (!result.data.validity && givenRecommendedCode.length > 0)
          ? 'Kode promo salah. Pastikan Anda memasukkan Kode promo yang benar'
          : ''
      });
    });
  }

  getBranchList = () => {
    const { filing } = this.props;

    const branchList = [];

    if (filing) {
      dataBranch.branchs.map((branch) => {
        if (branch.visible !== false && branch.category.indexOf(parseInt(filing.data.category, 10)) !== -1) {
          branchList.push(branch);
        }
      });
    }

    return branchList;
  }

  handleFiling = (values) => {
    const { identity, save, params } = this.props;
    const { photos, invalidRecommendationCode } = this.state;

    if (photos.length === 0) {
      this.setState({
        invalidUpload: true
      });
      return;
    }

    this.setState({
      invalidUpload: false
    });

    values.userId = identity.id;
    values.simulationId = params.simulationId;
    values.recommendationCode = this.refs.recommendationCode.input.value;

    photos.map((photo, idx) => {
      switch (idx) {
        case 0:
          values.photo_1 = photo;
          break;
        case 1:
          values.photo_2 = photo;
          break;
        case 2:
          values.photo_3 = photo;
          break;
        case 3:
          values.photo_4 = photo;
          break;
        default:
      }
    });

    if (values.recommendationCode && invalidRecommendationCode.length > 0) {
      return;
    }

    return save(values).then(result => {
      if (result && typeof result.errors === 'object') {
        console.log(result);
      } else {
        sessionStorage.removeItem('filing');
        browserHistory.push('/gadai/berhasil');
      }
    });
  }

  handleCancel = () => {
    sessionStorage.removeItem('filing');
    browserHistory.push('/gadai');
  }

  handlePhotoAdded = (photo) => {
    const photos = this
      .state
      .photos
      .slice();
    photos.push(photo);

    setTimeout(() => {
      this.setState({ photos: photos, invalidUpload: false });
    }, 100);
  }

  handlePhotoRemove = (file) => {
    const photos = this
      .state
      .photos
      .slice();
    const response = JSON.parse(file.xhr.response);

    const removedPhoto = photos.findIndex(photo => photo === response.data);

    photos.splice(removedPhoto, 1);

    setTimeout(() => {
      this.setState({ photos: photos });
    }, 100);
  }

  handleBranch = (values) => {
    const branchLocation = this.getBranchList()
      .find((branch) => branch.id === values);

    if (branchLocation) {
      setTimeout(() => {
        this.setState({
          mapCenter: [branchLocation.lat, branchLocation.lng]
        });
      }, 100);
    }
  }

  render() {
    const {
      handleSubmit,
      submitting,
      filing,
      identity
    } = this.props;
    const { mapCenter } = this.state;

    const branchList = this.getBranchList();
    const uiBranchList = branchList.map((branch, idx) => <MenuItem key={ idx } value={branch.id} primaryText={branch.name}/>);

    let data = {};

    if (filing) {
      data = filing.data;
    }

    return (
      <Container>
        <Helmet title="Pengajuan Gadai" />
        <Spacer />
        <form onSubmit={handleSubmit((values) => this.handleFiling(values))}>
          <Header primaryText="Detail Pengajuan Barang Jaminan Anda" />
          <Spacer />
          <Card>
            <Content style={style.uploader}>
              {!data && <Loader />}

              {data && <div>
                {(() => {
                  switch (data.category) {
                    case dataConstant.PAWN_CATEGORY_JEWELRY:
                      return <InfoJewelry data={data} />;
                    case dataConstant.PAWN_CATEGORY_GOLD:
                      return <InfoGold data={data} />;
                    case dataConstant.PAWN_CATEGORY_MOTORCYCLE:
                      return <InfoMotorCycle data={data} />;
                    case dataConstant.PAWN_CATEGORY_LAPTOP:
                      return <InfoLaptop data={data} />;
                    case dataConstant.PAWN_CATEGORY_HANDPHONE:
                      return <InfoHandphone data={data} />;
                    case dataConstant.PAWN_CATEGORY_CAMERA:
                      return <InfoCamera data={data} />;
                    case dataConstant.PAWN_CATEGORY_TABLETPC:
                      return <InfoTabletPC data={data} />;
                    case dataConstant.PAWN_CATEGORY_CAR:
                      return <InfoCar data={data} />;
                    default:
                      return 'Tidak ada simulasi taksiran sebelumnya';
                  }
                })()}
              </div>}
            </Content>
          </Card>
          <Spacer />

          <Header primaryText="Unggah Foto Barang Jaminan Anda" />
          <Spacer />
          <Card>
            <Content style={style.uploader}>
              <Dropzone
                defaultMessage="Mohon unggah foto barang anda minimal 1 foto tampak depan, maksimal 4 foto dari sudut berbeda. <br/> Ukuran Foto: 1 MB/foto. Tipe File: jpg, jpeg, png.<br/>"
                params={{
                  userId: identity.id
                }}
                eventHandlers={{
                  success: (event, response) => this.handlePhotoAdded(response.data),
                  removedfile: (file) => this.handlePhotoRemove(file)
                }} />
              <Button label="Pilih Foto" className="dz-trigger-file" backgroundColor="#4B4B4B" labelStyle={{color: '#fff'}} />
              {this.state.invalidUpload && <div style={style.errorMessage}>Mohon upload minimal 1 foto tampak depan</div>}
            </Content>
          </Card>
          <Spacer />

          <Header primaryText="Program Promo" />
          <Spacer />
          <Card>
            <Content>
                {/** 
                <Field
                  name="recommendationCode"
                  component={TextField}
                  floatingLabelText="Masukkan kode promo disini (jika ada)"
                  ref="recommendationCode"
                  fullWidth/>
                 */}
                <MTextField
                  floatingLabelText="Masukkan kode promo disini (jika ada)"
                  ref="recommendationCode"
                  errorText={this.state.invalidRecommendationCode}
                  fullWidth
                  onChange={this.onTyping} />
            </Content>
          </Card>
          <Spacer />

          <Header primaryText="Metode Serah Terima Barang & Pencairan Gadai"/>
          <Spacer />
          <Card>
            <Content style={style.metode}>
              <div
                style={{
                  width: '100%',
                  height: 200
                }}>
                {branchList && <GoogleMap
                  defaultCenter={dataBranch.center}
                  center={mapCenter}
                  zoom={12}
                  bootstrapURLKeys={config.vendor.google.maps}>
                  {branchList
                    .map((branch) => <Place
                      key={`place-${branch.id}`}
                      lat={branch.lat}
                      lng={branch.lng}
                      text={branch.label} />)}
                </GoogleMap>}
              </div>
              <div style={style.wrap}>
                <h4 style={style.noMargin}>Pilih store</h4>
                <Field
                  name="branchId"
                  component={SelectFieldWrapper}
                  onSelect={this.handleBranch}
                  floatingLabelText="Pilih store"
                  maxHeight={200}
                  fullWidth>
                  {[...uiBranchList]}
                </Field>
                <div style={style.positionRelative}>
                  <img
                    src={iconCOD}
                    style={Object.assign({
                      top: 25
                    }, style.radioButtonIcon)} alt="" />
                  <img
                    src={iconVespa}
                    style={Object.assign({
                      top: 90
                    }, style.radioButtonIcon)} alt="" />
                  <img
                    src={iconMoneyCash}
                    style={Object.assign({
                      top: 190
                    }, style.radioButtonIcon)} alt="" />
                  {/*
                  <img
                    src={iconMandiriEcash}
                    style={Object.assign({
                      top: '76.5%'
                    }, style.radioButtonIcon)}/>
                  */}
                  <img
                    src={iconSafes}
                    style={Object.assign({
                      top: 255
                    }, style.radioButtonIcon)} alt="" />
                  <div style={style.radioButtonNote}>
                    <small>(Barang berharga anda kami simpan di deposit box kami secara cuma-cuma
                      dan dapat dicairkan kapan saja)</small>
                  </div>
                  <h4>Pilihan serah terima barang</h4>
                  <Field name="methodDelivery" component={RadioButtonGroup}>
                    <RadioButton
                      value="direct"
                      label="Antar barang ke toko kami"
                      style={style.radioButton}
                      labelStyle={style.radioButtonLabel} />
                    <RadioButton
                      value="courierExtern"
                      label="Kirim barang lewat jasa ekspedisi"
                      style={style.radioButton}
                      labelStyle={style.radioButtonLabel} />
                  </Field>
                  <h4>Pilihan pencairan dana</h4>
                  <Field name="methodDisbursement" component={RadioButtonGroup}>
                    <RadioButton
                      value="now"
                      label="Cairkan langsung (sekarang)"
                      style={style.radioButton}
                      labelStyle={style.radioButtonLabel} />
                    {/*
                    <RadioButton
                      value="mandiri_ecash"
                      label="Mandiri e-cash"
                      style={style.radioButton}
                      labelStyle={style.radioButtonLabel}/>
                    */}
                    <RadioButton
                      value="pending"
                      label="Dana Siaga"
                      style={style.radioButton}
                      labelStyle={style.radioButtonLabel} />
                  </Field>
                </div>
                <Spacer />
                <Spacer />
                <Spacer />
                <div style={style.textCenter}>
                  <Button
                    id={`pawn-simulation-${slugify(category(data.category))}-filling-decline`}
                    label="Ajukan Gadai"
                    type="submit"
                    submitting={submitting}
                    secondary
                    fullWidth />
                  <br /><br />
                  <Button
                    id={`pawn-simulation-${slugify(category(data.category))}-filling-accept`}
                    label="Batalkan"
                    onTouchTap={this.handleCancel}
                    submittingHide={submitting}
                    fullWidth />
                </div>
              </div>
              <Spacer />
            </Content>
          </Card>
          <Spacer />
        </form>
      </Container>
    );
  }
}

PawnFiling.propTypes = {
  filing: PropTypes.func,
  save: PropTypes.func,
  validateRecommendationCode: PropTypes.func,
  identity: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  values: PropTypes.object,
  contactUs: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.object
};
