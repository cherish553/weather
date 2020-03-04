import { air_now_city } from '@/interface/index'
import { cache } from '@/interface/index'
export class Weather extends cache {
    data: {
        parent_city: string
        air_now_city: air_now_city
    }
}