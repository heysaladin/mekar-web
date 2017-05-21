import Theme from '../../App/Theme';
import Layout from '../../App/Layout';

export default {
  openingArea: {
    background: '#2a6d5e',
    width: '100%',
    height: 150,
    marginTop: -50,
    backgroundImage: 'linear-gradient(120deg,#447f2c 0%,#2a6d5e 100%)'
  },
  card: {
    borderRadius: 5,
    marginTop: -75,
    marginBottom: 50
  },
  textAlignLeft: {
    textAlign: 'left'
  },
  fontNormal: {
    fontWeight: 'normal'
  },
  fontTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  wrap: {
    textAlign: 'center',
    padding: Layout.margin
  },
  messageError: {
    padding: Layout.marginSmall,
    border: `1px solid ${Theme.colorRed}`,
    color: Theme.colorRed
  }
};
