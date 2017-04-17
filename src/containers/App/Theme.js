import {
  cyan500,
  grey100,
  grey300,
  grey400,
  grey500,
  white,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors';
import {
  fade
} from 'material-ui/utils/colorManipulator';

const fontDefault = 'Roboto, sans-serif';
const fontTitle = 'Roboto, sans-serif';
const fontSizeDefault = 13;
const primaryColor = '#30475A';
const secondaryColor = '#ED402F';
const primaryTextColor = '#4B4B4B';
const secondaryTextColor = '#CCC';
const colorBlack = primaryTextColor;
const colorRed = '#B71C1C';
const colorGreen = '#4CAF50';
const colorBlue = '#1565C0';
const colorYellow = '#F9A825';
const colorPurple = '#800080';
const colorGold = '#ffd700';
const colorGrey = '#E1E1E1';
const colorGreyLight = '#F5F5F5';
const colorGreyDark = '#C8C8C8';

export default {
  userAgent: 'all',
  fontFamily: fontDefault,
  fontTitle,
  fontSize: fontSizeDefault,
  primaryColor,
  secondaryColor,
  primaryTextColor,
  secondaryTextColor,
  colorBlack,
  colorRed,
  colorGreen,
  colorBlue,
  colorYellow,
  colorPurple,
  colorGold,
  colorGrey,
  colorGreyLight,
  colorGreyDark,
  palette: {
    primary1Color: primaryColor,
    primary2Color: cyan500,
    primary3Color: grey400,
    accent1Color: secondaryColor,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: primaryTextColor,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  },
  appBar: {
    height: 50,
    color: '#fff',
    textColor: primaryTextColor,
  },
  raisedButton: {
    padding: 0,
    textTransform: 'none',
    fontSize: fontSizeDefault,
    fontWeight: 'bold'
  },
  flatButton: {
    padding: 0,
    textTransform: 'none',
    fontSize: fontSizeDefault,
    fontWeight: 'bold'
  },
  listItem: {
    fontSize: fontSizeDefault
  },
  tabs: {
    backgroundColor: 'transparent',
    textColor: secondaryTextColor,
    selectedTextColor: primaryTextColor,
  },
  stepper: {
    backgroundColor: 'transparent',
    iconColor: secondaryColor,
    textColor: secondaryColor
  },
  menu: {
    backgroundColor: 'red',
    containerBackgroundColor: 'yellow',
  },
  menuItem: {
    dataHeight: 16,
    height: 24,
    padding: 10
  },
  // snackbar: {
  //   textColor: '#fff',
  //   backgroundColor: secondaryColor,
  //   actionColor: '#fff',
  // },
  radioButton: {
    checkedColor: secondaryColor,
  },
  checkbox: {
    checkedColor: secondaryColor,
  },
};
