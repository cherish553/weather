import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import CherishTop from '@/components/cherishTop/index';
import CherishCard from '@/components/cherishCard/index';
import CherishInput from '@/components/cherishInput/index';
import classnames from 'classnames';
import { cityChange } from '@/interface/index';
import style from './index.module.scss';
type storeData = {
  location: typeof import('@/store/location').default;
  throttle: typeof import('@/store/throttle').default;
};
@inject('location', 'throttle')
@observer
export default class Index extends Component<storeData> {
  state = {
    cityName: '',
    weather: {
      cond_code: '',
      cond_txt: '',
      fl: '',
      hum: '',
      pcpn: '',
      pres: '',
      tmp: '',
      vis: '',
      wind_deg: '',
      wind_dir: '',
      wind_sc: '',
      wind_spd: '',
      parent_city: '',
    },
  };

  async componentDidShow(): Promise<void> {
    try {
      if (this.state.cityName) this.setState({ cityName: '' });
      const { authSetting } = await Taro.getSetting();
      if (!authSetting['scope.userLocation']) await Taro.authorize({ scope: 'scope.userLocation' });
      const { latitude, longitude } = await Taro.getLocation({ type: 'gcj02' });
      const location = `${longitude},${latitude}`;
      const { updatedLocation } = this.props.location;
      updatedLocation(location);
      this.getWeatherData();
    } catch (err) {}
  }

  componentDidHide() {}

  /** 获取天气情况 */
  async getWeatherData(cityName?: string): Promise<void> {
    try {
      const { updatedData } = this.props.throttle;
      const data = await updatedData('now', cityName);
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

  cityChange: cityChange = (cityName: string): void => {
    this.setState({ cityName });
  };

  searchNowWeather = () => {
    const { cityName } = this.state;
    if (!cityName)
      return Taro.showToast({
        title: '请输入城市名称',
        icon: 'none',
      });
    this.getWeatherData(cityName);
  };

  render() {
    const { cityName, weather } = this.state;
    return (
      <View className={classnames('container', style.bgc)}>
        <View className={classnames('mask')}>
          <CherishTop data={{ name: '今日天气' }} />
          <CherishInput
            cityName={cityName}
            cityChange={this.cityChange}
            searchNowWeather={this.searchNowWeather}
          />
          {weather.tmp && (
            <View>
              <View className={style.flex}>
                <View className={style.location}>{weather.parent_city}</View>
                <Image
                  className={style.weatherIcon}
                  src={`${process.env.IMAGE_URL}${weather.cond_code}.png`}
                />
                <View>{weather.cond_txt}</View>
                <View className={style.tmp}>{weather.tmp}</View>
              </View>
              <View className={style.card}>
                <CherishCard data={{ title: '体感温度', inner: `${weather.fl}°c` }} />
                <CherishCard data={{ title: '相对湿度', inner: weather.hum }} />
                <CherishCard data={{ title: '降水量', inner: weather.pcpn }} />
                <CherishCard data={{ title: '大气压强', inner: weather.pres }} />
                <CherishCard data={{ title: '能见度/公里', inner: weather.vis }} />
                <CherishCard data={{ title: '风向角度', inner: weather.wind_deg }} />
                <CherishCard data={{ title: '风向', inner: weather.wind_dir }} />
                <CherishCard data={{ title: '风力', inner: weather.wind_sc }} />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
