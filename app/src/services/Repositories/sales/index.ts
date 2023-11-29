import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/../firebase'

export class SalesRepository {
  async postCurrentSale(data): Promise<any> {
    const SalesCollection = collection(db, 'sales')

    await addDoc(SalesCollection, data)

    return true
  }
}
