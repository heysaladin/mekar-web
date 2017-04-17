import React, { Component, PropTypes } from 'react';
import { Card, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Helmet from 'react-helmet';
import Snackbar from 'material-ui/Snackbar';
import injectSheet from 'react-jss';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import { Container, Content, Spacer, Button } from '../../UI';
import listPartners from '../../../data/branch.json';
import imageBanner from './partners-banner.jpg';
import PartnersForm from './PartnersForm';

import styles from './partnersStyles';
@injectSheet(styles)

export default class Partners extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired
  }

  state = {
    message: 'Pendaftaran Mitra Berhasil. Cek email anda untuk langkah selanjutnya.',
    openDialog: false,
    openFlashMessage: false
  }

  getPartners = () => {
    const partners = [];
    let idx = 0;

    listPartners
      .branchs
      .map((branch) => {
        if (branch.isMitra && branch.visible !== false) {
          ++idx;
          branch.number = idx;
          partners.push(branch);
        }
        return branch;
      });

    return partners;
  }

  handleOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  }

  handleActionClose = () => {
    this.setState({ openFlashMessage: false });
  }

  handleSuccess = () => {
    this.setState({ openDialog: false, openFlashMessage: true });
  }

  render() {
    const { sheet: {
        classes
      } } = this.props;
    return (
      <div>
        <Container>
          <Helmet
            title="Mitra Pinjam Indonesia" />
          <Spacer />
          <Card>
            <CardMedia><img src={imageBanner} alt="" /></CardMedia>
            <Content className={classes.bannerContent}>
              <p className={classes.titleLineHeight}>
                Bergabunglah menjadi&nbsp;
                <strong>Mitra</strong>&nbsp;operator
                <br />
                <strong>Pinjam Indonesia</strong>
              </p>
              <Button label="Daftar Mitra" secondary onTouchTap={this.handleOpen} />
              <br />
            </Content>
            <Divider />
            <Content>
              <h2 className={classes.title}>Mitra Pinjam</h2>
              <hr className={classes.titleBorder} />
              <br />
              <p>Anda ingin mendapatkan bisnis model tambahan bagi perusahaan / toko Anda?<br /><br />
                Anda ingin mengembangkan pelanggan Anda melalui teknologi IT tetapi terbatas
                modal dan kemampuan?<br /><br />
                Anda ingin mendapatkan tambahan keuntungan dengan mekanisme yang mudah dan tanpa
                resiko?<br /><br />
                Bergabunglah sekarang juga menjadi mitra operator Pinjam Indonesia yang
                mengembangkan Pinjam.co.id, sebuah platform online yang membantu pelanggan untuk
                mendapatkan dana cepat secara mudah, murah dan aman.<br /><br />
                Mitra Operator Pinjam merupakan program kemitraan antara Pinjam Indonesia dengan
                mitra operator yang strategis untuk dapat menjangkau pelanggan lebih baik dan
                memberikan keuntungan kepada mitra operator.
              </p>
            </Content>
            <Divider />
            <Content>
              <h2 className={classes.title}>Syarat dan Ketentuan Mitra Pinjam</h2>
              <hr className={classes.titleBorder} />
              <h4>Kriterian Calon Mitra</h4>
              <ol>
                <li>Perusahaan dagang atau jasa yang berupa toko emas, koperasi simpan pinjam,
                  toko handphone, toko kamera, toko laptop dan atau minimarket dengan customer
                  base dan memiliki existing business yang berjalan.</li>
                <li>Telah beroperasi selama 2 tahun atau lebih pada suatu daerah tertentu atau
                  nasional.</li>
                <li>Memiliki kemauan dalam pengembangan bisnis model lain (secured loans/gadai)
                  serta membuka diri atas teknologi yang sedang dikembangkan oleh Pinjam.co.id.</li>
                <li>Memiliki jaringan toko lebih dari dua pada suatu daerah dan juga karyawan
                  yang memiliki kemampuan dalam penaksiran barang jaminan dari calon pelanggan.</li>
                <li>Lokasi usaha merupakan lokasi bisnis milik WNI dengan dibuktikan oleh ijin
                  mendirikan bangunan, surat menyewa /kontrak serta akses yang baik. Lokasi usaha
                  diutamakan pada pinggir jalan dengan potensi traffic pelanggan yang cukup
                  banyak.</li>
                <li>Keuangan/ Laporan keuangan menyerahkan rekening Koran 3-6 bulan terakhir
                  dengan acuan positif sesuai standar acuan kreditnya.</li>
                <li>Administrasi data merupakan kelengkapan data administrasi yang diminta
                  sesuai data di bawah.</li>
              </ol>

              <h4>Langkah-langkah</h4>
              <ol>
                <li>Mengisi formulir permohonan menjadi Mitra Operator pada website
                  www.pinjam.co.id.</li>
                <li>Menyetujui Nota Kesepemahaman (MoU) yang juga merupakan perjanjian kerjasama
                  awal dan berlaku selama masa percobaan (1 tahun).</li>
                <li>Memiliki Badan usaha/ Badan Hukum berbentuk Koperasi Simpan Pinjam, UD, CV
                  atau Perseroan Terbatas.</li>
                <li>Memiliki dan menyerahkan foto copy administrasi Badan Usaha/Badan Hukum,
                  meliputi:
                  <ul>
                    <li>Akte Pendirian Perusahaan yang telah disahkan oleh Pejabat berwenang berikut
                      perubahan-perubahannya (bila ada)</li>
                    <li>Foto copy KTP pemohon yang masih berlaku sebanyak 2 (dua) lembar.</li>
                    <li>Foto copy Surat Keterangan Domisili Perusahaan yang masih berlaku sebanyak 2
                      (dua) lembar.</li>
                    <li>Foto copy Surat Ijin Usaha (SIUP) yang masih berlaku sebanyak 2 (dua) lembar.</li>
                    <li>Foto copy Tanda Daftar Perusahaan (TDP) yang masih berlaku sebanyak 2(dua)
                      lembar.</li>
                    <li>Foto copy NPWP Perusahaan/Surat Pengukuhan PKP/Surat keterangan terdaftar
                      DIRJEN PAJAK sebanyak 2(dua) lembar.</li>
                  </ul>
                </li>
                <li>Bersedia menyediakan modal pinjaman sebesar Rp 50,000,000. yang kedepannya
                  akan digunakan sebagai modal pinjaman</li>
                <li>Menyerahkan Surat Pernyataan diatas materai 6000 dengan Kop Surat
                  Perusahaan, yang berisi pernyataan tidak sedang terkait dengan pihak lain yang
                  memiliki usaha sejenis dengan Pinjam Indonesia dan bersedia menjaga seluruh
                  rahasia bisnis, data dan informasi dari Pinjam Indonesia.</li>
              </ol>

              <h4>Hak dan Kewajiban Mitra Operator</h4>
              <ol>
                <li>Memberikan ijin penggunaan toko/lokasi usaha untuk menjadi lokasi distribusi
                  Pinjam Indonesia.</li>
                <li>Melakukan kerjasama dan tanggung jawab sebagai mitra operator sesuai dengan
                  aturan yang berlaku.</li>
                <li>Melakukan pengecekan dan penyimpanan atas barang jaminan pelanggan yang ada.</li>
                <li>Melakukan penyetoran deposit Rp 50,000,000 untuk deposit dan modal pinjaman
                  kepada pelanggan.</li>
                <li>Memperoleh akses sistem platform online dari Pinjam.co.id serta penyampaian
                  pembelajarannya dan manual kit system tersebut.</li>
                <li>Memperoleh leads generations dan pelanggan baru untuk transaksi melalui
                  mitra operator.</li>
                <li>Memperoleh bagi hasil 80% dari biaya pinjaman, perpanjangan, dan keterlambatan.</li>
              </ol>

              <h4>Hak dan Kewajiban Pinjam Indonesia</h4>
              <ol>
                <li>Memberikan ijin penggunaan akses system platform online dari Pinjam.co.id
                  beserta pembelajarannya dan manual kit system tersebut</li>
                <li>Memberikan bisnis model tambahan, leads generations dan pelanggan baru untuk
                  melakukan transaksi.</li>
                <li>Mengelola komunikasi pemasaran nasional dan lokal serta memastikan banyaknya
                  customer yang potensial.</li>
                <li>Menerima ijin penggunaan toko/lokasi usaha dari mitra operator untuk menjadi
                  lokasi distribusi Pinjam Indonesia.</li>
                <li>Melakukan inisiasi proyeksi pendapatan, revenue dan lainnya.</li>
                <li>Melakukan pengecekan dan penyimpanan atas barang jaminan pelanggan yang ada.</li>
                <li>Memperoleh bagi hasil 20% dari biaya pinjaman, perpanjangan, keterlambatan
                  serta 100% dari biaya pick up services ataupun biaya lainnya yang dikembangkan
                  kedepannya.</li>
                <li>Melakukan pelayanan pelanggan secara online, melakukan likuidasi jika ada
                  pinjaman yang tidak dibayar.</li>
                <li>Menyediakan satu account / relationship manager untuk mitra operator.</li>
              </ol>
            </Content>
            <Divider />
            <Content>
              <h2 className={classes.title}>Mekanisme Mitra Pinjam</h2>
              <hr className={classes.titleBorder} />
              <ol>
                <li>Calon pelanggan mengajukan permohonan pinjaman melalui desktop, mobile web
                  versions, mobile apps, atau call centre.</li>
                <li>Calon pelanggan dapat melakukan serah terima barang jaminan melalui pick up
                  services, kirim langsung ke toko atau mitra operator kami, serta datangi
                  langsung penaksir kami di tempat-tempat yang telah kami tentukan.</li>
                <li>Penaksir atau mitra operator kami akan melakukan pengecekan atas barang
                  jaminan dan memberikan konfirmasi final kepada calon pelanggan untuk disetujui.</li>
                <li>Jika pelanggan telah meyetujui konfirmasi pinjaman, maka Pinjam akan
                  melakukan pencairan kepada pelanggan dan memberikan pemberitahuan kepada
                  pelanggan dan mitra operator.</li>
                <li>Mitra operator melakukan penyimpanan barang jaminan s/d pelanggan melakukan
                  pembayaran dan Pinjam memberitahukan bahwa pembayaran pinjaman telah dilakukan
                  oleh pelanggan sehingga pelanggan dapat memiliki barang jaminannya kembali.</li>
              </ol>
            </Content>
            <Divider />
            <Content>
              <h2 className={classes.title}>Daftar Nama Mitra Pinjam</h2>
              <hr className={classes.titleBorder} />
              <a name="daftar-mitra">&nbsp;</a>
              <Table selectable={false} bodyStyle={classes.tableBody}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn className={classes.tableColumnNumber}>No</TableHeaderColumn>
                    <TableHeaderColumn className={classes.tableColumnPriceLarge}>Nama Toko</TableHeaderColumn>
                    <TableHeaderColumn className={classes.tableColumnPriceLarge}>Alamat</TableHeaderColumn>
                    <TableHeaderColumn className={classes.tableColumnPrice}>Nama PIC</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                {listPartners && <TableBody displayRowCheckbox={false}>
                  {this
                    .getPartners()
                    .map((partner) => <TableRow key={`partner-${partner.number}`}>
                      <TableRowColumn className={classes.tableColumnNumber}>{partner.number}</TableRowColumn>
                      <TableRowColumn className={classes.tableColumnPriceLarge}>{partner.name}</TableRowColumn>
                      <TableRowColumn className={classes.tableColumnPriceLarge}>{partner.address}</TableRowColumn>
                      <TableRowColumn className={classes.tableColumnPrice}>{partner.picName}</TableRowColumn>
                    </TableRow>)}
                </TableBody>}
              </Table>
            </Content>
          </Card>
          <Spacer />
        </Container>
        <Dialog
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
          bodyStyle={{
            boxShadow: 'none'
          }}
          style={{
            boxShadow: 'none'
          }}
          contentStyle={{
            width: '90%',
            maxWidth: 'none'
          }}>
          <PartnersForm onHandleSuccess={this.handleSuccess} onClose={this.handleClose} />
        </Dialog>
        <Snackbar
          open={this.state.openFlashMessage}
          message={this.state.message}
          action="OK"
          onActionTouchTap={this.handleActionClose}
          autoHideDuration={6000}
          onRequestClose={this.handleActionClose}
          style={{
            width: '100%'
          }}
          bodyStyle={{
            position: 'fixed',
            bottom: '-50%',
            width: '100%',
            maxWidth: 'none'
          }} />
      </div>
    );
  }
}
