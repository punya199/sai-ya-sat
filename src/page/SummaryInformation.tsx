import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import axios from 'axios'
import { orderBy } from 'lodash-es'
import { useMemo, useState } from 'react'
import { FadeText } from '../components/FadeText'
import Summary from '../components/Summary'
import { appConfig } from '../config/app-config'
import { surveyList } from './survey-constants'

export type Data = {
  id: number
  country: string
  age: string
  job: string
  belief: string
  action: string
  isAgreed?: boolean
  agreedText?: string
}

const SummaryInformation = () => {
  const { data: surveyData = [] } = useQuery({
    queryKey: ['survey'],
    queryFn: async () => {
      const { data } = await axios.get<Data[]>(`${appConfig().VITE_API_DOMAIN}/survey`)

      return data.map(e => {
        e.agreedText = e.isAgreed ? 'ดี' : 'ไม่ดี'
        return e
      })
    },
    refetchInterval: 5_000,
  })
  const [selectedAge, setSelectedAge] = useState<string | null>(null)

  const handleClickAge = (age: string) => {
    setSelectedAge(age)
  }
  const handleClickAllAge = () => {
    setSelectedAge('all')
  }
  const filteredData = useMemo(() => {
    if (selectedAge === 'all') return surveyData
    return selectedAge ? surveyData.filter(person => person.age === selectedAge) : []
  }, [selectedAge, surveyData])

  const ageSummary = useMemo(() => {
    const summary: Record<string, number> = {}

    surveyList.age.forEach(range => {
      summary[range] = 0
    })
    surveyData.forEach(entry => {
      summary[entry.age] ??= 0
      summary[entry.age]++

      return 1
    })
    return summary
  }, [surveyData])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">สรุปข้อมูลของช่วงอายุ</h1>
      <div className="space-y-1 flex flex-row gap-1 flex-wrap">
        <Button
          type={selectedAge === 'all' ? 'primary' : 'default'}
          onClick={() => handleClickAllAge()}
        >
          <span>ทั้งหมด :</span>
          <span className="ml-1">
            <FadeText>{surveyData.length}</FadeText>
          </span>
        </Button>
        {orderBy(Object.entries(ageSummary), ['0'], ['asc']).map(([range, count]) => (
          <Button
            key={range}
            type={selectedAge === range ? 'primary' : 'default'}
            onClick={() => handleClickAge(range)}
          >
            <span>{range}</span> :{' '}
            <span className="ml-1">
              <FadeText>{count}</FadeText>
            </span>
          </Button>
        ))}
      </div>
      <div>
        <h3 className="font-bold text-2xl text-center mt-8">ผลลัพธ์</h3>
        {filteredData.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div>
              <Summary filteredData={filteredData} title="อาชีพ" dataKey="job" />
            </div>
            <div>
              <Summary filteredData={filteredData} title="ความเชื่อ" dataKey="belief" />
            </div>
            <div>
              <Summary filteredData={filteredData} title="การกระทำ" dataKey="action" />
            </div>
            <div>
              <Summary filteredData={filteredData} title="ความคิดเห็น" dataKey="agreedText" />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">ยังไม่เลือกอายุ</p>
        )}
      </div>
    </div>
  )
}

export default SummaryInformation
