import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import CherishTop from '@/components/cherishTop/index';
import CherishInput from '@/components/cherishInput/index';
import { AtButton } from 'taro-ui';
import classnames from 'classnames';
import style from './index.module.scss';
import CherishDialog from './modal/index';
type storeData = {
  location: typeof import('@/store/location').default;
  throttle: typeof import('@/store/throttle').default;
};

@inject('location', 'throttle')
@observer
export default class Index extends Component<storeData> {
  state = {
    isOpened: false,
    dialogIndex: 0,
    cityName: '',
    weather: {
      parent_city: '',
      daily_forecast: [
        {
          cond_code_d: '',
          cond_code_n: '',
          cond_txt_d: '',
          cond_txt_n: '',
          date: '',
          hum: '',
          mr: '',
          ms: '',
          pcpn: '',
          pop: '',
          pres: '',
          sr: '',
          ss: '',
          tmp_max: '',
          tmp_min: '',
          uv_index: '',
          vis: '',
          wind_dir: '',
          wind_sc: '',
          wind_spd: '',
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
      const data = await updatedData('forecast', cityName);
      this.setState({
        weather: data,
      });
    } catch (err) {
      this.setState({ cityName: '' });
      Taro.showToast({
        title: '输入城市有误',
        icon: 'none',
      });
    }
  }

  searchDetail = (e: number) => {
    this.setState({ dialogIndex: e, isOpened: true });
  };

  searchForecastWeather = () => {
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
      cityName,
      weather: { daily_forecast, parent_city },
      dialogIndex,
      isOpened,
    } = this.state;
    return (
      <View className={classnames('container', style.bgc)}>
        <View className={classnames('mask')}>
          <CherishTop data={{ name: '天气预报' }} />
          <CherishInput
            cityName={cityName}
            cityChange={this.cityChange}
            searchNowWeather={this.searchForecastWeather}
          />
          <View className={style.flex}>
            <View className={style.location}>{parent_city}</View>
          </View>
          {parent_city && (
            <View className={style.cardList}>
              {daily_forecast.map((item, index) => (
                <View key={new Date(item.date).getTime()} className={style.card}>
                  <View className={style.topNav}>
                    <View className={style.date}>{item.date}</View>
                    <AtButton onClick={() => this.searchDetail(index)} type="primary" size="small">
                      查看详情
                    </AtButton>
                  </View>
                  <View className={style.inner}>
                    <View className={style.left}>
                      <View>{item.cond_txt_d}</View>
                      <View className={style.cond}>
                        {item.wind_dir}
                        {item.wind_sc}级
                      </View>
                    </View>
                    <View>
                      {item.tmp_min}~{item.tmp_max}°C
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
          {parent_city && <CherishDialog isOpened={isOpened} data={daily_forecast[dialogIndex]} />}
        </View>
      </View>
    );
  }
}
