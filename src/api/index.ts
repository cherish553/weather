// key=74c6266dae0844b9ac5fe4cbda81d585
/**
 * 一、常规天气数据
 * https://free-api.heweather.net/s6/weather/{weather-type}?{parameters}
 */
/**
 * @param {weather-type}
 * now	        实况天气
 * forecast	    3-10天预报
 * hourly	    逐小时预报
 * lifestyle    生活指数
 * */
/**
 * @param {location=beijing&key=xxx}
 */

/**
 * 二、空气质量
 * https://free-api.heweather.net/s6/air/{air-type}?{parameters}
 */
/**
 * @param {air-type}
 * now	        空气质量实况
 */
import http from '@/util/index'
import { location } from '@/interface/index'
export default {
    // 获取当前天气
    getWeatherNow: (data: location) => http.get(`weather/now`, data).then((res: any) => {
        const { basic: { parent_city }, now } = res
        return { parent_city, ...now }
    }),
    // 获取天气预报
    getWeatherForecast: (data: location) => http.get(`weather/forecast`, data).then((res: any) => {
        const { basic: { parent_city }, ...rest} = res
        return { parent_city, ...rest }
    }),
    // 获取生活方式
    getWeatherLifestyle: (data: location) => http.get(`weather/lifestyle`, data).then((res: any) => {
        const { basic: { parent_city }, ...rest } = res
        return { parent_city, ...rest }
    }),
    // 获取空气质量
    getWeatherAir: (data: location) => http.get(`air/now`, data).then((res: any) => {
        const { basic: { parent_city }, air_now_city } = res
        return { parent_city, air_now_city }
    })
}

