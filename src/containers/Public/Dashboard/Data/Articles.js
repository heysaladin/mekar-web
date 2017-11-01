import React, {
    Component,
    PropTypes
} from 'react';
import injectSheet from 'react-jss';
import RaisedButton from 'material-ui/RaisedButton';

import sampleImage from '../img/mekar.jpg';
import styles from '../profileStyles';
import {
    Content,
    Loader,
    Landing,
} from '../../../UI';

@injectSheet(styles)

export default class Articles extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    articlesCollection: PropTypes.object.isRequired,
    loadDataForm: PropTypes.func.isRequired,
    handleDialogOpen: PropTypes.func.isRequired,
  }

  static defaultProps = {
    articlesData: null,
    loading: false
  }

  state = {
    articles: [],
    selectedDataEdit: null,
  }

  render() {
    const {
      loading,
      sheet: {
        classes
      },
      articlesCollection,
      loadDataForm,
      handleDialogOpen,
    } = this.props;

    return (
      <div>
        {/* Tampilkan loader jika data sedang di load */}
        {loading && <Loader />}
        {/* Tampil jika data kosong */}
        {(!articlesCollection) && <Landing small>Belum ada informasi</Landing>}
        {/* Tampilan riwayat taksiran */}
        {!loading && articlesCollection
        .length > 0 && <div className={classes.listWrapper}>
          {!loading && articlesCollection
            .map(
              (mitra) => <div key={`mitra-${mitra.articleId}`} className={classes.gridItem}>
                <div className={classes.gridCard}>
                  <div className={classes.gridContentWrapper}>
                    <div className={classes.gridImageWrapper}>
                      <img className={classes.gridImage} src={`${sampleImage}`} alt="Mekar" />
                    </div>
                    <h4 className={classes.gridTitle}>{mitra.title}</h4>
                    <p className={classes.gridBodyCopy}>{mitra.category}</p>
                    <div className={classes.blockAction}>
                      <RaisedButton
                        label="Edit"
                        onTouchTap={() => loadDataForm(mitra.articleId)}
                      />
                      <RaisedButton
                        labelStyle={styles.dangerText}
                        label="Delete"
                        onTouchTap={handleDialogOpen}
                      />
                    </div>
                  </div>
                </div>
                <div id={`item${mitra.articleId}`}></div>
              </div>
              )
          }
        </div>}
        {!loading && articlesCollection
          .length === 0 && <Content>
            <h4>Nama toko atau alamat yang Anda cari belum ada.<br /> Mohon cari dengan kata kunci lain</h4>
          </Content>
        }
      </div>
    );
  }
}
