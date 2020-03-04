import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { title } from '@/interface/index'
import style from './index.module.scss'

interface cherishTop {
  data: title
}

function CommonTop({ data }: cherishTop) {
  return <View className={style.top}>{data.name}</View>;
}
export default CommonTop