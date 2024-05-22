import {
  query,
  collection,
  getDocs,
  orderBy,
  DocumentData,
} from 'firebase/firestore'
import { getUserDoc } from '../users'

export const getStock = async (): Promise<DocumentData[]> => {
  const userDoc = await getUserDoc()
  const q = query(
    collection(userDoc, 'stock'),
    orderBy('createdAt')
  )
  const querySnapshot = await getDocs(q).then((data) => data)

  const result = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id
    }
  })

  return result
}

export const queryStockSearch = async (sq: string): Promise<DocumentData[]> => {
  const userDoc = await getUserDoc()
  const q = query(
    collection(userDoc, 'stock'),
    orderBy('createdAt', 'desc')
  )
  const querySnapshot = await getDocs(q).then((data) => data)

  const result = querySnapshot.docs.map((doc) => doc.data())

  // yes i know, this is not the best way to do this, but i'm poor
  return result.filter((item) => {
    const itemName = item.productName.toLowerCase()
    return itemName.includes(sq.toLowerCase())
  })
}
