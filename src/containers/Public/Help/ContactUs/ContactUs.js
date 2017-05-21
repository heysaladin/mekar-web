import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as helpActions from 'redux/modules/public/help';
import { number, letter } from 'utils/masking';
import { createValidator, required, minLength, email } from 'utils/validation';
import { Card, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import injectSheet from 'react-jss';

import { Container, Header, Content, Spacer, Button } from '../../../UI';
import imageBanner from './banner.jpg';

import styles from './contactUsStyles';
@injectSheet(styles)

// @connect(state => ({ saveError: state.help.saveError }), dispatch => bindActionCreators(helpActions, dispatch))

@reduxForm({
  form: 'formContactUs',
  formKey: 'formContactUs',
  validate: createValidator({
    name: [
      required, minLength(3)
    ],
    telephone: [
      required, minLength(7)
    ],
    email: [
      required, email
    ],
    subject: [
      required, minLength(4)
    ],
    message: [required, minLength(10)]
  })
})

export default class ContactUs extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    contactUs: PropTypes.func.isRequired
  }
  state = {
    message: 'Terima kasih telah menghubungi kami.',
    openFlashMessage: false
  }
  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }
  handleOpen = () => {
    this.setState({ openFlashMessage: true });
  };

  handleClose = () => {
    this.setState({ openFlashMessage: false });
  }

  handleSubmit = (values) => {
    const { contactUs, reset } = this.props;

    return contactUs(values).then(result => {
      if (result && typeof result.errors === 'object') {
        console.log(result);
      } else {
        reset();
        this.handleOpen();
      }
    });
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const { sheet: {
        classes
      } } = this.props;
    return (
      <Container>
        <Helmet
          title="Hubungi Kami Pinjam Indonesia" />
        <Spacer />
        <Header primaryText="Hubungi Kami" />
        <Spacer />
        <Card>
          <CardMedia>
            <img src={imageBanner} alt="banner" />
          </CardMedia>
          <Content>
            <h4 className={classes.textUppercase}>Kantor Pusat</h4>
            <p>
              Jl.Sungai Sambas II No.13<br />
              Kebayoran Baru<br />
              Jakarta Selatan<br /><br />
              <strong>T.</strong>
              &nbsp;
              <a href="tel:+622127506800" className={classes.link}>(021) 2750 6800</a><br />
            </p>
            <Spacer />
            <h4 className={classes.textUppercase}>Kantor Cabang Grogol</h4>
            <p>
              Jl. Daan Mogot Raya No. 99A<br />
              Grogol Petamburan<br />
              Jakarta Barat 11460<br /><br />
              <strong>T.</strong>
              &nbsp;
              <a href="tel:+622129334586" className={classes.link}>(021) 2933 4586</a><br />
            </p>
            <Spacer />
            <h4 className={classes.textUppercase}>Kantor Cabang Tanah Abang</h4>
            <p>
              Pasar Tanah Abang, Blok B Lantai 5<br />
              Los E No. 50 Jakarta Pusat<br /><br />
              <strong>T.</strong>
              &nbsp;
              <a href="tel:+622123573545" className={classes.link}>(021) 2357 3545</a><br />
            </p>
          </Content>
          <Divider />
          <Content>
            <h4 className={classes.formTitle}>
              Jika ada pertanyaan mengenai kami isi form berikut
            </h4>
            <form onSubmit={handleSubmit((values) => this.handleSubmit(values))}>
              <div
                style={{
                  padding: 20
                }}>
                <Field
                  name="name"
                  component={TextField}
                  floatingLabelText="Nama"
                  ref={(textField) => { this.name = textField; }}
                  normalize={letter}
                  fullWidth />
                <Field
                  name="telephone"
                  component={TextField}
                  type="tel"
                  floatingLabelText="Nomor Telepon"
                  ref={(textField) => { this.telephone = textField; }}
                  normalize={number}
                  fullWidth />
                <Field
                  name="email"
                  component={TextField}
                  floatingLabelText="Email"
                  ref={(textField) => { this.email = textField; }}
                  fullWidth />
                <Field
                  name="subject"
                  component={TextField}
                  floatingLabelText="Subjek"
                  ref={(textField) => { this.subject = textField; }}
                  fullWidth />
                <Field
                  name="message"
                  component={TextField}
                  floatingLabelText="Tulis pesan disini"
                  ref={(textField) => { this.message = textField; }}
                  fullWidth
                  multiLine
                  rows={5}
                  rowsMax={5} />
              </div>
              <Spacer />
              <div className={classes.textCenter}>
                <Button
                  label="Kirim"
                  type="submit"
                  secondary
                  submitting={submitting}
                  onTouchTap={this.handleClose} />
              </div>
              <Spacer />
            </form>
          </Content>
        </Card>
        <Snackbar
          open={this.state.openFlashMessage}
          message={this.state.message}
          action="OK"
          onActionTouchTap={this.handleClose}
          autoHideDuration={10000} />

        <Spacer />
      </Container>
    );
  }
}
