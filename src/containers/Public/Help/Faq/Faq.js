import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { Element, scroller } from 'react-scroll';
import injectSheet from 'react-jss';

import { Container, Header, Spacer, Link } from '../../../UI';

import styles from './faqStyles';
@injectSheet(styles)

export default class Faq extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired
  }
  state = {
    expandInfoPawn: true,
    expandInfoLoan: true
  }
  componentDidMount = () => {
    const { location } = this.props;

    if (location.query.q === 'pinjaman') {
      scroller.scrollTo('pinjaman', { smooth: true });
    }
  }
  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  handleExpandInfoPawn = (expanded) => this.setState({ expandInfoPawn: expanded });
  handleExpandInfoLoan = (expanded) => this.setState({ expandInfoLoan: expanded });

  render() {
    const { sheet: {
        classes
      } } = this.props;
    return (
      <Container>
        <Helmet
          title="Pertanyaan Yang Sering Diajukan" />
        <Spacer />
        <Header primaryText="Beberapa Pertanyaan Yang Sering Diajukan" />
        <Spacer />
        <Element name="gadai" />
        <Card
          expanded={this.state.expandInfoPawn}
          onExpandChange={this.handleExpandInfoPawn}>
          <CardHeader
            title="Gadai"
            titleStyle={classes.title}
            actAsExpander
            showExpandableButton />
          <Divider />
          <CardText className={classes.noPadding} expandable>
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>1. Bagaimana cara gadai di &nbsp;<strong>Pinjam.co.id</strong>&nbsp; ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Anda dapat melakukan gadai dengan mudah melalui 3 langkah, yaitu:<br />&nbsp;<ol>
                <li>Pilih kategori barang jaminan Anda, isi keterangan secara lengkap, taksiran
                  online atas barang jaminan Anda akan dihadirkan seketika.</li>
                <li>Pilih layanan serah terima barang menggunakan fasilitas antar jemput barang,
                  mengantar sendiri secara langsung atau temui penaksir kami. Kami akan memeriksa
                  barang Anda dan memberikan penawaran terbaik.</li>
                <li>Jika Anda setuju dengan penawaran kami, konfirmasi pinjaman Anda,
                  selanjutnya dana pinjaman akan kami cairkan melalui transfer bank saat itu juga.<br />&nbsp;</li>
              </ol>
              </div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>2. Apa saja syarat untuk melakukan gadai di &nbsp;<strong>Pinjam.co.id</strong>&nbsp; ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Syarat untuk bertransaksi di &nbsp;<strong>Pinjam.co.id</strong>&nbsp; antara lain:<ol>
                <li>Menjadi anggota dengan melengkapi semua data kenggotaan berdasarkan kartu
                  identitas (KTP) yang berlaku.</li>
                <li>Menyerahkan barang jaminan kepemilikan sendiri, bukan milik orang lain atau
                  organisasi tertentu.</li>
                <li>Bersedia membayar biaya asuransi untuk melindungi barang anda pada setiap
                  transaksi melalui &nbsp;<strong>Pinjam.co.id</strong>&nbsp;.</li>
                <li>Menyetujui dan menandatangani kontrak perjanjian gadai serta telah memahami
                  syarat dan ketentuan yang berlaku</li>
              </ol>
              </div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>3. Bagaimana cara melunasi barang gadai di &nbsp;<strong>Pinjam.co.id</strong>&nbsp; ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Pelunasan dapat dibayarkan melalui bank transfer pada rekening yang telah
                kami tentukan, selanjutnya konfirmasi pelunasan barang gadai pada halaman
                keanggotaan Anda. Anda juga dapat mempercepat pelunasan barang gadai tanpa
                adanya biaya pinalti.</div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>4. Apakah ada denda jika terlambat melakukan pelunasan saat jatuh tempo ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Ada, tarif denda yang dikenakan adalah tambahan tarif sebesar 0,3%
                perminggu. Kami menyarankan untuk memperpanjang pinjaman sebelum saat jatuh
                tempo, agar tidak dikenakan denda tarif keterlambatan 0,3% perminggu, tetapi
                dikenakan tarif perpanjangan yaitu 0,1% perminggu. Keterlambatan dan
                perpanjangan hanya berlaku maksimal 4 minggu. Jika melebihi masa tersebut kami
                berhak atas barang jaminan Anda.</div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>5. Berapa besar tarif biaya Gadai dari &nbsp;<strong>Pinjam.co.id</strong>&nbsp; ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Tarif dasar biaya Gadai kami adalah 0,7% per minggu. Detail tarif biaya
                Gadai dapat dilihat di halaman simulasi gadai.</div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>6. Adakah biaya tambahan yang dikenakan, selain tarif biaya Gadai ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Tambahan biaya lainnya selain tarif biaya Gadai yaitu biaya asuransi dan
                biaya penjemputan, jika memilih layanan antar jemput barang. Kami tidak
                membebankan biaya registrasi, administrasi dan provisi kepada pelanggan.</div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>7. Jenis barang Gadai apa yang diterima oleh &nbsp;<strong>Pinjam.co.id</strong>&nbsp; ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Jenis barang Gadai yang diterima adalah sepeda motor, mobil, laptop,
                handphone, tablet pc, kamera, perhiasan emas, kedepannya akan kami kembangkan
                untuk barang personal mewah.</div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>8. Berapa besaran nilai Gadai dari &nbsp;<strong>Pinjam.co.id</strong>&nbsp; ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Besaran nilai pencairan Gadai berkisar dari Rp 100.000,-sd Rp 100.000.000,-
                dalam satu kali transaksi Gadai. Proses penaksiran dilakukan oleh tenaga
                penaksir yang ahli di bidangnya.</div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>9. Apa saja program promo yang berlaku di &nbsp;<strong>Pinjam.co.id</strong>&nbsp; saat ini ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Adapun program promosi yang berlaku saat ini adalah:<ol>
                <li>Bebas biaya administrasi (berlaku sampai 31 Desember 2016)</li>
                <li>Gratis penyimpanan dan asuransi barang untuk &quot;Dana Siaga&quot; (berlaku
                  sampai 31 Desember 2016)</li>
                <li>Promo Pinjam tanpa Bunga dengan kode refferal (berlaku sampai 31 Desember 2016)</li>
              </ol>
              </div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>10. Berapa besar biaya antar jemput barang ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Berikut adalah besaran biaya antar jemput barang jaminan:<br /><br />Biaya
                adalah meliputi ambil dan antar kembali untuk alamat dalam wilayah area
                tersebut.<ol>
                  <li>DKI Jakarta: Rp. 35.000 ( Jakarta Selatan free )</li>
                  <li>Bogor: Rp 75.000,-</li>
                  <li>Depok: Rp 50.000,-</li>
                  <li>Tangerang: Rp 50.000,-</li>
                  <li>Bekasi: Rp 50.000,-&nbsp;<br />&nbsp;</li>
                </ol>
              </div>
            </div>
          </CardText>
        </Card>
        <Element name="pinjaman" />
        <Spacer />
        <Card
          expanded={this.state.expandInfoLoan}
          onExpandChange={this.handleExpandInfoLoan}>
          <CardHeader
            title="Pinjaman"
            titleStyle={classes.title}
            actAsExpander
            showExpandableButton />
          <Divider />
          <CardText className={classes.noPadding} expandable>
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>1. Bagaimana cara mengajukan Pinjaman di &nbsp;<strong>Pinjam.co.id</strong>&nbsp; ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Mengajukan pinjaman bisa dilakukan dengan cara mengisi formulir pada
                halaman Pinjaman Usaha, Pinjaman Talangan dan Pinjaman Karyawan atau mengirimkan
                email ke cs@pinjam.co.id atau menghubungi nomor berikut:<ul>
                  <li>Pinjaman Usaha: Safar (<Link href="tel:+6281291224956">081291224956</Link>)
                  atau Gugun (<Link href="tel:+6281297305332">081297305332</Link>)</li>
                  <li>Pinjaman Talangan: Rizqi (<Link href="tel:+6282125539993">082125539993</Link>)</li>
                  <li>Pinjaman Karyawan: Dedi (<Link href="tel:+6285697474016">085697474016</Link>)</li>
                </ul>
              </div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>2. Apa syaratnya mengajukan pinjaman ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Untuk syarat pengajuan pinjaman bisa dilihat &nbsp;
                <Link to="/pinjaman">di sini</Link>
              </div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>3. Berapa lama proses pencairan dana untuk Pinjaman ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Lama proses pencairan dana memakan waktu kurang lebih 2-3 hari. Kami akan
                melakukan survey terlebih dahulu terhadap barang jaminan anda.</div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>4. Apakah pinjaman di &nbsp;<strong>Pinjam.co.id</strong>&nbsp; menggunakan jaminan ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Ya, untuk produk pinjaman menggunakan jaminan. Untuk pinjaman karyawan,
                harus dilakukan kerjasama terlebih dahulu dengan perusahaan, untuk pinjaman
                talangan menggunakan jaminan invoice, untuk pinjaman usaha menggunakam jaminan
                BPKB Kendaraan Bermotor.</div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>5. Apakah Pinjaman dengan jaminan, konsumen wajib menitipkan barang yang
                dijaminkan ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Konsumen hanya menitipkan dokumen asli jaminannya saja.</div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>6. Berapa nominal maksimal yang dapat diajukan untuk produk Pinjaman dari &nbsp;
                <strong>Pinjam.co.id</strong>&nbsp; ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Nominal maksimal untuk pinjaman usaha adalah Rp 100.000.000,- , nominal
                maksimal untuk pinjaman talangan adalah Rp 500.000.000,- dan nominal maksimal
                untuk pinjaman karyawan adalah Rp 25.000.000,-</div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>7. Berapa besar tarif biaya Pinjaman dari &nbsp;<strong>Pinjam.co.id</strong>
              &nbsp; ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Besar biaya tarif Pinjaman untuk masing-masing jenis Pinjaman bergantung
                pada kesepakatan antara Pinjam Indonesia dengan pengguna. Pinjaman Usaha 1.75%
                perbulan, Pinjaman Talangan 1% perminggu atau 3% perbulan dan Pinjaman Karyawan
                1.9% perminggu.</div>
            </div>
            <Divider />
            <div className={classes.content}>
              <strong>Tanya:</strong><br /><br />
              <div>8. Siapa yang menanggung tarif biaya pada jenis Pinjaman Talangan ?</div>
              <br />
              <strong>Jawab:</strong><br /><br />
              <div>Yang menanggung tarif biaya Pinjaman adalah perusahaan yang meminjam ke &nbsp;
                <strong>Pinjam.co.id</strong>&nbsp;
              </div>
            </div>
          </CardText>
        </Card>
        <Spacer />
        <Spacer />
      </Container>
    );
  }
}

