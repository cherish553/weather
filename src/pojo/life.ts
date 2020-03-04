import { lifestyle } from '@/interface/index'
import { cache } from '@/interface/index'
export class Life extends cache {
    data: {
        parent_city: string
        lifestyle: lifestyle[]
    }
}