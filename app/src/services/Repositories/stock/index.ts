import { query, collection, getDocs } from 'firebase/firestore'
import { db } from '@/../firebase'

export class StockRepository {
  async getStocks(): Promise<any> {
    const q = query(collection(db, 'Stock'))
    const querySnapshot = await getDocs(q).then((data) => data)

    return querySnapshot.docs.map((doc) => doc.data())
  }
}
