import { observable } from 'mobx'
import Taro from '@tarojs/taro';
const location = observable({
  location: '',
  updatedLocation(data: string): void {
    location.location = data
    Taro.setStorage({ key: 'location', data });
  },
})
export default location