import { get, orderBy, round } from 'lodash-es'
import { useMemo } from 'react'
import type { Data } from '../page/SummaryInformation'
import { surveyList } from '../page/survey-constants'
import { FadeText } from './FadeText'

type SummaryProps = {
  filteredData: Data[]
  title: string
  dataKey: Extract<keyof Data, 'job' | 'action' | 'belief' | 'agreedText'>
}

type SummaryItemProps = {
  range: string
  count: number
  percentage: number
}

const SummaryItem = ({ range, count, percentage }: SummaryItemProps) => {
  return (
    <div>
      <div className="flex justify-between items-center text-gray-700 mb-1">
        <span className="font-medium w-3/5">{range}</span>
        <span className="text-sm text-gray-500">
          <FadeText>{count} คน</FadeText>
        </span>

        <span className="text-sm text-gray-500 w-1/5 text-right">
          <FadeText>{percentage}%</FadeText>
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-800"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

const Summary = ({ filteredData, title, dataKey }: SummaryProps) => {
  const Summary = useMemo(() => {
    const summary: Record<string, number> = {}

    get(surveyList, [dataKey]).forEach(range => {
      summary[range] = 0
    })

    filteredData.forEach(entry => {
      const key = entry[dataKey] || ''
      summary[key] ??= 0
      summary[key]++
    })

    return summary
  }, [dataKey, filteredData])

  return (
    <div className="bg-white rounded-2xl shadow-md px-6 pt-2 pb-4 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h2>

      <div className="space-y-4">
        {orderBy(Object.entries(Summary), ['1'], ['desc']).map(([range, count]) => {
          const percentage = round((count / filteredData.length) * 100, 2)
          return <SummaryItem key={range} range={range} count={count} percentage={percentage} />
        })}
      </div>
    </div>
  )
}

export default Summary
