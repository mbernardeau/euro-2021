import { useMemo } from 'react'
import { useRemoteConfigString } from 'reactfire'

export const useCompetitionData = () => {
  const competition = useRemoteConfigString('COMPETITION_DATA')

  return useMemo(() => {
    try {
      return JSON.parse(competition.data)
    } catch (error) {
      console.error(
        'Cannot parse COMPETITION_DATA as JSON, got ',
        competition.data,
      )
      return {
        startDate: '2021-06-11T19:00:00.000Z',
        name: 'Euro 2021',
      }
    }
  }, [competition.data])
}
