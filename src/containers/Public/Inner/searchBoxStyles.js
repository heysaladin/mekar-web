import Layout from '../../App/Layout';

export default {
  wrap: {
    textAlign: 'center',
    fontSize: Layout.fontSize,
    padding: '10px 0',
    marginBottom: 10
  },
  positionRelative: {
    position: 'relative'
  },
  searchBoxInput: {
    padding: '0px 40px 0px 20px',
    borderRadius: 35,
    boxShadow: '0 0 5px rgba(0,0,0,.25)',
    color: '#C8C8C8',
    background: '#fff'
  },
  searchBoxUnderline: {
    background: 'none',
    borderBottomStyle: 'none',
    border: 0
  },
  searchBoxIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    fontSize: 24,
    color: '#C8C8C8'
  },
  searchBoxIconHint: {
    fontSize: Layout.fontSize
  }
};
