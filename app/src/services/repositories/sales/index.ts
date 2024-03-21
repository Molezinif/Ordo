import { collection, addDoc, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/../firebase'
import { randomUUID } from '@/utils/getRandomUUID'

export class SalesRepository {
  async postCurrentSale(data): Promise<any> {
    const SalesCollection = collection(db, 'sales')

    const formattedData = {
      saleHistoryUUID: randomUUID(),
      ...data,
      total: Number(data?.total),
      createdAt: new Date().toISOString()
    }

    await addDoc(SalesCollection, formattedData)

    return true
  }

  async getSalesHistory(): Promise<any> {
    const q = query(collection(db, 'sales'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q).then((data) => data)

    const result = querySnapshot.docs.map((doc) => doc.data())

    return result
  }
}
