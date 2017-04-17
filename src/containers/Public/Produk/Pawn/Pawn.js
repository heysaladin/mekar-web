import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { Card } from 'material-ui/Card';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import * as pawnSimulateActions from 'redux/modules/product/pawn/simulate';
import View from 'react-flexbox';
import { Element, Link } from 'react-scroll';

import Layout from '../../../App/Layout';
import simulationData from '../../../../data/pawn/simulation.json';
import {
  Container,
  Header,
  Content,
  Spacer,
  Button
} from '../../../UI';
import { canonical } from '../../../../utils/filter';
import Theme from '../../../App/Theme';

import iconStep1 from './Assets/ic-gadai-cara-1.svg';
import iconStep2 from './Assets/ic-gadai-cara-2.svg';
import iconStep3 from './Assets/ic-gadai-cara-3.svg';
import iconStep2Cod from './Assets/ic-cod.svg';
import iconStep2Motorcycle from './Assets/ic-vespa.svg';
import PawnStep1 from './PawnStep1';
import PawnStep2 from './PawnStep2';
import PawnStep3 from './PawnStep3';
import iconRupiah from './Assets/ic-tarif-biaya-modal.svg';
import iconWatch from './Assets/ic-taksiran-online-24-jam.svg';
import iconWatchSpeed from './Assets/ic-proses-mudah.svg';
import iconGroup from './Assets/ic-partner-diandalkan.svg';
import iconPrivacy from './Assets/ic-privasi-kenyamanan.svg';
import iconSecure from './Assets/ic-keamanan-terjaga.svg';

const style = {
  title: {
    fontFamily: Layout.fontTitle,
    fontSize: Layout.fontSize + 4,
    textAlign: 'center',
    margin: '10px 0 15px 0',
    color: Theme.primaryTextColor
  },
  textUppercase: {
    textTransform: 'uppercase'
  },
  textCenter: {
    textAlign: 'center'
  },
  tableColumnNumber: {
    width: 50
  },
  tableColumnPrice: {
    width: 125
  },
  tableColumnPriceLarge: {
    width: 235
  },
  tableBody: {
    overflowX: 'visible',
    overflowY: 'visible'
  },
  positionRelative: {
    position: 'relative'
  },
  langkah: {
    position: 'relative'
  },
  langkahLabel: {
    fontSize: Layout.fontSize
  },
  langkahWrap: {
    position: 'relative',
    width: 210,
    textAlign: 'center',
    margin: '0 auto'
  },
  langkahNumber: {
    position: 'absolute',
    top: 0,
    left: -30,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: 3,
    background: '#4B4B4B'
  },
  noteHeader: {
    fontFamily: Layout.fontTitle,
    fontSize: Layout.fontSize + 10,
    fontWeight: 'bold'
  },
  infoPersentase: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: '0px 4px'
  },
  langkah: {
    display: 'block',
    width: '100%',
    position: 'relative'
  },
  langkahLabel: {
    fontSize: Layout.fontSize
  },
  langkahNumber: {
    width: 24,
    height: 24,
    marginRight: 12,
    float: 'left',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: 3,
    background: '#4B4B4B'
  },
  langkahWrap: {
    position: 'relative',
    width: 210,
    margin: '0 auto'
  },
  stepIcon: {
    height: 40
  },
  noMargin: Layout.noMargin,
  grid: {
    display: 'block',
    padding: 0,
    margin: 0,
    marginBottom: 20
  },
  gridImg: {
    margin: '0 auto',
    height: 50,
    width: 50
  }
};

@connect(state => ({identity: state.auth.identity, error: state.simulationData.error, loading: state.simulationData.loading}), {
  ...pawnSimulateActions
})

export default class Pawn extends Component {

  state = {
    stepIndex: 0,
    category: null,
    simulationResult: null,
    open: false,
    paramsSelectedItem: null
  };

  componentWillMount = () => {
    const { location } = this.props;

    const category = simulationData.categories.find(data => data.value === location.query.category);

    if (category) {
      this.setState({
        stepIndex: 1,
        category: category,
        paramsSelectedItem: location.query
      });
    }
  }

  validateSelectedItem = (selectedItem) => {
    if (selectedItem) {
      return true;
    }

    return false;
  }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  handleReset = () => {
    this.scrollToTop();
    this.setState({ warningCredit: false, stepIndex: 0, simulationResult: null });
    sessionStorage.removeItem('filing');
  };

  handlePrev = () => {
    this.scrollToTop();

    const { stepIndex } = this.state;

    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  };

  handleStep1 = (category) => {
    this.scrollToTop();

    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      category: category
    });
  }

  handleStep2 = (response) => {
    this.scrollToTop();

    const { stepIndex } = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
      simulationResult: response
    });
  }

  handleStep3 = () => {
    const { identity } = this.props;
    const { simulationResult } = this.state;

    if (identity) {
      browserHistory.push('/gadai/pengajuan/' + simulationResult.simulationId);
    } else {
      browserHistory.push('/masuk/?action=pengajuan-gadai');
    }
  }

  render() {
    const { location } = this.props;
    const { stepIndex, category, paramsSelectedItem, simulationResult } = this.state;

    return (
      <Container>
        <Helmet
          title="Simulasi Taksiran Gadai"
          meta={[
            {
              'name': 'description',
              'content': 'Cara kerja dan langkah mudah solusi dana cepat anda dalam melakukan taksiran'
            }, {
              'name': 'keywords',
              'content': 'Langkah mudah melakukan taksiran, langkah taksiran online, pengajuan taksiran online, pengajuan gadai online'
            }
          ]}
          link={[{
            'rel': 'canonical',
            'href': canonical(location.pathname)
          }
          ]} />
        <Element name="pawn-process">
          <Spacer />
          {/* <Header primaryText="Dapatkan pinjaman dan penawaran terbaik dari kami"/> */}
          <h4 style={style.title}>Solusi Dana Cepat dengan Gadai Online</h4>
          <Card>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel style={style.langkahLabel} />
              </Step>
              <Step>
                <StepLabel style={style.langkahLabel} />
              </Step>
              <Step>
                <StepLabel style={style.langkahLabel} />
              </Step>
            </Stepper>
            <Divider />
            <Content>
              <div style={style.textCenter}>
                {(() => {
                  switch (stepIndex) {
                    case 0:
                      return <PawnStep1 data={simulationData} onHandleNext={this.handleStep1}/>;
                    case 1:
                      return <PawnStep2 data={simulationData} validateSelectedItem={this.validateSelectedItem} category={category} paramsSelectedItem={paramsSelectedItem} onHandleNext={this.handleStep2} onHandlePrev={this.handlePrev}/>;
                    case 2:
                      return <PawnStep3 data={simulationResult} category={category} onHandleReset={this.handleReset} onHandleNext={this.handleStep3} onHandlePrev={this.handlePrev}/>;
                    default:
                      return 'No step here';
                  }
                })()}
              </div>
              <Spacer />
            </Content>
          </Card>
        </Element>
        <Spacer />
        {/*
        <Card>
          <Content style={style.textCenter}>
            3 Cara Langkah Mudah Solusi Dana Cepat Anda<br/>
            <Link onTouchTap={this.handleOpen}>Lihat Disini</Link>

            <Dialog
              actions={[< FlatButton label = "Tutup" primary onTouchTap = {
                this.handleClose
              } />]} modal open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent contentStyle={{
                width: '90%',
                maxWidth: 'none'
              }}>
              <Content style={style.textCenter}>
                <div style={style.langkah}>
                  <div style={style.langkahWrap}>
                    <div style={style.langkahNumber}>1</div>
                    <img src={iconStep1} alt="langkah-1"/>
                  </div>
                  <p>Pilih kategori barang jaminan Anda,<br/>
                    hasilkan taksiran akan dihadirkan seketika</p>
                </div>
                <Spacer/>
                <Spacer/>
                <div style={style.langkah}>
                  <div style={style.langkahWrap}>
                    <div style={style.langkahNumber}>2</div>
                    <img src={iconStep2} alt="langkah-2"/>
                  </div>
                  <p>Serah terima barang Anda dengan antar jemput, jasa ekspedisi, atau datang ke
                    toko/mitra pinjam</p>
                </div>
                <Spacer/>
                <Spacer/>
                <div style={style.langkah}>
                  <div style={style.langkahWrap}>
                    <div style={style.langkahNumber}>3</div>
                    <img src={iconStep3} alt="langkah-3"/>
                  </div>
                  <p>Konfirmasi penawaran dan dapatkan pinjaman melalui transfer bank</p>
                </div>
              </Content>
            </Dialog>
          </Content>
        </Card>
        <Spacer/>
        <Card>
          <Content style={style.textCenter}>
            Dapatkan tarif biaya Pinjaman yang efektif dan efisien yaitu<br/><br/>
            <span style={style.infoPersentase}>
              0.7% /minggu
            </span>
            <br/><br/>
            dengan jangka waktu yang dapat ditentukan sendiri sesuai kebutuhan anda
          </Content>
        </Card>
        <Spacer/>
        */}
        <h4 style={style.title}>Langkah Mudah Solusi Dana Cepat</h4>
        <Card>
          <Content>
            <View column auto>
              <View style={style.langkah}>
                <View auto row>
                  <View column width="20%">
                    <img src={iconStep1} alt="langkah-1" />
                  </View>
                  <View column width="76%">
                    <div>
                      <span style={style.langkahNumber}>1</span>
                      <strong>Pilih Kategori Barang</strong>
                    </div>
                    <p>Pilih kategori barang jaminan Anda,
                      hasil taksiran gadai akan dihadirkan dengan seketika</p>
                    <Divider />
                  </View>
                </View>
                <Spacer />
              </View>


              <View style={style.langkah}>
                <View auto row>
                  <View column width="20%">
                    <img src={iconStep2Motorcycle} alt="langkah-2-motorcycle" height="50" style={{ marginBottom: 10 }} />
                    <img src={iconStep2Cod} alt="langkah-2-cod" height="50" />
                    <Spacer />
                  </View>
                  <View column width="76%">
                    <div>
                      <span style={style.langkahNumber}>2</span>
                      <strong>Serah Terima Barang</strong>
                    </div>
                    <p>Serah terima barang Anda dengan jasa ekspedisi atau datang ke
                    toko/mitra Pinjam terdekat</p>
                    <Divider />
                  </View>
                </View>
                <Spacer />
              </View>


              <View style={style.langkah}>
                <View auto row>
                  <View column width="20%">
                    <img src={iconStep3} alt="langkah-3" height="60" />
                  </View>
                  <View column width="76%">
                    <div>
                      <span style={style.langkahNumber}>3</span>
                      <strong>Konfirmasi</strong>
                    </div>
                    <p style={{ marginBottom: 0 }}>
                      Konfirmasi penawaran dan dapatkan uang pinjaman Anda melalui transfer bank
                    </p>
                  </View>
                </View>
              </View>

            </View>
          </Content>
        </Card>
        <Spacer/>
        <h4 style={style.title}>Kenapa Harus Gadai Online di Pinjam.co.id</h4>
        <Card>
          <Content>
            <View auto column>
              <View style={style.grid}>
                <View auto row>
                  <View column width="20%">
                    <img src={iconRupiah} alt="Tarif Biaya Modal Lebih Efisien" style={style.gridImg} />
                  </View>
                  <View column width="76%">
                    <h3 style={style.noMargin}>Tarif Biaya Modal Lebih Efisien</h3>
                    <p>
                      Dengan tarif biaya gadai 0,7% per-minggu, Anda dapat menentukan sendiri
                      lama pinjaman sesuai kebutuhan Anda, dan membayar sesuai dengan
                      lama pinjaman yang Anda telah tentukan
                    </p>
                  </View>
                </View>
              </View>
              <View style={style.grid}>
                <View auto row>
                  <View column width="20%">
                    <img src={iconGroup} alt="Partner Yang Dapat Diandalkan" style={style.gridImg} />
                  </View>
                  <View column width="76%">
                    <h3 style={style.noMargin}>Partner Yang Dapat Diandalkan</h3>
                    <p>
                      Tersebar di seluruh Jakarta di manapun, kapanpun dan berapapun Anda membutuhkan dana cepat,
                      kami siap melayani Anda
                    </p>
                  </View>
                </View>
              </View>
              <View style={style.grid}>
                <View auto row>
                  <View column width="20%">
                    <img src={iconWatch} alt="Taksiran Online 24 Jam" style={style.gridImg} />
                  </View>
                  <View column width="76%">
                    <h3 style={style.noMargin}>Taksiran Online 24 Jam</h3>
                    <p>Anda dapat mengetahui estimasi taksiran atas barang jaminan Anda secara
                      online 24 jam setiap hari, sehingga Anda dapat merencanakan
                      dan mengatur keuangan secara lebih baik</p>
                  </View>
                </View>
              </View>
              <View style={style.grid}>
                <View auto row>
                  <View column width="20%">
                    <img src={iconPrivacy} alt="Privasi & Kenyamanan Transaksi" style={style.gridImg} />
                  </View>
                  <View column width="76%">
                    <h3 style={style.noMargin}>Privasi & Kenyamanan Transaksi</h3>
                    <p>
                      Kebutuhan pribadi hanya Anda yang berhak mengetahuinya, untuk itu kami
                      memastikan Anda merasa nyaman dalam bertransaksi dengan menjaga kerahasiaan data
                      dan keuangan Anda
                    </p>
                  </View>
                </View>
              </View>
              <View style={style.grid}>
                <View auto row>
                  <View column width="20%">
                    <img src={iconWatchSpeed} alt="Proses Lebih Mudah" style={style.gridImg} />
                  </View>
                  <View column width="76%">
                    <h3 style={style.noMargin}>Proses Lebih Mudah</h3>
                    <p>
                      Dengan akan dirilisnya layanan antar jemput barang jaminan, Kami memastikan
                      pelayanan yang lebih mudah dan praktis untuk Anda. Dan Kami juga hadir
                      dalam media website yang dapat diakses melalui perangkat apapun
                    </p>
                  </View>
                </View>
              </View>
              <View style={style.grid}>
                <View auto row>
                  <View column width="20%">
                    <img src={iconSecure} alt="Keamanan Terjaga" style={style.gridImg} />
                  </View>
                  <View column width="76%">
                    <h3 style={style.noMargin}>Keamanan Terjaga</h3>
                    <p>
                      Kami menyimpan barang jaminan Anda dengan tingkat keamanan yang tinggi serta
                      melindunginya dengan asuransi, sehingga Anda dapat memiliki kembali barang
                      kesayangan Anda seperti kondisi semula
                    </p>
                  </View>
                </View>
              </View>
            </View>
          </Content>
        </Card>
        <Spacer/>
        <h4 style={style.title}>Tarif Biaya Modal</h4>
        <Card>
          <Content>
            <div>
            {/*
              <Spacer/>
              <div style={style.textCenter}>
                <span style={style.textUppercase}>
                  <strong>Daftar Biaya Sewa modal</strong>
                </span><br/><br/>
                <span>Berikut ini adalah daftar biaya sewa modal yang dibayarkan satu kali saja sesuai lama pinjaman. Biaya sewa modal akan dipotong di depan saat pencairan, artinya <em>"Uang yang Anda terima = Nominal yang di pinjam - Biaya sewa modal X minggu"</em> dan <em>"Uang yang dikembalikan = Nominal yang di pinjam"</em></span>
              </div>
              <br/>
              <div>
                <Table selectable={false} bodyStyle={style.tableBody}>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                      <TableHeaderColumn style={style.tableColumnPrice}>Pinjaman</TableHeaderColumn>
                      <TableHeaderColumn style={style.tableColumnPrice}>9 Minggu</TableHeaderColumn>
                      <TableHeaderColumn style={style.tableColumnPrice}>10 Minggu</TableHeaderColumn>
                      <TableHeaderColumn style={style.tableColumnPrice}>11 Minggu</TableHeaderColumn>
                      <TableHeaderColumn style={style.tableColumnPrice}>12 Minggu</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn style={style.tableColumnPrice}>1.000.000</TableRowColumn>
                      <TableRowColumn style={style.tableColumnPrice}>63.000</TableRowColumn>
                      <TableRowColumn style={style.tableColumnPrice}>70.000</TableRowColumn>
                      <TableRowColumn style={style.tableColumnPrice}>77.000</TableRowColumn>
                      <TableRowColumn style={style.tableColumnPrice}>84.000</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>5.000.000</TableRowColumn>
                      <TableRowColumn>315.000</TableRowColumn>
                      <TableRowColumn>350.000</TableRowColumn>
                      <TableRowColumn>385.000</TableRowColumn>
                      <TableRowColumn>420.000</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>10.000.000</TableRowColumn>
                      <TableRowColumn>630.000</TableRowColumn>
                      <TableRowColumn>700.000</TableRowColumn>
                      <TableRowColumn>770.000</TableRowColumn>
                      <TableRowColumn>840.000</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>20.000.000</TableRowColumn>
                      <TableRowColumn>1.260.000</TableRowColumn>
                      <TableRowColumn>1.400.000</TableRowColumn>
                      <TableRowColumn>1.540.000</TableRowColumn>
                      <TableRowColumn>1.680.000</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>50.000.000</TableRowColumn>
                      <TableRowColumn>3.150.000</TableRowColumn>
                      <TableRowColumn>3.500.000</TableRowColumn>
                      <TableRowColumn>3.850.000</TableRowColumn>
                      <TableRowColumn>4.200.000</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>75.000.000</TableRowColumn>
                      <TableRowColumn>4.725.000</TableRowColumn>
                      <TableRowColumn>5.250.000</TableRowColumn>
                      <TableRowColumn>5.775.000</TableRowColumn>
                      <TableRowColumn>6.300.000</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>100.000.000</TableRowColumn>
                      <TableRowColumn>6.300.000</TableRowColumn>
                      <TableRowColumn>7.000.000</TableRowColumn>
                      <TableRowColumn>7.700.000</TableRowColumn>
                      <TableRowColumn>8.400.000</TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <br/><br/>
              <em>* Biaya asuransi dihitung dari harga pasar bukan nilai pinjaman</em><br/>
              <em>* Tabel di atas menunjukan pinjaman dengan minimal 60 hari, tarif bulanan
                kami adalah 2,8% per bulan atau sama dengan 33,6% per tahun (APR=33,6%) dan
                nasabah dapat memperpanjang lama pinjaman hingga sesuai dengan tabel modal yang
                ada di bawah</em><br/>

              <Spacer/>
              <Spacer/>
              <Spacer/>
              */}
              <div style={style.textCenter}>
                {/*
                <span style={style.textUppercase}>
                  <strong>Tarif Biaya Modal</strong>
                </span><br/><br/>
                */}
                <span>Besaran tarif biaya modal yang kami tentukan adalah sebagai berikut:</span>
              </div>
              <br />
              <Table selectable={false} bodyStyle={style.tableBody}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn style={style.tableColumnNumber}>No.</TableHeaderColumn>
                    <TableHeaderColumn style={style.tableColumnPriceLarge}>Biaya Modal</TableHeaderColumn>
                    <TableHeaderColumn style={style.tableColumnPrice}>Tarif</TableHeaderColumn>
                    <TableHeaderColumn style={style.tableColumnPriceLarge}>Jangka Waktu</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  <TableRow>
                    <TableRowColumn style={style.tableColumnNumber}>1.</TableRowColumn>
                    <TableRowColumn style={style.tableColumnPriceLarge}>Tarif Biaya Modal</TableRowColumn>
                    <TableRowColumn style={style.tableColumnPrice}>0,7%
                      <br />per minggu</TableRowColumn>
                    <TableRowColumn style={style.tableColumnPriceLarge}>12 Minggu</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>2.</TableRowColumn>
                    <TableRowColumn>Denda Keterlambatan</TableRowColumn>
                    <TableRowColumn>0,3%
                      <br />per minggu</TableRowColumn>
                    <TableRowColumn>4 Minggu</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>3.</TableRowColumn>
                    <TableRowColumn>Biaya Tambahan Perpanjangan</TableRowColumn>
                    <TableRowColumn>0,1%
                      <br />per minggu</TableRowColumn>
                    <TableRowColumn>4 Minggu</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn rowSpan="3">4.</TableRowColumn>
                    <TableRowColumn rowSpan="3">Biaya Asuransi*</TableRowColumn>
                    <TableRowColumn>0,1%</TableRowColumn>
                    <TableRowColumn>1-4 Minggu</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>0,12%</TableRowColumn>
                    <TableRowColumn>5-8 Minggu</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>0,15%</TableRowColumn>
                    <TableRowColumn>9-12 Minggu</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>5.</TableRowColumn>
                    <TableRowColumn>Biaya Antar Jemput Barang
                      <br />(jika ada)</TableRowColumn>
                    <TableRowColumn>{' '}</TableRowColumn>
                    <TableRowColumn>Menyesuaikan lokasi
                      <br />penjemputan barang</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
              <br /><br />
              {/*Bebas biaya administrasi sampai dengan 31 Desember 2016*/}
              <i>*) Biaya asuransi dihitung dari harga pasar bukan dari nilai pinjaman</i>
              <Spacer />
              <Spacer />
              <div style={style.textCenter}>
                <span>Ingin tahu perhitungan tarif biaya modal yang lebih mudah?
                <br />Coba simulasi pinjaman Anda pada taksiran online Kami.
                </span>
              </div>
              <Spacer />
              <div style={style.textCenter}>
                <Link to={'pawn-process'} offset={-100} smooth>
                  <Button label="Coba Gadai Sekarang" secondary />
                </Link>
                <Spacer />
              </div>
            </div>
          </Content>
        </Card>
        <Spacer />
      </Container>
    );
  }
}

Pawn.propTypes = {
  identity: PropTypes.object,
  simulationData: PropTypes.object,
  location: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool
};
