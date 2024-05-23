import { collection, addDoc } from 'firebase/firestore'
import 'react-native-get-random-values'
import { randomUUID } from '@/utils/getRandomUUID'
import { getUserDoc } from '../users'
import { makeTransaction, ETransactionOrigin } from '../transactions'

export const registerProduct = async (data): Promise<any> => {
  try {
    const productUUID = randomUUID()

    const transactionDate = new Date()

    const formattedData = {
      productUUID,
      productName: data?.item?.productName,
      code: data?.item?.code ?? null,
      quantity: data?.item?.quantity ? Number(data?.item?.quantity) : 1,
      costPrice: data?.item?.costPrice
        ? parseFloat(data?.item?.costPrice.replace(',', '.'))
        : null,
      sellingPrice: parseFloat(data?.item?.sellingPrice.replace(',', '.')),
      brand: data?.item?.brand ?? null,
      category: data?.item?.category ?? null,
      expiryDate: data?.item?.expiryDate ?? null,
      productScore: {
        score: 0,
        totalScore: 0
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const userDoc = await getUserDoc()
    const StockCollection = collection(userDoc, 'stock')

    await makeTransaction({
      externalId: productUUID,
      origin: ETransactionOrigin.inventoryReceipt,
      value:
        formattedData.costPrice && formattedData.quantity
          ? formattedData.costPrice * formattedData.quantity
          : 0,
      transactionDate
    })

    return await addDoc(StockCollection, formattedData)
  } catch (e) {
    console.error(e)
  }
}
