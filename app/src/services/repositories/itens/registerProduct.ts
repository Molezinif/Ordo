import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  where,
  query,
  doc
} from 'firebase/firestore'
import { db } from '@/../firebase'
import 'react-native-get-random-values'
import { randomUUID } from '@/utils/getRandomUUID'
import { getUserDoc } from '../users'

export const registerProduct = async (data): Promise<any> => {
  try {
    console.log('data', data)

    const formattedData = {
      productUUID: randomUUID(),
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
      createdAt: new Date(),
      updatedAt: new Date()
    }
    console.log('formattedData', formattedData)

    const userDoc = await getUserDoc()
    const StockCollection = collection(userDoc, 'stock')

    return await addDoc(StockCollection, formattedData)
  } catch (e) {
    console.log(e)
  }
}

export const editProduct = async (data): Promise<any> => {
  try {
    console.log('editData', data)

    const formattedData = {
      productUUID: data?.item?.productUUID,
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
      createdAt: data?.item?.createdAt,
      updatedAt: new Date()
    }
    console.log('formattedData', formattedData)

    const userDoc = await getUserDoc()
    const StockCollection = collection(userDoc, 'stock')

    const itemDoc = doc(StockCollection, data.item.id)

    return await setDoc(itemDoc, formattedData)
  } catch (e) {
    console.log(e)
  }
}
