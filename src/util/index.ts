import Taro from '@tarojs/taro'
import qs from 'qs'
import { location } from '@/interface/index'
const interceptor = async (chain:any) => {
    const { requestParams } = chain
    requestParams.url = `${process.env.BASE_URL}${requestParams.url}`
    const { data: { HeWeather6: [data] } } = await chain.proceed(requestParams)
    return data
}

Taro.addInterceptor(interceptor)
class http {
    get(url: string, data: location): Promise<Object> {
        return Taro.request({
            url: `${url}?${qs.stringify({ ...data, key: process.env.REQUEST_KEY })}`,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
        })
    }
}
export default new http()