import Taro, { PureComponent } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent } from 'taro-ui';
import style from './index.module.scss';

type PageStateProps = {
  data: any;
  isOpened: boolean;
};

const day = ['日', '一', '二', '三', '四', '五', '六'];
// @inject('location')
// @observer
export default class Modal extends PureComponent<PageStateProps> {
  static defaultProps = {
    data: [],
  };
  state = {
    cityName: '',
    // isOpened: false
  };
  componentWillMount() {}

  componentDidMount() {}
  componentWillUnmount() {}
  componentWillReact() {}
  componentDidHide() {}
  static options = {
    addGlobalClass: true,
  };
  close = () => {
    const { data } = this.props;
  };
  handleConfirm() {}
  handleCancel() {}
  render() {
    const { data: obj, isOpened } = this.props;
    return (
      <AtModal className="modal" isOpened={isOpened} onClose={this.close}>
        {/* className="ModalHeader" */}
        <AtModalHeader>
          {obj.date && obj.date} 周{obj.date && day[new Date(obj.date).getDay()]}
        </AtModalHeader>
        {/* className="ModalContent" */}
        <AtModalContent>
          <View className={style.innerList}>
            <View>
              <Text>温度</Text>
              <View className={style.line}></View>{' '}
              <Text>
                {obj.tmp_min}~{obj.tmp_max}°C
              </Text>
            </View>
            <View>
              <Text>白天</Text> <View className={style.line}></View> <Text>{obj.cond_txt_d}</Text>
            </View>
            <View>
              <Text>夜间</Text>
              <View className={style.line}></View>
              <Text>{obj.cond_txt_n}</Text>
            </View>
            <View>
              <Text>风力</Text>
              <View className={style.line}></View>
              <Text>
                {obj.wind_dir}
                {obj.wind_sc}
              </Text>
            </View>
            <View>
              <Text>能见度</Text>
              <View className={style.line}></View>
              <Text>{obj.vis}公里</Text>
            </View>
            <View>
              <Text>降水概率</Text>
              <View className={style.line}></View> <Text>{obj.wind_spd}%</Text>
            </View>
            <View>
              <Text>紫外线强度</Text>
              <View className={style.line}></View>
              <Text>{obj.uv_index}</Text>
            </View>
            <View>
              <Text>风速</Text>
              <View className={style.line}></View>
              <Text>{obj.pop}公里/小时</Text>
            </View>
            <View>
              <Text>大气压强</Text> <View className={style.line}></View>
              <Text>{obj.pres}</Text>
            </View>
            <View>
              <Text>日出时间</Text>
              <View className={style.line}></View>
              <Text>{obj.sr}</Text>
            </View>
            <View>
              <Text>日落时间</Text>
              <View className={style.line}></View>
              <Text>{obj.ss}</Text>
            </View>
            <View>
              <Text>相对湿度</Text>
              <View className={style.line}></View>
              <Text>{obj.hum}</Text>
            </View>
            <View>
              <Text>降水量</Text>
              <View className={style.line}></View>
              <Text>{obj.pcpn}</Text>
            </View>
            <View>
              <Text>月升</Text>
              <View className={style.line}></View>
              <Text>{obj.mr}</Text>
            </View>
            <View>
              <Text>月落</Text>
              <View className={style.line}></View>
              <Text>{obj.ms}</Text>
            </View>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}
