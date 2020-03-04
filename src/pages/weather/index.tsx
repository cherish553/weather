import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import classnames from 'classnames';
import CherishTop from '@/components/cherishTop/index';
import CherishInput from '@/components/cherishInput/index';
import CherishCard from '@/components/cherishCard/index';
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
      parent_city: '',
      air_now_city: {
        aqi: '' /** 空气质量指数 */,
        qlty: '' /** 空气质量 */,
        main: '' /** 主要污染物 */,
        pm25: '' /** pm25 */,
        pm10: '' /** pm10 */,
        no2: '' /** 二氧化氮 */,
        so2: '' /** 二氧化硫 */,
        co: '' /** 一氧化碳 */,
        o3: '' /** 臭氧 */,
        pub_time: '' /** 数据发布时间 */,
      },
    },
  };

  componentDidShow() {
    if (this.state.cityName) this.setState({ cityName: '' });
  }

  /** 获取天气情况 */
  async getWeatherData(cityName?: string): Promise<void> {
    try {
      const { updatedData } = this.props.throttle;
      const data = await updatedData('air', cityName);
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

  searchAirWeather = () => {
    const { cityName } = this.state;
    if (!cityName)
      return Taro.showToast({
        title: '请输入城市名称',
        icon: 'none',
      });
    this.getWeatherData(cityName);
  };

  render() {
    const {
      cityName,
      weather: { air_now_city, parent_city },
    } = this.state;
    return (
      <View className={classnames('container', style.bgc)}>
        <View className={classnames('mask')}>
          <CherishTop data={{ name: '今日天气' }} />
          <CherishInput
            cityName={cityName}
            cityChange={this.cityChange}
            searchNowWeather={this.searchAirWeather}
          />
          <View>
            <View className={style.flex}>
              <View className={style.location}>{parent_city}</View>
            </View>
            {parent_city && (
              <View>
                <View className={style.qlty}>空气质量：{air_now_city.qlty}</View>
                <View className={style.qltyRecomment}>
                  {parseInt(air_now_city.aqi) <= 50
                    ? '空气质量级别为一级，空气质量状况属于优。此时，空气质量令人满意，基本无空气污染，各类人群可正常活动'
                    : ''}
                  {parseInt(air_now_city.aqi) <= 100 && parseInt(air_now_city.aqi) > 50
                    ? '空气质量级别为二级，空气质量状况属于良。此时空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响，建议极少数异常敏感人群应减少户外活动。'
                    : ''}
                  {parseInt(air_now_city.aqi) <= 150 && parseInt(air_now_city.aqi) > 100
                    ? '空气质量级别为三级，空气质量状况属于轻度污染。此时，易感人群症状有轻度加剧，健康人群出现刺激症状。建议儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼。'
                    : ''}
                  {parseInt(air_now_city.aqi) <= 200 && parseInt(air_now_city.aqi) > 150
                    ? '空气质量级别为四级，空气质量状况属于中度污染。此时，进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响，建议疾病患者避免长时间、高强度的户外锻练，一般人群适量减少户外运动。'
                    : ''}
                  {parseInt(air_now_city.aqi) <= 300 && parseInt(air_now_city.aqi) > 200
                    ? '空气质量级别为五级，空气质量状况属于重度污染。此时，心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状，建议儿童、老年人和心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动。'
                    : ''}
                  {parseInt(air_now_city.aqi) > 300
                    ? '空气质量级别为六级，空气质量状况属于严重污染。此时，健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病，建议儿童、老年人和病人应当留在室内，避免体力消耗，一般人群应避免户外活动。'
                    : ''}
                </View>
                <View className={style.publicTime}>发布时间：{air_now_city.pub_time}</View>
                <View className={style.card}>
                  <CherishCard
                    data={{ color: '#ffffff', title: '空气质量指数', inner: air_now_city.aqi }}
                  />
                  <CherishCard
                    data={{ color: '#ffffff', title: '主要污染物', inner: `${air_now_city.main}` }}
                  />
                  <CherishCard
                    data={{ color: '#ffffff', title: 'pm25', inner: air_now_city.pm25 }}
                  />
                  <CherishCard
                    data={{ color: '#ffffff', title: 'pm10', inner: air_now_city.pm10 }}
                  />
                  <CherishCard
                    data={{ color: '#ffffff', title: '二氧化氮', inner: air_now_city.no2 }}
                  />
                  <CherishCard
                    data={{ color: '#ffffff', title: '二氧化硫', inner: air_now_city.so2 }}
                  />
                  <CherishCard
                    data={{ color: '#ffffff', title: '一氧化碳', inner: air_now_city.co }}
                  />
                  <CherishCard data={{ color: '#ffffff', title: '臭氧', inner: air_now_city.o3 }} />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
