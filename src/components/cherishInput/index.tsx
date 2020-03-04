import Taro, { Component } from '@tarojs/taro';
// import { observer, inject } from '@tarojs/mobx'
// import http from '@/api'
// import CherishTop from '@/components/cherishTop/index'
// import CherishCard from '@/components/CherishCard/index'
import { AtInput, AtIcon } from 'taro-ui';
import classnames from 'classnames';
import { CherishInput } from '@/interface/index';

export default class Index extends Component<CherishInput> {
  // static options = {
  //   addGlobalClass: true
  // }

  render() {
    const { cityChange, cityName, searchNowWeather, color, placeholderStyle } = this.props;
    return (
      <AtInput
        name="cityName"
        placeholderStyle={placeholderStyle || ''}
        className={classnames('cherish-opacity')}
        clear
        border={false}
        title="城市名称"
        placeholder="请输入城市名称"
        type="text"
        value={cityName}
        onChange={cityChange}
      >
        <AtIcon
          onClick={searchNowWeather}
          value="search"
          size="30"
          color={color || '#1296db'}
        ></AtIcon>
      </AtInput>
    );
  }
}
