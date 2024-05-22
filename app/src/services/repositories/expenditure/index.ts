import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  sum
} from 'firebase/firestore'
import { getUserDoc } from '../users'
import { randomUUID } from '@/utils/getRandomUUID'
import { getProductsTransactions } from '../transactions'

export enum EExpenditureType {
  variable = 1,
  others = 2
}

const expenditureTypeObjectMap = {
  [EExpenditureType.variable]: 'variable',
  [EExpenditureType.others]: 'others'
}

const regex = /\sde\s/g

export interface IMakeExpenditureParams {
  type: EExpenditureType
  name: string
  value: number
  expenditureDate?: Date
}

export const makeExpenditure = async (data: IMakeExpenditureParams) => {
  try {
    const userDoc = await getUserDoc()
    const expenditureCollection = collection(userDoc, 'expenditure')

    const formattedData = {
      ...data,
      id: randomUUID(),
      expenditureDate: data?.expenditureDate
        ? data.expenditureDate
        : new Date(),
      createdAt: new Date()
    }

    return await addDoc(expenditureCollection, formattedData)
  } catch (e) {
    console.error(e)
    return false
  }
}

export const deleteExpenditure = async (expenditureUUID: string) => {
  try {
    const userDoc = await getUserDoc()
    const expenditureCollection = collection(userDoc, 'expenditure')

    const snapshotExpenditure = await getDocs(
      query(expenditureCollection, where('id', '==', expenditureUUID))
    )

    return await deleteDoc(snapshotExpenditure.docs[0].ref)
  } catch (e) {
    console.error(e)
    return false
  }
}

export const editExpenditure = async (expenditureUUID: string, data) => {
  try {
    const userDoc = await getUserDoc()
    const expenditureCollection = collection(userDoc, 'expenditure')

    const snapshotExpenditure = await getDocs(
      query(expenditureCollection, where('id', '==', expenditureUUID))
    )

    const expenditureDoc = snapshotExpenditure.docs[0]

    return await updateDoc(expenditureDoc.ref, data)
  } catch (e) {
    console.error(e)
    return false
  }
}

interface IGetExpenditureProps {
  type: EExpenditureType
}

export const getExpenditures = async ({ type }: IGetExpenditureProps) => {
  try {
    const userDoc = await getUserDoc()
    const expenditureCollection = collection(userDoc, 'expenditure')

    const snapshotExpenditure = await getDocs(
      query(
        expenditureCollection,
        where('type', '==', type),
        orderBy('expenditureDate', 'desc')
      )
    )

    const data = snapshotExpenditure.docs.map((doc) => doc.data())

    function createDefaultGroup() {
      const currentDate = new Date()
      const months = {} // Object to store months with formatted keys

      function getMonthName(monthIndex, yearIndex) {
        return new Date(yearIndex, monthIndex, 1)
          .toLocaleString('pt-BR', {
            month: 'long',
            year: '2-digit'
          })
          .replace(regex, ' ')
          .toUpperCase()
      }

      for (let i = 0; i < 6; i++) {
        let monthIndex = currentDate.getMonth() - i
        let yearIndex = currentDate.getFullYear()

        // Handle month overflow and year change
        if (monthIndex < 0) {
          monthIndex = 11
          yearIndex -= 1
        }

        const monthName = getMonthName(monthIndex, yearIndex)
        const formattedKey = monthName

        months[formattedKey] = {
          groupMonthDetails: {
            totalValue: 0, // Assuming you want to calculate totalValue later
            month: monthName,
            dateObj: new Date(yearIndex, monthIndex, 1)
          },
          itens: [] // Empty array for future item storage
        }
      }

      return months
    }

    function transformExpenditures(expenditures) {
      const groupedByMonth = expenditures.reduce((acc, expenditure) => {
        const expenditureDate = new Date(
          expenditure.expenditureDate.seconds * 1000
        )
        const month = expenditureDate
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
              dateObj: expenditureDate,
              totalValue: 0
            },
            itens: []
          }
        }

        acc[month].groupMonthDetails.totalValue += expenditure.value
        acc[month].itens.push({
          expenditureUUID: expenditure.id,
          name: expenditure.name,
          value: expenditure.value,
          expenditureDate: expenditureDate
        })

        return acc
      }, {})

      return Object.keys(groupedByMonth).length
        ? Object.values({
            ...createDefaultGroup(),
            ...groupedByMonth
          })
        : Object.values(createDefaultGroup())
    }

    return transformExpenditures(data)
  } catch (error) {
    const currentDate = new Date()
    console.error('error', error)
    return [
      {
        totalValue: 0,
        month: currentDate
          .toLocaleString('pt-BR', {
            month: 'long',
            year: '2-digit'
          })
          .replace(regex, ' ')
          .toUpperCase(),
        dateObj: currentDate
      }
    ]
  }
}

export const getAverageMonthlyExpenditures = async () => {
  try {
    const userDoc = await getUserDoc()
    const expenditureCollection = collection(userDoc, 'expenditure')

    const snapshotExpenditure = await getDocs(
      query(expenditureCollection, orderBy('expenditureDate', 'desc'))
    )

    const data = snapshotExpenditure.docs.map((doc) => doc.data())

    const productsExpenditures = await getProductsTransactions()

    function transformExpenditures(expenditures) {
      const groupedByMonth = expenditures.reduce((acc, expenditure) => {
        const expenditureDate = new Date(
          expenditure.expenditureDate.seconds * 1000
        )
        const month = expenditureDate
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
              dateObj: expenditureDate,
              totalValue: 0
            },
            itens: []
          }
        }

        acc[month].groupMonthDetails.totalValue += expenditure.value
        acc[month].itens.push({
          expenditureUUID: expenditure.id,
          name: expenditure.name,
          value: expenditure.value,
          expenditureDate: expenditureDate,
          type: expenditure.type
        })

        return acc
      }, {})

      const averageMonthlyExpenditure = Object.values(groupedByMonth).reduce(
        (acc: any, expenditure: any) => {
          expenditure?.itens?.map((item) => {
            if (item.type === EExpenditureType.variable && item.value) {
              acc[
                expenditureTypeObjectMap[EExpenditureType.variable]
              ].totalValue += item.value
            }

            if (item.type === EExpenditureType.others && item.value) {
              acc[
                expenditureTypeObjectMap[EExpenditureType.others]
              ].totalValue += item.value
            }
          })

          acc[
            expenditureTypeObjectMap[EExpenditureType.variable]
          ].monthsLength += 1
          acc[expenditureTypeObjectMap[EExpenditureType.others]].monthsLength +=
            1

          acc.totalValue = expenditure.groupMonthDetails.totalValue
          return acc
        },
        {
          totalValue: 0,
          [expenditureTypeObjectMap[EExpenditureType.variable]]: {
            totalValue: 0,
            monthsLength: 0
          },
          [expenditureTypeObjectMap[EExpenditureType.others]]: {
            totalValue: 0,
            monthsLength: 0
          }
        }
      ) as any

      const averageMonthlyExpenditureProducts = productsExpenditures
        ? (productsExpenditures.reduce(
            (acc: any, expenditure: any) => {
              acc.totalValue += expenditure.groupMonthDetails.totalValue
              acc.monthsLength += 1
              return acc
            },
            {
              totalValue: 0,
              monthsLength: 0
            }
          ) as any)
        : {}

      const calculatedTotalValueAverage = {
        averageVariableCost:
          averageMonthlyExpenditure.variable.totalValue /
          averageMonthlyExpenditure.variable.monthsLength,
        averageOtherCost:
          averageMonthlyExpenditure.others.totalValue /
          averageMonthlyExpenditure.others.monthsLength,
        averageInventoryCost:
          averageMonthlyExpenditureProducts.totalValue /
          averageMonthlyExpenditureProducts.monthsLength
      }

      return {
        ...calculatedTotalValueAverage,
        averageTotalCost:
          calculatedTotalValueAverage.averageOtherCost +
          calculatedTotalValueAverage.averageVariableCost +
          calculatedTotalValueAverage.averageInventoryCost / 3
      }
    }

    return transformExpenditures(data)
  } catch (error) {
    const currentDate = new Date()
    console.error('error', error)
    return {
      averageInventoryCost: 0,
      averageVariableCost: 0,
      averageOtherCost: 0,
      averageTotalCost: 0
    }
  }
}
