import Taro, { PureComponent } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { cherishCard } from '@/interface/index'
import style from './index.module.scss'

export default class Index extends PureComponent<cherishCard>{
    static defaultProps = {
        data: {
            title: '',
            inner: '',
        }
    }
    render() {
        const { data: { inner, title, color } } = this.props
        return (
            <View className={style.card} >
                <View style={
                    color && { color }
                } className={style.inner}>{inner}</View>
                <View style={
                    color && { color }
                } className={style.title}>{title}</View>
            </View >
        )
    }
}