import Taro, { PureComponent } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
// import { View, Image } from '@tarojs/components';
// import { observer, inject } from '@tarojs/mobx';
// import CherishTop from '@/components/cherishTop/index';
// import CherishCard from '@/components/cherishCard/index';
// import CherishInput from '@/components/cherishInput/index';
// import classnames from 'classnames';
// import { cityChange } from '@/interface/index';
import style from './index.module.scss';
export default class arthorize extends PureComponent {
  async componentWillMount() {
    const { authSetting } = await Taro.getSetting();
    if (!authSetting['scope.userLocation']) await Taro.authorize({ scope: 'scope.userLocation' });
    const { latitude, longitude } = await Taro.getLocation({ type: 'gcj02' });
    const location = `${longitude},${latitude}`;
    Taro.setStorageSync('location', location);
    Taro.switchTab({ url: '/pages/now/index' });
  }

  async componentDidShow() {}

  render() {
    return (
      <View className={style.authority}>
        <View className={style.main}>
          <View className={style.tip}>点击获取位置按钮，获取当前城市所在天气情况</View>
          <View className={style.botton}>
            <Button className={style.getLoaction} type="primary">
              获取当前位置
            </Button>
            <Button className={style.skip} type="primary">
              跳过
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
