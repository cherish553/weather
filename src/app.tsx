import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/mobx';
import Arthorize from './pages/arthorize';
import location from './store/location';
import throttle from './store/throttle';
// import '@tarojs/async-await'
import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  location,
  throttle,
};

class App extends Component {
  componentDidMount() {}
  componentDidShow() {
  }

  componentDidHide() {}

  componentDidCatchError() {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/now/index',
      'pages/forecast/index',
      'pages/life/index',
      'pages/weather/index',
      'pages/arthorize/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序当前地址的天气显示', // 高速公路行驶持续后台定位
      },
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#1296db',
      backgroundColor: '#FFFFFF',
      list: [
        {
          pagePath: 'pages/now/index',
          text: '今日天气',
          iconPath: './assets/image/now.png',
          selectedIconPath: './assets/image/nowActive.png',
        },
        {
          pagePath: 'pages/forecast/index',
          text: '天气预报',
          iconPath: './assets/image/forecast.png',
          selectedIconPath: './assets/image/forecastActive.png',
        },
        {
          pagePath: 'pages/life/index',
          text: '生活指数',
          iconPath: './assets/image/life.png',
          selectedIconPath: './assets/image/lifeActive.png',
        },
        {
          pagePath: 'pages/weather/index',
          text: '空气质量',
          iconPath: './assets/image/weather.png',
          selectedIconPath: './assets/image/weatherActive.png',
        },
      ],
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Arthorize />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
