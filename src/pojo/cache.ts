
import { Now } from './now'
import { Life } from './life'
import { Weather } from './weather'
import { Forecast } from './forecast'
export default class Cache {
    now: Now=new Now()
    life: Life=new Life()
    air: Weather=new Weather()
    forecast: Forecast=new Forecast()
} 