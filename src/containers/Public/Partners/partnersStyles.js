import Layout from '../../App/Layout';

export default {
  fontSize: {
    fontSize: Layout.fontSize
  },
  noBackground: {
    background: 'none'
  },
  title: {
    marginBottom: 6
  },
  titleBorder: {
    height: 2,
    border: 'none',
    background: Layout.textColor,
    margin: 0,
    width: 50
  },
  bannerContent: {
    fontSize: 20,
    color: Layout.textColor
  },
  partnersModal: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    marginTop: 0,
    marginLeft: 0,
    paddingTop: Layout.marginLarge
  },
  partnersHeader: {
    marginBottom: Layout.marginLarge,
    textAlign: 'center',
    color: Layout.textColor
  },
  partnersHeaderTitle: {
    textTransform: 'uppercase',
    fontFamily: Layout.fontTitle
  },
  partnersFooter: {
    marginBottom: Layout.marginLarge,
    textAlign: 'center'
  },
  partnersContainer: {
    padding: '0 20%'
  },
  partnersDialog: {
    width: '100%',
    maxWidth: 'none',
    boxShadow: 'none'
  },
  titleLineHeight: {
    lineHeight: '25px'
  },
  dialog: {
    width: '100%',
    maxWidth: 'none',
    boxShadow: 'none'
  },
  tableColumnNumber: {
    width: 50
  },
  tableColumnPrice: {
    width: 125
  },
  tableColumnPriceLarge: {
    width: 235,
    paddingTop: Layout.marginSmall,
    paddingBottom: Layout.marginSmall,
    height: 'auto',
    whiteSpace: 'normal'
  },
  tableBody: {
    overflowX: 'visible',
    overflowY: 'visible'
  }
};
