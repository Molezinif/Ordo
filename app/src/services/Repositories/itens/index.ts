import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/../firebase'

export class ItensRepository {
  async postItens(data): Promise<any> {
    const StockCollection = collection(db, 'stock')
    const formattedData = {
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

    await addDoc(StockCollection, formattedData)

    return true
  }
}
