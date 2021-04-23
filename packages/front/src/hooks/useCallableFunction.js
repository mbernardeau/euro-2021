import { useFirebaseApp } from 'reactfire'

export const useFunctionsInRegion = () => {
  return useFirebaseApp().functions('europe-west3')
}
