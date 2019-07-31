import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import OneCard from './Card/Card';
import news from '../../img/home/news.jpg'
import video from '../../img/home/video.jpg'
import gallery from '../../img/home/gallery.jpg'
import LastNews from './LastNews/LastNews';
import LastImg from './LastImg/LastImg';
import LastVideo from './LastVideo/LastVideo';
import {connect} from 'react-redux'
import { dataLastOutput } from '../../store/actions/actionHomePage';
import Preloader from '../../UI/Preloader/Preloader'

const text1 = " Читать все последние мировые новости с комментариями каждый день. Обзор новостей в мире онлайн на Mad Coder. Новости, аналитика, прогнозы и другие материалы, представленные на данном сайте, не являются офертой или рекомендацией к покупке или продаже каких-либо активов. "
const text2 = "Cамые свежие и горячие ролики за 2018 год. Каждый день Вы можете смотреть онлайн новые отборные видео в хорошем HD качестве. ... Надеемся, что наш сайт произведет на Вас хорошее впечатление. Все это было сделано в надежде на то, что у нас Вам будет не скучно. "
const text3 = "Подборка сайтов от Mad Coder поможет  на всех этапах: от поиска объекта съёмки и выбора удачного ракурса до публикации готового снимка. Вдохновляемся. Лучшие фото для вдохновения. На этом сайте есть специальный раздел, где публикуются фотографии профессионалов."

const styles = {
  mainCard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6 ,1fr)',
    gridGap: '30px',
    marginTop: '15px'
  },
  headerTitle: {
    textAlign: 'center',
    gridColumn: 'span 6',
    fontSize: '28px',
  }
  
};

class MediaCard extends React.Component {
  state = {
    preloader: true
  }

  componentDidMount() {
    this.props.dataLastOutput().then(() => {
      this.setState({
        preloader: false
      })
    })
  }

  render() {
    const { classes } = this.props;
    const {preloader} = this.state
    return (
      
      <div className={classes.mainCard}>   
        {
          !preloader 
            ?<>
              <OneCard imgName={news} name='Новости' text={text1} path='/news' />
              <OneCard imgName={video} name='Видео' text={text2} path='/videogalery' />
              <OneCard imgName={gallery} name='Галерея Изображений' text={text3} path='/imggalery' />
              <h3 className={classes.headerTitle}>Новые статьи</h3>
              <LastNews twoNews={this.props.twoNews} />
              <h3 className={classes.headerTitle}>Новые изображения</h3>
              <LastImg lastImg={this.props.lastImg} />
              <h3 className={classes.headerTitle}>Новые видео</h3>
              <LastVideo twoVideo={this.props.twoVideo} />
             </>
            : <Preloader />
        }              
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    twoNews: state.homePageReducer.twoLastNews,
    lastImg: state.homePageReducer.lastImg,
    twoVideo: state.homePageReducer.twoNewVideo,
  }
} 

function mapDispatchToProps(dispatch) {
  return {
    dataLastOutput: () => dispatch(dataLastOutput())
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MediaCard));