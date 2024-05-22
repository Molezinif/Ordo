import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  orderBy
} from 'firebase/firestore'

import { getUserDoc } from '../users'
import { getProduct } from '../itens/getProduct'

export enum ETransactionOrigin {
  inventoryReceipt = 1,
  InventoryWriteOff = 2
}

interface IMakeTransactionParams {
  externalId: string
  origin: ETransactionOrigin
  value: number
  transactionDate: Date
}

export const monthNamesResumed = [
  'JAN 24',
  'FEV 24',
  'MAR 24',
  'ABR 24',
  'MAI 24',
  'JUN 24',
  'JUL 24',
  'AGO 24',
  'SET 24',
  'OUT 24',
  'NOV 24',
  'DEZ 24'
]

export const monthNames = [
  'JANEIRO',
  'FEVEREIRO',
  'MARÇO',
  'ABRIL',
  'MAIO',
  'JUNHO',
  'JULHO',
  'AGOSTO',
  'SETEMBRO',
  'OUTUBRO',
  'NOVEMBRO',
  'DEZEMBRO'
]

export const makeTransaction = async (data: IMakeTransactionParams) => {
  try {
    const userDoc = await getUserDoc()
    const transactionCollection = collection(userDoc, 'transaction')

    return await addDoc(transactionCollection, data)
  } catch (e) {
    console.error(e)
    return false
  }
}

export const getTransactionAnalytics = async () => {
  try {
    const userDoc = await getUserDoc()
    const transactionCollection = collection(userDoc, 'transaction')

    const snapshotInventoryReceipt = await getDocs(
      query(
        transactionCollection,
        where('origin', '==', ETransactionOrigin.inventoryReceipt)
      )
    )

    const snapshotWriteOff = await getDocs(
      query(
        transactionCollection,
        where('origin', '==', ETransactionOrigin.InventoryWriteOff)
      )
    )

    let totals = {}
    let largestEntryTransaction = 0
    let largestWriteOffTransaction = 0
    let largestProfit = 0

    for (const doc of snapshotInventoryReceipt.docs) {
      const transactionData = doc.data() as any
      const month = new Date(
        transactionData.transactionDate.seconds * 1000 +
          transactionData.transactionDate.nanoseconds / 1000000
      ).getMonth()

      if (!totals[monthNamesResumed[month]]?.label) {
        totals[monthNamesResumed[month]] = {
          ...totals?.[monthNamesResumed[month]],
          label: monthNamesResumed[month]
        }
      }

      const entry = totals[monthNamesResumed[month]]?.entry ?? 0
      totals[monthNamesResumed[month]] = {
        ...totals?.[monthNamesResumed[month]],
        entry: entry + transactionData.value || 0
      }
      largestEntryTransaction =
        largestEntryTransaction < totals[monthNamesResumed[month]]?.entry
          ? totals[monthNamesResumed[month]]?.entry
          : largestEntryTransaction
    }

    for (const doc of snapshotWriteOff.docs) {
      const transactionData = doc.data() as any
      const month = new Date(
        transactionData.transactionDate.seconds * 1000 +
          transactionData.transactionDate.nanoseconds / 1000000
      ).getMonth()

      if (!totals[monthNamesResumed[month]]?.label) {
        totals[monthNamesResumed[month]] = {
          ...totals?.[monthNamesResumed[month]],
          label: monthNamesResumed[month]
        }
      }

      const writeOff = totals[monthNamesResumed[month]]?.writeOff ?? 0
      totals[monthNamesResumed[month]] = {
        ...totals?.[monthNamesResumed[month]],
        writeOff: writeOff + transactionData.value || 0
      }

      largestWriteOffTransaction =
        largestWriteOffTransaction < totals[monthNamesResumed[month]]?.writeOff
          ? totals[monthNamesResumed[month]]?.writeOff
          : largestWriteOffTransaction
    }
    const orderObjs = (obj) => {
      const ordered = Object.entries(obj).sort(
        ([a], [b]) =>
          monthNamesResumed.indexOf(a) - monthNamesResumed.indexOf(b)
      )

      return Object.fromEntries(ordered)
    }

    Object.entries(totals).map(([_, value]: any) => {
      const currentProfit = value.writeOff - value.entry
      largestProfit =
        largestProfit < currentProfit ? currentProfit : largestProfit
    })

    return {
      chartData: {
        datasets: Object.entries(orderObjs(totals)).map(
          ([key, value]: any) => ({
            label: key,
            data: {
              entry: value.entry
                ? Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(value.entry)
                : 0,
              profit:
                value.writeOff && value.entry
                  ? Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(value.writeOff - value.entry)
                  : 0,
              entryPercentage: Math.round(
                (value.entry / largestEntryTransaction) * 100
              ),
              profitPercentage: Math.round(
                ((value.writeOff - value.entry) / Math.abs(largestProfit)) * 100
              )
            }
          })
        ),
        largestEntryTransaction,
        largestWriteOffTransaction
      },
      analytics: Object.entries(totals).map(([key, value]: any) => [
        { month: key, ...value }
      ])
    }
  } catch (error) {
    console.error('Error fetching inventory receipt totals:', error)
    return false
  }
}

export const getProductsTransactions = async () => {
  try {
    const userDoc = await getUserDoc()
    const transactionCollection = collection(userDoc, 'transaction')

    const snapshotInventoryReceipt = await getDocs(
      query(
        transactionCollection,
        where('origin', '==', ETransactionOrigin.inventoryReceipt),
        orderBy('transactionDate', 'desc')
      )
    )

    const data = snapshotInventoryReceipt.docs.map((doc) => doc.data())

    const productIds = data.map((transaction) => transaction.externalId)

    const products = await Promise.all(
      productIds.map(async (productId) => {
        return await getProduct(productId)
      })
    )

    function transformTransactions(transactions, products) {
      const groupedByMonth = transactions.reduce((acc, transaction) => {
        const transactionDate = new Date(
          transaction.transactionDate.seconds * 1000
        )

        const regex = /\sde\s/g

        const month = transactionDate
          .toLocaleString('pt-BR', {
            month: 'long',
            year: '2-digit'
          })
          .replace(regex, ' ')
          .toUpperCase()

        if (!acc[month]) {
          acc[month] = {
            groupMonthDetails: {
              month,
              totalValue: 0
            },
            itens: []
          }
        }

        acc[month].groupMonthDetails.totalValue += transaction.value
        acc[month].itens.push({
          productUUID: transaction.externalId,
          name: products.find(
            (product) => product.productUUID === transaction.externalId
          )?.productName,
          value: transaction.value
        })

        return acc
      }, {})

      // Convert object to array
      return Object.values(groupedByMonth)
    }

    return transformTransactions(data, products)
  } catch (error) {
    console.error('Error fetching inventory receipt totals:', error)
    return false
  }
}

export const getAllTransactions = async () => {
  try {
    const userDoc = await getUserDoc()
    const transactionCollection = collection(userDoc, 'transaction')

    const snapshotInventoryReceipt = await getDocs(
      query(transactionCollection, orderBy('transactionDate', 'desc'))
    )

    const data = snapshotInventoryReceipt.docs.map((doc) => doc.data())

    return data.map((item) => {
      const transactionDate = new Date(item.transactionDate.seconds * 1000)

      return {
        transactionDate: transactionDate.toLocaleString('pt-BR', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        }),
        type: item.origin,
        value: item.value
      }
    })
  } catch (error) {
    console.error('Error fetching inventory receipt totals', error)
    return false
  }
}
