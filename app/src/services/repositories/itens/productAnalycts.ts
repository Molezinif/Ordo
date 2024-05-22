import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore'
import { getUserDoc } from '../users'

export const getProductsAnalytic = async () => {
  const userDoc = await getUserDoc()
  const stockCollection = collection(userDoc, 'stock')

  const snapshotTopFiveBilledProducts = await getDocs(
    query(stockCollection, orderBy('productScore.valueSold', 'desc'), limit(5))
  ).then((data) => data)

  const snapshotTopFiveProcuctsSoldQuantity = await getDocs(
    query(
      stockCollection,
      orderBy('productScore.quantitySold', 'desc'),
      limit(5)
    )
  ).then((data) => data)

  const topFiveBilledProducts = snapshotTopFiveBilledProducts.docs.map((doc) =>
    doc.data()
  )

  const topFiveProductsSoldQuantity =
    snapshotTopFiveProcuctsSoldQuantity.docs.map((doc) => doc.data())

  const graphColors = ['#395E66', '#387D7A', '#32936F', '#26A96C', '#2BC016']

  return {
    topFiveBilledProducts: topFiveBilledProducts.map((item, index) => {
      return {
        name: item.productName,
        population: item?.productScore?.valueSold ?? 0,
        color: graphColors[index]
      }
    }),
    topFiveProductsSoldQuantity: topFiveProductsSoldQuantity.map(
      (item, index) => {
        return {
          name: item.productName,
          population: item?.productScore?.quantitySold ?? 0,
          color: graphColors[index]
        }
      }
    )
  }
}
