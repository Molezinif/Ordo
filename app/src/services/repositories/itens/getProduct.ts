import { collection, getDocs, query, where } from 'firebase/firestore'
import { getUserDoc } from '../users'

export const getProduct = async (productUUID: string): Promise<any> => {
  try {
    const userDoc = await getUserDoc()
    const itemCollection = collection(userDoc, 'stock')

    const itemQuery = query(
      itemCollection,
      where('productUUID', '==', productUUID)
    )
    const itemDoc = await getDocs(itemQuery).then((data) => data?.docs[0])

    if(!itemDoc) {
      console.log('Item não encontrado', productUUID)
    }

    return itemDoc.data()
  } catch (e) {
    return false
  }
}
