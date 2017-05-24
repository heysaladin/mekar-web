import Layout from '../../App/Layout';
import Theme from '../../App/Theme';

export default {
  openingArea: {
    background: '#2a6d5e',
    width: '100%',
    height: 130,
    marginTop: -50,
    backgroundImage: 'linear-gradient(120deg,#447f2c 0%,#2a6d5e 100%)'
  },
  card: {
    borderRadius: '5px !important',
    overflow: 'hidden',
    marginTop: -68,
    marginBottom: 50
  },
  contentWrapper: {
    margin: '-116px auto 0'
  },
  listWrapper: {
    width: '100%',
    margin: '50px auto',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  gridItem: {
    width: 'auto',
    margin: '8px 0'
  },
  gridCard: {
    width: 280,
    height: 212,
    background: 'white',
    borderRadius: 8,
    boxShadow: '0 0 5px rgba(0,0,0,.25)',
    position: 'relative',
    margin: '126px auto 0'
  },
  gridContentWrapper: {
    width: 252,
    margin: '-126px auto 0',
    position: 'absolute',
    left: 0,
    right: 0
  },
  gridImageWrapper: {
    width: 252,
    height: 252,
    borderRadius: 8,
    overflow: 'hidden'
  },
  gridImage: {
    width: 'auto',
    height: 'inherit',
    margin: '0 auto'
  },
  gridTitle: {
    textAlign: 'center',
    color: '#15904e',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: '15px 0 0'
  },
  gridBodyCopy: {
    textAlign: 'center',
    color: '#ababab',
    fontSize: 12,
    margin: '5px 0'
  },
  textCenter: Layout.textCenter,
  textUppercase: {
    textTransform: 'uppercase'
  },
  noMargin: {
    margin: 0
  },
  noPadding: {
    padding: 0
  },
  header: {
    borderRadius: '5px 0 0 5px !important',
    background: Theme.colorGrey,
    textAlign: 'center'
  },
  headerTitle: {
    fontSize: Layout.fontSize,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  headerText: {
    paddingRight: 0
  },
  wrap: {
    padding: Layout.margin,
    textAlign: 'center'
  },
  summaryContainer: {
    background: Theme.colorGreyLight
  },
  summaryWrap: {
    padding: Layout.margin
  }
};
