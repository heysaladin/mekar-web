import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Card from 'material-ui/Card/Card';

import { Container, Header, Content, Spacer } from '../../../UI';

export default class TermsAndConditions extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }
  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }
  render() {
    return (
      <Container>
        <Helmet
          title="Syarat dan Ketentuan di Mekar Indonesia" />
        <Spacer />
        <Header primaryText="Syarat dan Ketentuan" />
        <Spacer />
        <Card>
          <Content>
            <h4>1. Pendahuluan</h4>
            <ol>
              <li>Terima kasih atas kunjungan Anda ke website kami, www.pinjam.co.id Kami
                berharap agar kunjungan Anda dapat bermanfaat dan memberi informasi yang
                diperlukan dalam mengakses dan menggunakan seluruh layanan yang kami sediakan.
                Kami terus menerus memperbaiki dan meningkatan mutu layanan kami, dan sangat
                menghargai segala kritik, saran dan masukan dari Anda. Anda dapat
                menyampaikannya ke Kami melalu cs@pinjam.co.id atau telepon di 021-27506800</li>

              <li>Website ini dimiliki, dioperasikan dan dikembangkan oleh PT. Bersama Pinjam
                Indonesia ("Kami" atau "pinjam.co.id"), perseroan terbatas yang berdiri atas
                dasar hukum Republik Indonesia melalui notaris H. Zaffrullah Hidayat, SH., M.Kn
                dengan nomor AHU-0006573.AH.01.01 pada tanggal 04 Februari 2016; Website dan
                Layanan Kami tersedia secara online melalui website www.pinjam.co.id atau mobile
                m.pinjam.co.id atau berbagai akses, media, perangkat dan platform lainnya, baik
                yang sudah atau akan tersedia dikemudian hari.</li>
            </ol>

            <h4>2. Umum</h4>
            <ol>
              <li>
                Dengan mengakses dan menggunakan website dan layanan Kami, Anda menyatakan telah
                membaca, memahami, menyetujui dan menyatakan tunduk pada syarat dan ketentuan
                penggunaan pinjam.co.id ini. Anda tidak dapat menyetujui syarat dan ketentuan
                penggunaan pinjam.co.id ini, baik secara keseluruhan ataupun sebagian, maka Anda
                tidak diperbolehkan untuk mengakses website ini ataupun menggunakan layanan yang
                kami sediakan.
              </li>

              <li>
                Syarat dan ketentuan penggunaan pinjam.co.id ini terdiri atas (i) syarat dan
                ketentuan umum yang berlaku untuk setiap akses dan Layanan yang tersedia pada
                website, dan (ii) syarat dan ketentuan khusus yang mengatur lebih lanjut
                ketentuan penggunaan produk atau layanan tertentu. Dalam hal ditemukan adanya
                perbedaan atau pertentangan antara syarat dan ketentuan umum dan syarat dan
                ketentuan khusus, maka yang berlaku adalah syarat dan ketentuan khusus.
              </li>

              <li>
                Syarat dan ketentuan penggunaan pinjam.co.id dapat kami lakukan pengubahan,
                modifikasi, tambah, hapus atau koreksi ("perubahan") setiap saat dan setiap
                perubahan itu berlaku sejak saat kami nyatakan berlaku atau pada waktu lain yang
                ditetapkan oleh kami; Anda Kami anjurkan untuk mengunjungi website kami secara
                berkala agar dapat mengetahui adanya perubahan tersebut.
              </li>
            </ol>

            <h4>3. Penggunaan</h4>
            <ol>
              <li>
                Website ini dan layanan yang tersedia didalamnya dapat digunakan oleh Anda hanya
                untuk penggunaan pribadi, non komersial, setiap saat tunduk pada syarat dan
                ketentuan yang saat itu berlaku dalam syarat dan ketentuan penggunaan
                pinjam.co.id
              </li>

              <li>
                Website ini dan produk-produk, teknologi dan proses yang terdapat atau
                terkandung dalam website, dimiliki oleh kami atau pihak ketiga yang memberi hak
                kepada kami. Kecuali untuk penggunaan yang secara tegas diijinkan dan
                diperbolehkan dalam syarat dan ketentuan penggunaan pinjam.co.id ini, Anda tidak
                memiliki ataupun menerima dan pinjam.co.id tidak memberikan hak lain apapun ke
                Anda atas website ini, berikut dengan segala data, informasi dan konten
                didalamnya.
              </li>

              <li>
                Dengan menggunakan website ini atau Layanan yang tersedia didalamnya, maka Anda
                menyatakan setuju tidak akan men-download, menayangkan atau mentransmisi dengan
                cara apa pun, dan atau membuat konten apa pun tersedia untuk umum yang tidak
                konsisten dengan penggunaan yang diijinkan dalam syarat dan ketentuan penggunaan
                pinjam.co.id ini.
              </li>

              <li>
                Dalam website ini mungkin terdapat link (tautan) ke website yang dikelola oleh
                pihak ketiga ("Situs Eksternal"). Situs Eksternal disediakan hanya untuk
                referensi dan kenyamanan saja. pinjam.co.id tidak mengoperasikan, mengendalikan
                atau mendukung dalam bentuk apa pun situs eksternal yang bersangkutan ataupun
                konten/isinya. Anda bertanggung jawab penuh atas penggunaan situs eksternal
                tersebut dan dianjurkan untuk mempelajari syarat dan ketentuan dari situs
                eksternal itu secara seksama.
              </li>

              <li>
                Layanan yang tersedia dalam website ini secara umum menggunakan sistem re-
                marketing dan sistem cookies yang memungkinkan pihak ketiga (termasuk dan tidak
                terbatas pada Google) mengakses dan menggunakan data kunjungan dalam sistem
                cookies website ini untuk menampilkan dan menayangkan kembali tiap iklan
                pinjam.co.id melalui internet.
              </li>

              <li>
                Anda tidak boleh membuat link, melakukan screen capture atau data crawling ke
                website tanpa adanya persetujuan tertulis sebelumnya dari pinjam.co.id Hal-hal
                tersebut dianggap sebagai pelanggaran hak milik intelektual pinjam.co.id
              </li>
            </ol>

            <h4>4. Layanan pinjam.co.id</h4>
            <ol>
              <li>
                pinjam.co.id menyediakan dan mengembangkan sistem pinjaman keuangan melalui
                gadai secara terpadu ("Layanan"), yang dapat menerima barang jaminan gadai atas
                kepemilikan langsung ; Kendaraan bermotor (sepeda motor, mobil), Barang
                elektronik (laptop, kamera, handphone), Logam mulia (Emas batangan, perhiasan),
                dan Barang personal mewah (tas bermerek, jam tangan) ("Produk") yang
                memungkinkan Anda untuk menitipkan barang jaminan gadai untuk periode tertentu,
                menerima taksiran nilai pinjaman, serta menerima pinjaman melalui berbagai
                sistem dan fasilitas pembayaran yang tersedia (ï¿½Transaksiï¿½)
              </li>
              <li>
                Layanan kami secara umum dapat tersedia secara online selama dua puluh empat jam
                sehari dan tujuh hari dalam seminggu; kecuali dalam hal adanya perbaikan,
                peningkatan atau pemeliharaan pada website kami.
              </li>
              <li>
                Transaksi kami dapat dilakukan pada kantor-kantor resmi kami atau kantor yang
                diselenggarakan oleh pihak ketiga ("Mitra") yang telah mengadakan kerjasama dan
                telah mengadakan ikatan, baik secara langsung ataupun tidak langsung, dengan
                Kami. Anda memahami dan mengakui bahwa:
              </li>
              <ol>
                <li>
                  Transaksi layanan gadai produk yang Anda lakukan melalui pinjam.co.id, merupakan
                  hubungan hukum dan kontrak yang mengikat antara Anda dan pinjam.co.id baik
                  secara langsung atau melalui Mitra.
                </li>
                <li>
                  Data dan informasi terkait dengan Produk tertentu yang kami cantumkan pada
                  website merupakan data dan informasi yang kami kembangkan dari berbagai aturan
                  dan mekanisme yang berlaku, dan kami mempublikasikan data dan informasi tersebut
                  dengan itikad baik sesuai dengan aturan yang berlaku.
                </li>
                <li>
                  Kami memiliki kendali atas data dan informasi yang diberikan oleh Mitra, dan
                  Kami tidak menjamin bahwa data dan informasi yang disajikan adalah akurat,
                  lengkap, atau benar, dan terbebas dari kesalahan.
                </li>
              </ol>

              <li>
                Anda tidak diperbolehkan untuk melakukan transaksi layanan gadai atas
                produk-produk yang bukan merupakan kepemilikan Anda secara langsung. Jika
                terjadi perkara yang timbul dari kepemilikan ganda atas barang jaminan maka Anda
                yang akan bertanggung jawab secara penuh dan menyelesaikan hal tersebut hingga
                selesai. Biaya yang timbul atas perkara tersebut akan dibebankan kepada Anda.
              </li>

              <li>
                Anda tidak diperbolehkan menggunakan, menyalin, mengawasi, menampilkan, men-
                download, atau mereproduksi konten atau informasi, piranti lunak, atau layanan
                apa pun yang tersedia di website kami untuk kegiatan atau tujuan komersial
                apapun, tanpa persetujuan tertulis dari kami sebelumnya.
              </li>

              <li>
                Anda dapat menggunakan Website dan Layanan yang tersedia untuk membuat taksiran
                atas barang jaminan milik Anda yang sah. Anda tidak diperbolehkan untuk membuat
                pemesanan/pemesanan untuk tujuan spekulasi, tidak benar atau melanggar hukum.
                Jika Kami menemukan atau sewajarnya menduga bahwa pemesanan/pemesanan yang Anda
                buat ternyata tidak sah, maka Kami mencadangkan hak untuk membatalkan transaksi
                Anda.
              </li>

              <li>
                Anda juga menjamin bahwa data dan informasi yang Anda berikan ke Kami,baik
                sehubungan dengan transaksi ataupun pendaftaran pada pinjam.co.id, adalah data
                dan informasi yang akurat, terkini dan lengkap. Untuk ketentuan penggunaan data
                dan informasi yang Anda berikan, silakan untuk merujuk pada kebijakan penggunaan
                data.
              </li>
            </ol>

            <h4>5. Transaksi Produk</h4>
            <ol>
              <li>
                Transaksi gadai Produk dianggap berhasil atau selesai setelah Anda melakukan
                tanda tangan kontrak gadai dan perjanjian pengalihan barang jaminan secara
                resmi. Kami akan memberikan notifikasi transaksi ke Anda dan melakukan proses
                pencairan dana ke rekening tujuan milik Anda. Apabila terjadi perselisihan atau
                permasalahan, maka data yang terdapat pada pinjam.co.id akan menjadi acuan utama
                dan dianggap sah.
              </li>

              <li>
                Dengan menyelesaikan transaksi produk, maka Anda dianggap setuju untuk menerima:
                (i) email yang akan kami kirim tidak lama atas notifikasi pelaksanaan transfer
                pencairan dana pinjaman beserta informasi lainnya yang lengkap dan terperinci
                (ii) email yang akan Kami kirim tidak lama setelah tanggal pelayanan untuk
                mengundang Anda untuk melengkapi formulir ulasan penggunaan layanan transaksi
                kami. Selain dari konfirmasi email yang menyediakan konfirmasi pemesanan dan
                email-email yang telah Anda pilih sendiri, kami tidak akan mengirimi Anda
                pemberitahuan (yang diinginkan maupun yang tidak), email, korespondensi lebih
                lanjut, kecuali jika diminta secara khusus oleh Anda. Selain itu kami akan
                melakukan pencatatan pada akun milik Anda di website kami secara lengkap dan
                terperinci.
              </li>

              <li>
                Dengan menyelesaikan transaksi produk, maka Anda dianggap setuju untuk menerima:
                (i) email yang akan kami kirimkan tidak lama sebelum tanggal jatuh tempo
                pinjaman Anda berakhir (ii) sambungan telepon tidak lama sebelum tanggal jatuh
                tempo pinjaman Anda berakhir (iii) penagih hutang jika dua tindakan kami tidak
                di lakukan pembayaran sesuai kesepakatan. Selain itu kami berhak juga untuk
                melakukan tindakan atas barang jaminan Anda secara langsung jika Anda belum
                melakukan pengembalian pinjaman yang telah melewati batas jatuh tempo.
              </li>
            </ol>

            <h4>6. Tarif biaya modal</h4>
            <ol>
              <li>
                Kami selalu berupaya untuk menyediakan tarif biaya modal terbaik atas transaksi
                yang Anda lakukan. Tarif biaya modal yang tertera mungkin memiliki syarat dan
                ketentuan khusus, jadi Anda harus memeriksa sendiri dan memahami syarat dan
                ketentuan khusus yang berlaku terhadap suatu tarif tertentu sebelum Anda
                melakukan transaksi. Anda juga perlu memeriksa dan memahami ketentuan mengenai
                pembatalan transaksi dan pengembalian dana yang secara khusus yang kami terapkan
                sebagai aturan mengikat.
              </li>

              <li>
                Tarif biaya modal yang tercantum belum termasuk pajak dan asuransi yang akan
                kami uraian secara tegas pada website atau surat konfirmasi. Tarif biaya modal
                tersebut berlaku satu dan sama besarannya antara kami dan atau mitra kami.
              </li>

              <li>
                pinjam.co.id berhak untuk mengubah tarif biaya modal atas produk setiap saat
                tanpa pemberitahuan sebelumnya, namun tetapi transaksi yang sudah terjadi
                sebelum tanggal perubahan maka berlaku tetap kententuan tarif biaya yang
                sebelumnya.
              </li>
            </ol>

            <h4>
              7. Proses pencairan dan pengembalian pinjaman</h4>
            <ol>
              <li>
                Proses pencairan transaksi pinjaman dilakukan melalui bank transfer setelah
                tandatangan perjanjian kepada akun bank Anda secara langsung. Setelah kami
                melakukan proses pencairan dana pinjaman kami akan kirimkan email pemberitahuan
                dan mengupdate status aktif pinjaman Anda. Kami tidak melakukan proses pencairan
                dana secara cash langsung kepada peminjam.
              </li>
              <li>
                Proses pengembalian pinjaman juga dilakukan bank transfer kepada akun bank resmi
                kami, Anda wajib melakukan konfirmasi di akun pinjaman Anda setelah melakukan
                transfer pengembalian pinjaman.
              </li>

              <li>
                Proses pencairan dan pengembalian pinjaman bersifat satu metode yang sama baik
                oleh pinjam atau mitra pinjam.
              </li>
            </ol>

            <h4>
              8. Perubahan dan Pembatalan</h4>
            <ol>
              <li>
                Kecuali secara tegas dinyatakan lain dalam syarat dan ketentuan penggunaan
                pinjam.co.id ini, semua transaksi layanan produk pinjam.co.id tidak dapat
                diubah, dibatalkan, dikembalikan uang, ditukar atau dialihkan ke orang/pihak
                lain.
              </li>

              <li>
                Dengan melakukan transaksi layanan produk di pinjam.co.id, Anda dianggap telah
                memahami, menerima dan menyetujui kebijakan dan ketentuan pembatalan, serta
                segala syarat dan ketentuan tambahan yang diberlakukan oleh kami dan mitra. Kami
                akan mencantumkan kebijakan dan ketentuan pembatalan tersebut di setiap surat
                konfirmasi yang Kami kirim ke Anda.
              </li>
            </ol>

            <h4>9. Keamanan</h4>
            <ol>
              <li>
                Pada saat Anda membuat taksiran produk atas barang jaminan Anda kami memastikan
                keamanan atas akses Secure Server Layer (SSL) yang akan mengenkripsi informasi
                yang Anda kirimkan melalui Website ini. Surat konfirmasi terbatas hanya akan
                kami kirimkan kepada Anda selaku pemiliki barang jaminan.
              </li>

              <li>
                Walaupun pinjam.co.id akan menggunakan upaya terbaik untuk memastikan
                keamanannya, pinjam.co.id tidak bisa menjamin seberapa kuat atau efektifnya
                enkripsi ini dan pinjam.co.id tidak dan tidak akan bertanggung jawab atas
                masalah yang terjadi akibat pengaksesan tanpa ijin dari informasi yang Anda
                sediakan.
              </li>

              <li>
                Penyimpanan barang jaminan Anda akan kami jaga dari keamanannya menggunakan
                keamanan yang sistematis. Kami mengajurkan untuk Anda melengkapi keamanan
                penyimpanan barang jaminan Anda menggunakan asuransi tambahan.
              </li>

              <li>
                Kami tidak bertanggung-jawab ataupun menanggung kerugian Anda dalam hal kami
                tidak dapat menyerahkan barang jaminan Anda atau memberi Layanan kepada Anda,
                akibat dari hal-hal yang terjadi akibat keadaan memaksa atau yang diluar
                kekuasaan Kami atau mitra pinjam untuk mengendalikan, seperti, tapi tidak
                terbatas pada: perang, kerusuhan, teroris, perselisihan industrial, tindakan
                pemerintah, bencana alam, kebakaran atau banjir, cuaca ekstrim, dan lain
                sebagainya.
              </li>
            </ol>

            <h4>10. Kebijakan Penggunaan Data</h4>
            <ol>
              <li>
                Kami menganggap privasi Anda sebagai hal yang penting.
              </li>
              <li>
                Pada saat Anda melakukan pendaftaran dan atau persiapan sebelum transaksi, kami
                akan mencatat dan menyimpan informasi dan data pribadi Anda. Pada prinsipnya,
                data Anda akan Kami gunakan untuk menyediakan Produk dan memberi Layanan kepada
                Anda. Kami akan menyimpan setiap data yang Anda berikan, dari waktu ke waktu,
                atau yang Kami kumpulkan dari penggunaan produk dan layanan Kami. Data pribadi
                Anda yang ada pada Kami, dapat Kami gunakan untuk keperluan akuntansi, tagihan,
                audit, verifikasi kredit atau pembayaran, serta keperluan security, administrasi
                dan legal, reward points atau bentuk sejenisnya, pengujian, pemeliharaan dan
                pengembangan sistem, hubungan pelanggan, promosi, dan membantu kami dikemudian
                hari dalam memberi pelayanan kepada Anda. Sehubungan dengan itu, Kami dapat
                mengungkapkan data Anda kepada group perusahaan di mana pinjam.co.id tergabung
                didalamnya, Mitra penyedia Produk, perusahaan lain yang merupakan rekanan dari
                pinjam.co.id, perusahaan pemroses data yang terikat kontrak dengan Kami, dan
                badan pemerintah dan badan peradilan yang berwenang, di jurisdiksi manapun.
              </li>
            </ol>

            <h4>11. Penolakan Tanggung-Jawab</h4>
            <ol>
              <li>
                Seluruh data, informasi, atau konten dalam bentuk apapun yang tersedia pada
                website ini disediakan seperti apa adanya dan tanpa ada jaminan.
              </li>

              <li>
                Anda mengakui, setuju dan sepakat bahwa Anda menanggung sendiri segala bentuk
                resiko atas penggunaan Website dan Layanan. Lebih lanjut, Anda mengakui, setuju
                dan sepakat bahwa pinjam.co.id, termasuk setiap direktur, pejabat, pegawai,
                Mitra dan pihak lain manapun yang bekerjasama dengan pinjam.co.id, tidak
                bertanggung-jawab atas dan tidak memberi jaminan terhadap:
              </li>
              <ol>
                <li>
                  Segala hal yang berkaitan dengan website ini termasuk tapi tidak terbatas pada
                  pengoperasian atau keakurasian data, kelayakan, kelengkapan data.
                </li>

                <li>
                  baik yang tersirat maupun tersurat, termasuk jaminan yang tersirat dari
                  pembelian atau kepatutan dari tujuan tertentu atau kelayakan untuk
                  diperdagangkan;
                </li>

                <li>
                  Kehilangan atau kerusakan, baik langsung, tidak langsung, khusus, yang bersifat
                  konsekuensial atau termasuk kehilangan keuntungan, reputasi,
                  kerusakan/kehilangan data, kerusakan koneksi yang tak dapat diperbaiki akibat
                  penggunaan atau ketidakmampuan menggunakan website ini baik yang berdasarkan
                  hukum atau hal lain bahkan ketika kita diinformasikan mengenai kemungkinan-
                  kemungkinan tersebut;
                </li>

                <li>
                  Akses Anda terhadap website, berikut dengan kerusakan yang mungkin timbul akibat
                  akses Anda ke website atau situs eksternal. Akses tersebut merupakan
                  tanggung-jawab Anda sendiri dan Anda sendiri yang harus memastikan bahwa Anda
                  terbebas dan terlindungi dari virus atau hal lain yang mungkin mengganggu atau
                  merusak pengoperasian sistem komputer Anda.
                </li>
              </ol>

              <li>
                Sejauh yang dimungkinkan secara hukum, tanggung-jawab dan kerugian yang dapat
                ditanggung oleh pinjam.co.id, baik untuk satu kejadian ataupun serangkaian
                kejadian yang saling terhubung, yang timbul dari kerugian yang secara langsung
                diderita oleh Anda, sebagai akibat dari kesalahan pinjam.co.id, adalah terbatas
                sampai dengan jumlah total biaya yang telah Anda bayar lunas sebagaimana
                tercantum dalam Surat Konfirmasi.
              </li>
            </ol>

            <h4>12. Lain-lain</h4>
            <ol>
              <li>
                Versi asli berbahasa Indonesia dari syarat dan ketentuan penggunaan pinjam.co.id
                ini dimungkinkan untuk diterjemahkan ke bahasa-bahasa lain. Versi terjemahan
                dibuat hanya untuk memberi kemudahan saja, dan tidak bisa dianggap sebagai
                terjemahan resmi. Jika ditemukan adanya perbedaan antara versi bahasa Indonesia
                dan versi bahasa lainnya dari syarat dan ketentuan ini, maka yang berlaku dan
                mengikat adalah versi bahasa Indonesia.
              </li>

              <li>
                Website ini dibuat dan dikontrol oleh pinjam.co.id di Indonesia dan oleh dengan
                demikian tunduk dan diatur atas dasar hukum Indonesia. Menyangkut syarat dan
                ketentuan penggunaan pinjam.co.id ini dan segala konsekuensinya, Anda dan Kami
                memilih domisili hukum yang umum dan tetap di pengadilan negeri Jakarta Selatan.
              </li>

              <li>
                Apabila ada bagian tertentu dari syarat dan ketentuan penggunaan pinjam.co.id
                ini yang dianggap tidak sah atau tidak dapat berlaku, maka bagian tertentu
                ketentuan itu dianggap terhapus dan ketentuan lainnya tetap berlaku dan
                mengikat.
              </li>
            </ol>
          </Content>
        </Card>
        <Spacer />
      </Container>
    );
  }
}
