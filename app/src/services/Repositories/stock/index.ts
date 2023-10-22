import { query, collection, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/../firebase'

export class StockRepository {
  async getStocks(): Promise<any> {
    const q = query(collection(db, 'stock'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q).then((data) => data)

    const result = querySnapshot.docs.map((doc) => doc.data())

    return result
  }
}
