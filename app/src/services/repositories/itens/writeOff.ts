import { getUserDoc } from '../users'
import {
  collection,
  query,
  where,
  updateDoc,
  getDocs
} from 'firebase/firestore'

export const writeOffProducts = async (data): Promise<any> => {
  try {
    const userDoc = await getUserDoc()
    const itemCollection = collection(userDoc, 'stock')

    if (data.itens.length === 0) {
      return false
    }

    data.itens.forEach(async (item) => {
      const itemQuery = query(
        itemCollection,
        where('productUUID', '==', item.productUUID)
      )
      const itemDoc = await getDocs(itemQuery).then((data) => data.docs[0])

      const itemData = itemDoc.data()
      const newQuantity = itemData.quantity - item.selectedQuantity

      const newQuantitySold =
        itemData.productScore.quantitySold + item.selectedQuantity

      const newValueSold =
        itemData.productScore.valueSold +
        item.sellingPrice * item.selectedQuantity

      if (newQuantity < 0) {
        return false
      }

      await updateDoc(itemDoc.ref, {
        quantity: newQuantity,
        productScore: {
          quantitySold: newQuantitySold,
          valueSold: newValueSold
        }
      })
      return true
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
