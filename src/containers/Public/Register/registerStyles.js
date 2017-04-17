import Theme from '../../App/Theme';
import Layout from '../../App/Layout';

export default {
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
