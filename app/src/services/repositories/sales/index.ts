import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  limit
} from 'firebase/firestore'
import { randomUUID } from '@/utils/getRandomUUID'
import { getUserDoc } from '../users'

export const postCurrentSale = async (data): Promise<any> => {
  const userDoc = await getUserDoc()
  const salesCollection = collection(userDoc, 'sales')

  const formattedData = {
    saleHistoryUUID: randomUUID(),
    ...data,
    total: Number(data?.total),
    createdAt: new Date().toISOString()
  }

  await addDoc(salesCollection, formattedData)

  return true
}

export const getSalesHistory = async (): Promise<any> => {
  const userDoc = await getUserDoc()
  const salesCollection = collection(userDoc, 'sales')
  const q = query(salesCollection, orderBy('createdAt', 'desc'), limit(6))
  const querySnapshot = await getDocs(q).then((data) => data)

  const result = querySnapshot.docs.map((doc) => doc.data())

  return result
}
