import Theme from './Theme';

const containerMaxWidth = 660;
const containerWidth = '100%';
const fontSize = Theme.fontSize;
const fontLineHeight = 20;
const margin = 20;

export default {
  fontTitle: Theme.fontTitle,
  containerWidth,
  margin,
  marginSmall: margin / 2,
  marginLarge: margin * 2,
  marginSuperLarge: margin * 3,
  textColor: Theme.primaryTextColor,
  textCenter: {
    textAlign: 'center'
  },
  textUppercase: {
    textTransform: 'uppercase'
  },
  flexStart: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
  },
  fontSize,
  noPadding: {
    padding: 0
  },
  noMargin: {
    margin: 0
  },
  noGutter: {
    margin: 0,
    padding: 0
  },
  container: {
    maxWidth: containerMaxWidth,
    margin: '0 auto',
    position: 'relative',
    padding: '0 10px'
  },
  lineHeight: `${fontLineHeight}px`,
  footerHeight: 385
};
