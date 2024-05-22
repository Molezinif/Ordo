import {
  collection,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { getUserDoc } from '../users'
import { ETransactionOrigin, makeTransaction } from '../transactions'

export const editProduct = async (data): Promise<any> => {
  try {
    const formattedData = {
      productUUID: data?.item?.productUUID,
      productName: data?.item?.productName,
      code: data?.item?.code ?? null,
      quantity: data?.item?.quantity ? Number(data?.item?.quantity) : 0,
      costPrice: data?.item?.costPrice
        ? parseFloat(data?.item?.costPrice.replace(',', '.'))
        : null,
      sellingPrice: parseFloat(data?.item?.sellingPrice.replace(',', '.')),
      brand: data?.item?.brand ?? null,
      category: data?.item?.category ?? null,
      expiryDate: data?.item?.expiryDate ?? null,
      productScore: data?.item?.productScore,
      createdAt: data?.item?.createdAt,
      updatedAt: new Date()
    }

    const userDoc = await getUserDoc()
    const stockCollection = collection(userDoc, 'stock')

    const snapshotstock = await getDocs(
      query(
        stockCollection,
        where('productUUID', '==', formattedData.productUUID)
      )
    )

    const stockDoc = snapshotstock.docs[0]

    const quantityDiff =
      formattedData?.quantity - Number(data?.item?.quantityBeforeEdit)

    if (quantityDiff > 0) {
      makeTransaction({
        externalId: formattedData.productUUID,
        origin: ETransactionOrigin.inventoryReceipt,
        value:
          formattedData.costPrice && quantityDiff
            ? formattedData.costPrice * quantityDiff
            : 0,
        transactionDate: new Date()
      })
    }

    return await updateDoc(stockDoc.ref, formattedData)
  } catch (e) {
    console.error('err', e)
  }
}
