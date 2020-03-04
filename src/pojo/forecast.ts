import { daily_forecast } from '@/interface/index'
import { cache } from '@/interface/index'

export class Forecast extends cache {
    data: {
        parent_city: string
        daily_forecast: daily_forecast[]
    }
}