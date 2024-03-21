import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/../firebase'
import 'react-native-get-random-values'
import { randomUUID } from '@/utils/getRandomUUID'

export const registerProduct = async (data): Promise<any> => {
  try {
    console.log('data', data)

    const formattedData = {
      productUUID: randomUUID(),
      productName: data?.productName,
      code: data?.code ?? null,
      quantity: data?.quantity ? Number(data?.quantity) : 1,
      costPrice: data?.costPrice
        ? parseFloat(data?.costPrice.replace(',', '.'))
        : null,
      sellingPrice: parseFloat(data?.sellingPrice.replace(',', '.')),
      brand: data?.brand ?? null,
      category: data?.category ?? null,
      expiryDate: data?.expiryDate ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    console.log('formattedData', formattedData)

    const StockCollection = collection(db, 'stock')

    return await addDoc(StockCollection, formattedData)
  } catch (e) {
    console.log(e)
  }
}
