import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/../firebase'

export class ItensRepository {
  async postItens(data): Promise<any> {
    console.log(data)
    const StockCollection = collection(db, 'Stock')
    const formattedData = {
      productName: data?.productName,
      code: data?.code ?? null,
      quantity: data?.quantity ? Number(data?.quantity) : null,
      costPrice: data?.costPrice
        ? parseFloat(data?.costPrice.replace(',', '.'))
        : null,
      sellingPrice: parseFloat(data?.sellingPrice.replace(',', '.')),
      brand: data?.brand ?? null,
      category: data?.category ?? null,
      expiryDate: data?.expiryDate ?? null
    }

    await addDoc(StockCollection, formattedData)

    return true
  }
}
