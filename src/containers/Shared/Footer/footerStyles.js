import Layout from '../../App/Layout';

export default {
  footer: {
    fontSize: Layout.fontSize,
    // borderTop: '1px solid #AFAFAF',
    // background: '#E1E1E1',
    padding: '25px 0',
    background: '#fff',
  },
  footerContainer: {
    margin: '0 auto',
    textAlign: 'center'
  },
  footerNote: {
    fontSize: Layout.fontSize - 1
  },
  footerDivider: {
    width: 80,
    height: 2,
    background: '#C8C8C8',
    marginTop: Layout.margin,
    marginBottom: Layout.margin,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  footerLink: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: Layout.textColor
  },
  socialMediaSmall: {
    width: 36,
    height: 36,
    padding: 8,
    borderRadius: '50%',
    color: '#fff',
    background: '#4B4B4B',
    marginTop: 0,
    margin: '0 10px'
  },
  socialMediaSmallIcon: {
    width: 16,
    height: 16
  },
  verticalLine: {
    display: 'block',
    width: 1,
    height: 30,
    margin: '-40px auto 0',
    background: '#ccc',
    position: 'absolute',
    left: 0,
    right: 0
  }
};
