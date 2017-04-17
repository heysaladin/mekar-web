import Layout from '../../../App/Layout';
import Theme from '../../../App/Theme';

export default {
  fontSize: {
    fontSize: Layout.fontSize
  },
  textCenter: {
    textAlign: 'center'
  },
  textUppercase: Layout.textUppercase,
  socialMediaSmall: {
    width: 36,
    height: 36,
    padding: 8,
    borderRadius: '50%',
    background: '#fff',
    color: '#4B4B4B',
    marginTop: 4,
    marginRight: 4
  },
  socialMediaSmallIcon: {
    width: 16,
    height: 16
  },
  formTitle: {
    fontFamily: Layout.fontTitle,
    textTransform: 'uppercase'
  },
  sidebarBottom: {
    background: '#4B4B4B',
    color: '#fff',
    padding: '0 16px'
  },
  sidebarRight: {
    margin: '0 20px',
    paddingRight: 110,
    paddingBottom: Layout.marginLarge
  },
  overlayContainerStyle: {
    width: '26%',
    padding: '0 16px',
    background: 'rgba(255, 255, 255, 0.3)',
    color: Layout.textColor,
    height: 200
  },
  link: {
    textDecoration: 'none',
    color: Theme.primaryTextColor
  }
};
