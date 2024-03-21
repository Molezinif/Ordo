import {
  query,
  collection,
  getDocs,
  orderBy,
  DocumentData
} from 'firebase/firestore'
import { db } from '@/../firebase'

export const getStock = async (): Promise<DocumentData[]> => {
  const q = query(collection(db, 'stock'), orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q).then((data) => data)

  const result = querySnapshot.docs.map((doc) => doc.data())

  return result
}

export const queryStockSearch = async (sq: string): Promise<DocumentData[]> => {
  const q = query(collection(db, 'stock'), orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q).then((data) => data)

  const result = querySnapshot.docs.map((doc) => doc.data())

  // yes i know, this is not the best way to do this, but i'm poor
  return result.filter((item) => {
    const itemName = item.productName.toLowerCase()
    return itemName.includes(sq.toLowerCase())
  })
}
