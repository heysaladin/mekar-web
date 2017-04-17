import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

import { slugify } from 'utils/filter';
import { Container, Header, Content, Spacer } from '../../UI';

import photoAbu from './photo/abu_dzar_nicola.jpg';
import photoDavid from './photo/david_christian_subroto.jpg';
import photoFanni from './photo/fanni_supenda.jpg';
import photoRamadan from './photo/ramadan_satria_sentana.jpg';
import photoSayyindah from './photo/sayyindah_hqk_gading.jpg';
import photoSiti from './photo/siti_munawaroh.jpg';

import styles from './testimonialsStyles';
@injectSheet(styles)

export default class Testimonials extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired
  }

  render() {
    const { sheet: {
        classes
      } } = this.props;
    const testimonials = [
      {
        photo: photoSiti,
        name: 'SITI MUNAWAROH',
        title: 'Ibu Rumah Tangga',
        message: 'Alhamdulillah, berkat pinjam usaha saya bisa berkembang, terimakasih Pinjam.'
      }, {
        photo: photoDavid,
        name: 'DAVID',
        title: 'Pengusaha',
        message: 'Sangat membantu, bunga ringan, dan proses cepat gak ribet.'
      }, {
        photo: photoRamadan,
        name: 'RAMADAN SATRIA SENTANA',
        title: 'Mahasiswa',
        message: 'Sangat membantu pada saat ada kebutuhan mendesak.'
      }, {
        photo: photoFanni,
        name: 'FANNI SUPENDA',
        title: 'Karyawan',
        message: 'Pinjam ok, sangat membantu, bunga ringan, proses cepat, terima kasih Pinjam, maj' +
            'u terus.'
      }, {
        photo: photoSayyindah,
        name: 'SAYYINDAH HQK GADING',
        title: 'Pengusaha',
        message: 'Pinjam sangat membantu saya di saat saya membutuhkan uang dengan bunga yang sang' +
            'at ringan.'
      }, {
        photo: photoAbu,
        name: 'ABU DZAR NICOLA',
        title: 'Karyawan',
        message: 'Pinjam oke banget, ga ribet, prosesnya cepet, recommended banget buat yang perlu' +
            ' dana cepat.'
      }
    ];

    return (
      <Container>
        <Helmet
          title="Testimoni" />
        <Spacer />
        <Header primaryText="Pendapat mereka tentang kami" />
        <Spacer />
        <Card>
          <Content className={classes.wrap}>
            {testimonials && testimonials.length && <List>
              {testimonials.map((testimonial) => <div key={`testimoni-${slugify(testimonial.name)}`}>
                <ListItem
                  childrens={<div>
                    <Spacer />
                    <Avatar size={82} className={classes.avatar} src={testimonial.photo} />
                    <br /><br />
                    <h4 className={classes.title}>{testimonial.name}</h4>
                    <span>{ testimonial.title }</span>
                    <br /><br />
                    {testimonial.message}
                    <Spacer />
                  </div>}
                  innerDivStyle={classes.inner} />
                <Divider />
              </div>)}
            </List>}
          </Content>
        </Card>
        <Spacer />
      </Container>
    );
  }
}
