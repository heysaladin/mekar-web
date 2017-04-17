import React, { Component, PropTypes } from 'react';
import { slugify } from 'utils/filter';
import IconButton from 'material-ui/IconButton';

import Layout from '../../../App/Layout';
import { BPISpacer, Button } from '../../../UI';
import dataConstant from '../../../../data/constant.json';

import iconCredit from './Assets/img-kredit.png';
import iconLogamMulia from './Assets/ic-logam-mulia.svg';
import iconEmas from './Assets/ic-emas.svg';
import iconSepedaMotor from './Assets/ic-sepeda-motor.svg';
import iconLaptop from './Assets/ic-laptop.svg';
import iconHandphone from './Assets/ic-handphone.svg';
import iconKamera from './Assets/ic-kamera.svg';
import iconMobil from './Assets/ic-mobil.svg';
import iconTabletPc from './Assets/ic-tablet-pc.svg';

const style = {
  textUppercase: {
    textTransform: 'uppercase'
  },
  textCenter: {
    textAlign: 'center'
  },
  textTitle: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: 500
  },
  positionRelative: {
    position: 'relative'
  },
  buttons: {
    position: 'relative',
    textAlign: 'center'
  },
  buttonCategory: {
    width: 110,
    height: 110,
    padding: 0,
    marginBottom: 15
  },
  buttonIcon: {
    width: 80,
    height: 80,
  },
  buttonCategoryLabel: {
    fontSize: Layout.fontSize,
    textAlign: 'center',
    marginTop: Layout.marginSmall
  }
};

export default class PawnStep1 extends Component {

  state = {
    warningCredit: false,
    selectedCategory: null
  }

  getIcon(category) {
    switch (category) {
      case dataConstant.PAWN_CATEGORY_JEWELRY:
        return iconEmas;
      case dataConstant.PAWN_CATEGORY_GOLD:
        return iconLogamMulia;
      case dataConstant.PAWN_CATEGORY_LAPTOP:
        return iconLaptop;
      case dataConstant.PAWN_CATEGORY_CAR:
        return iconMobil;
      case dataConstant.PAWN_CATEGORY_MOTORCYCLE:
        return iconSepedaMotor;
      case dataConstant.PAWN_CATEGORY_HANDPHONE:
        return iconHandphone;
      case dataConstant.PAWN_CATEGORY_TABLETPC:
        return iconTabletPc;
      case dataConstant.PAWN_CATEGORY_CAMERA:
        return iconKamera;
      default:
        return iconEmas;
    }
  }

  scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  componentWillUpdate = (nextProps, nextState) => {
    this.scrollToTop();
  }

  handleNext = (selectedCategory) => {
    this.setState({category: selectedCategory});

    if (selectedCategory.creditable === true) {
      this.setState({warningCredit: true});
      return;
    }

    setTimeout(() => {
      const {onHandleNext} = this.props;
      onHandleNext(selectedCategory);
    }, 100);
  }

  handleWarningCredit = () => {
    const {selectedCategory} = this.state;

    setTimeout(() => {
      const {onHandleNext} = this.props;
      onHandleNext(selectedCategory);
    }, 100);
  }

  handlePrev = () => {
    const {warningCredit} = this.state;

    this.setState({warningCredit: false});
  };

  render() {
    const {warningCredit, selectedCategory} = this.state;
    const {onHandleNext, data} = this.props;

    return (
      <div style={style.positionRelative}>
        <div style={style.textTitle}>Pilih kategori Barang Jaminan Anda</div>
        <br />
        {data && data.categories &&
          <div>
          {warningCredit === false &&
            data.categories.map((category) => 
            <IconButton 
            id={`pawn-simulation-${slugify(category.label)}-start`}
            key={category.id} style={style.buttonCategory} onTouchTap={this.handleNext.bind(this, category)} children={<div><img src={this.getIcon(category.value)} alt={`pawn-category-${category.value}`} style={style.buttonIcon} /><div style={style.buttonCategoryLabel}>{category.label}</div></div>}/>)
          }
          {warningCredit &&
            <div style={style.textCenter}>
              <BPISpacer />
              <img src={iconCredit} alt="kredit" />
              <BPISpacer />
              Mohon maaf, &nbsp;<strong>Pinjam.co.id</strong>&nbsp; tidak menerima kendaraan yang sedang dalam masa cicilan atau dalam pembiayaan pihak lain.
              <br />Silahkan melanjutkan taksiran jika kendaraan Anda tidak dalam pembiayaan pihak lain.
              <BPISpacer />
              <BPISpacer />
              <div style={style.buttons}>
                <Button id={`pawn-simulation-${slugify(selectedCategory.label)}-credit-next`} label="Lanjutkan" secondary onTouchTap={this.handleWarningCredit}/>
                <br /><br />
                <Button id={`pawn-simulation-${slugify(selectedCategory.label)}-credit-back`} label="Kembali" onTouchTap={this.handlePrev}/>
              </div>
            </div>
          }
          </div>
        }
      </div>
    );
  }
}

PawnStep1.propTypes = {
  data: PropTypes.object,
  onHandleNext: PropTypes.func
};
