import Taro from '@tarojs/taro';
import { observable } from 'mobx'
import Cache from '@/pojo/cache'
import api from '@/api/index'
import { throttleObservable } from '@/interface/index'
import cacheLocation from './location'
const { getWeatherNow, getWeatherForecast, getWeatherLifestyle, getWeatherAir } = api
/** api */
const requestType = {
    now: getWeatherNow,
    forecast: getWeatherForecast,
    life: getWeatherLifestyle,
    air: getWeatherAir
}

const data: throttleObservable = {
    cacheData: (() => {
        const cache = Taro.getStorageSync('userInfo');
        if (cache) return cache
        const data = new Cache()
        Taro.setStorage({ key: 'userInfo', data });
        return data
    })(),
    /** 
     * @param {type} 查询天气格式
     * @param {location} 查询天气地理位置,空代表查询不读取缓存
     */
    async updatedData(type: string, location?: string): Promise<Object> {
        /** 查询指定区域数据，不使用本地缓存 */
        if (location) {
            const weatherData = await requestType[type]({ location })
            return weatherData
        }
        /** 查询当前所在地数据，先查看本地缓存 */
        const cacheData = throttle.cacheData[type]
        const preTime: number = cacheData.date
        const nowDate: number = new Date().getTime()
        if (nowDate - preTime <= 1000 * 60 * 60 * 2 && cacheData.data) return cacheData.data
        /** 不读取缓存 */
        if(!cacheLocation.location) return {
            parent_city:''
        }
        const weatherData = await requestType[type]({ location: location || cacheLocation.location })
        cacheData.data = weatherData
        const cache = Taro.getStorageSync('userInfo');
        cache[type] = {
            data: weatherData,
            date: new Date().getTime()
        }

        Taro.setStorage({ key: 'userInfo', data: cache });
        return weatherData
    },
}
const throttle: throttleObservable = observable(data)
export default throttle