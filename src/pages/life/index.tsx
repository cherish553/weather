import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import CherishTop from '@/components/cherishTop/index';
import CherishInput from '@/components/cherishInput/index';
import classnames from 'classnames';
import style from './index.module.scss';
type storeData = {
  location: typeof import('@/store/location').default;
  throttle: typeof import('@/store/throttle').default;
};
const lifeType = {
  comf: '舒适度指数',
  drsg: '穿衣指数',
  flu: '感冒指数',
  sport: '运动指数',
  trav: '旅游指数',
  uv: '紫外线指数',
  cw: '洗车指数',
  air: '空气污染扩散条件指数',
};

@inject('location', 'throttle')
@observer
export default class Index extends Component<storeData> {
  state = {
    cityName: '',
    data: {
      parent_city: '',
      lifestyle: [
        {
          type: 'comf' /** 舒适度指数 */,
          brf: '较不舒适' /** 生活指数简介 */,
          txt: '白天天气较凉，且风力较强，您会感觉偏冷，不很舒适，请注意添加衣物，以防感冒。',
        },
        {
          type: 'drsg' /** 穿衣指数 */,
          brf: '寒冷',
          txt:
            '天气寒冷，建议着厚羽绒服、毛皮大衣加厚毛衣等隆冬服装。年老体弱者尤其要注意保暖防冻。',
        },
        {
          type: 'flu' /** 感冒指数 */,
          brf: '极易发',
          txt:
            '天气寒冷，昼夜温差极大且风力较强，易发生感冒，请注意适当增减衣服，加强自我防护避免感冒。',
        },
        {
          type: 'sport' /** 运动指数 */,
          brf: '较不宜',
          txt: '天气较好，但风力很强且天气寒冷，推荐您进行室内运动，在户外运动时请注意避风保暖。',
        },
        {
          type: 'trav' /** 旅游指数 */,
          brf: '较不宜',
          txt: '天气较好，风很大，会让您感觉比较凉，出游要添加衣物，注意防风。',
        },
        {
          type: 'uv' /** 紫外线指数 */,
          brf: '最弱',
          txt:
            '属弱紫外线辐射天气，无需特别防护。若长期在户外，建议涂擦SPF在8-12之间的防晒护肤品。',
        },
        {
          type: 'cw' /** 洗车指数 */,
          brf: '适宜',
          txt:
            '适宜洗车，未来持续两天无雨天气较好，适合擦洗汽车，蓝天白云、风和日丽将伴您的车子连日洁净。',
        },
        {
          type: 'air' /** 空气污染扩散条件指数 */,
          brf: '优',
          txt: '气象条件非常有利于空气污染物稀释、扩散和清除。',
        },
      ],
    },
  };

  componentDidShow() {
    if (this.state.cityName) this.setState({ cityName: '' });
    this.getWeatherData();
  }

  /** 获取天气情况 */
  async getWeatherData(cityName?: string): Promise<void> {
    try {
      const { updatedData } = this.props.throttle;
      const data = await updatedData('life', cityName);
      this.setState({
        data,
      });
    } catch (err) {
      this.setState({ cityName: '' });
      Taro.showToast({
        title: '输入城市有误',
        icon: 'none',
      });
    }
  }

  searchLifeWeather = () => {
    const { cityName } = this.state;
    if (!cityName)
      return Taro.showToast({
        title: '请输入城市名称',
        icon: 'none',
      });
    this.getWeatherData(cityName);
  };

  cityChange = (cityName: string) => {
    this.setState({ cityName });
  };

  render() {
    const {
      data: {
        parent_city,
        lifestyle,
      },
      cityName,
    } = this.state;
    return (
      <View className={classnames('container', style.bgc)}>
        <View className={classnames('mask', style.mask)}>
          <CherishTop data={{ name: '生活指数' }} />
          <CherishInput
            placeholderStyle="color:#ffffff"
            color="white"
            cityName={cityName}
            cityChange={this.cityChange}
            searchNowWeather={() => this.searchLifeWeather()}
          />
          <View className={style.flex}>
            <View className={style.location}>{parent_city}</View>
          </View>
          {parent_city && (
            <ScrollView className={style.scroll} scrollY scrollWithAnimation>
              {lifestyle.length &&
                lifestyle.map(item => (
                  <View className={style.list} key={item.type}>
                    <View className={style.leftBanner}>
                      <Image
                        className={style.image}
                        src={`${process.env.IMAGE_URL}${item.type}.png?1`}
                      />
                    </View>
                    <View>
                      <View className={style.title}>
                        {lifeType[item.type]}:{item.brf}
                      </View>
                      <View className={style.inner}>{item.txt}</View>
                    </View>
                  </View>
                ))}
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}
