import Cache from '@/pojo/cache'
/** 输入框 */
export interface CherishInput {
    cityChange: cityChange
    cityName: string
    searchNowWeather: any,
    color?: string,
    placeholderStyle?: string,
}
/** card */
export interface cherishCard {
    data: card
}
/** 公共头部 */
export interface title {
    /** 头部标题名称 */
    name: string
}
/** 公共card */
export interface card {
    /** 头部标题名称 */
    title: string,
    inner: string,
    color?: string
}
/** 改变城市change时间 */
export interface cityChange {
    (cityName: string): void
}
/** 生活方式 */
export interface lifestyle {
    type: string,
    brf: string,
    txt: string
}
/** 天气预报 */
export interface daily_forecast {
    cond_code_d: string
    cond_code_n: string
    cond_txt_d: string
    cond_txt_n: string
    date: string
    hum: string
    mr: string
    ms: string
    pcpn: string
    pop: string
    pres: string
    sr: string
    ss: string
    tmp_max: string
    tmp_min: string
    uv_index: string
    vis: string
    wind_dir: string
    wind_sc: string
    wind_spd: string
}
/** 天气指数 */
export interface air_now_city {
    aqi: string
    qlty: string
    main: string
    pm25: string
    pm10: string
    no2: string
    so2: string
    co: string
    o3: string
    pub_time: string
}
/** 存储throttle的格式 */
export class cache {
    date = new Date().getTime()
}
/** throttle mobx */
export interface throttleObservable {
    cacheData: Cache,
    updatedData: throttleUpdatedData
}
interface throttleUpdatedData {
    (type: string, location?: string): Promise<Object>
}
/** http Params */
export interface location {
    location: string
}