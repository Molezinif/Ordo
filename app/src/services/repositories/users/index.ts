import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  DocumentData,
  DocumentReference,
  collection,
  doc
} from 'firebase/firestore'
import { db } from '../../../../firebase'

export const getUserDoc = async (): Promise<
  DocumentReference<DocumentData, DocumentData>
> => {
  const user = await AsyncStorage.getItem('@RNAuth:user')
  const userCollection = collection(db, `users`)
  return doc(userCollection, JSON.parse(user as string).uid)
}
