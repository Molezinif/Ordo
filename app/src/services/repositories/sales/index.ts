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
import { ETransactionOrigin, makeTransaction } from '../transactions'
import { writeOffProducts } from '../itens/writeOff'

export const postCurrentSale = async (data): Promise<any> => {
  const userDoc = await getUserDoc()
  const salesCollection = collection(userDoc, 'sales')

  const transactionDate = new Date()

  const saleHistoryUUID = randomUUID()
  const formattedData = {
    saleHistoryUUID,
    ...data,
    total: Number(data?.total),
    createdAt: transactionDate
  }

  const remoteWriteOffProducts = await writeOffProducts({
    itens: data?.itens
  })

  if (!remoteWriteOffProducts) {
    return false
  }

  await makeTransaction({
    externalId: saleHistoryUUID,
    origin: ETransactionOrigin.InventoryWriteOff,
    value: data?.total ? Number(data?.total) : 0,
    transactionDate
  })

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
