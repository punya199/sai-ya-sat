import { Button } from 'antd'
import { useState } from 'react'

type SurveyData = {
  country: string
  age: string
  job: string
  belief: string
  action: string
}

const surveyList = {
  country: ['ประเทศไทย'],
  age: ['10 - 20', '21 - 30', '31 - 40', '41 - 50', '51 - 60', '60 - 70', '71 - 80'],
  job: [
    'รับจ้าง',
    'นักศึกษา',
    'พนักงานบริษัท',
    'เจ้าของธุรกิจ/ค้าขาย',
    'เกษตรกร',
    'รับราชการ',
    'ผู้เกษียณอายุ',
    'อื่นๆ',
  ],
  belief: [
    'วัด',
    'คริสตจักร',
    'พระพุธรูป',
    'สถานที่ศักดิ์สิทธิ์',
    'สิ่งศักดิ์สิทธิ์',
    'พระ(นักบวช)',
  ],
  action: [
    'ไหว้ อธิษฐาน ขอพร',
    'บริจาคเงิน',
    'เสี่ยงทายดวงชะตาและการพยากรณ์อนาคต',
    'ไปถ่ายรูปแล้วกลับมาโพสต์ในโซเชียลมีเดีย',
    'ขอหวย',
  ],
}

const SurveyCard = () => {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<SurveyData>({
    country: '',
    age: '',
    job: '',
    belief: '',
    action: '',
  })

  const handleSelect = (field: keyof SurveyData, value: string) => {
    setForm({ ...form, [field]: value })
    setStep(prev => prev + 1)
  }
  const handleBack = () => {
    setStep(prev => prev - 1)
  }
  const handleSubmit = () => {
    alert('ส่งแบบสำรวจเรียบร้อยแล้ว!')
    // เพิ่ม logic เช่น ส่งไป backend ได้ที่นี่
    setForm({ country: '', age: '', job: '', belief: '', action: '' })
    setStep(0)
    submitForm()
  }
  const submitForm = async () => {
    try {
      const response = await fetch('http://localhost:3000/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const data = await response.json()
      console.log('Response from server:', data)
      alert('ส่งข้อมูลเรียบร้อยแล้ว')
    } catch (error) {
      console.error(error)
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล')
    }
  }
  const renderStep = () => {
    if (step === 0) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">เลือกประเทศ</h2>
          {surveyList.country.map(c => (
            <Button
              key={c}
              type="primary"
              size="large"
              className="bg-pink-500 text-white hover:bg-pink-600 border-none w-full"
              onClick={() => handleSelect('country', c)}
            >
              {c}
            </Button>
          ))}
        </>
      )
    } else if (step === 1) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">เลือกช่วงอายุ</h2>
          {surveyList.age.map(a => (
            <Button
              key={a}
              type="primary"
              size="large"
              className="mb-2 w-full"
              onClick={() => handleSelect('age', a)}
            >
              {a}
            </Button>
          ))}
        </>
      )
    } else if (step === 2) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">เลือกอาชีพ</h2>
          {surveyList.job.map(j => (
            <Button
              key={j}
              type="primary"
              size="large"
              className="mb-2 w-full"
              onClick={() => handleSelect('job', j)}
            >
              {j}
            </Button>
          ))}
        </>
      )
    } else if (step === 3) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">คุณมีความเชื่อต่อสิ่งใด</h2>
          {surveyList.belief.map(b => (
            <Button
              key={b}
              type="primary"
              size="large"
              className="mb-2 w-full"
              onClick={() => handleSelect('belief', b)}
            >
              {b}
            </Button>
          ))}
        </>
      )
    } else if (step === 4) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">สิ่งแรกที่คุณจะทำ</h2>
          {surveyList.action.map(b => (
            <Button
              key={b}
              type="primary"
              size="large"
              className="mb-2 w-full"
              onClick={() => handleSelect('action', b)}
            >
              {b}
            </Button>
          ))}
        </>
      )
    } else if (step === 5) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center text-green-700">ตรวจสอบข้อมูล</h2>
          <ul className="mb-4 text-center">
            <li>ประเทศ: {form.country}</li>
            <li>อายุ: {form.age}</li>
            <li>อาชีพ: {form.job}</li>
            <li>ความเชื่อ: {form.belief}</li>
            <li>การกระทำ: {form.action}</li>
          </ul>
        </>
      )
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto mt-10">
      {renderStep()}
      <div className="flex justify-between mt-6 gap-2">
        {step !== 0 && (
          <Button color="primary" variant="outlined" onClick={() => handleBack()}>
            Back
          </Button>
        )}
        {step === 5 && (
          <Button type="primary" onClick={handleSubmit} className="w-full">
            ส่งข้อมูล
          </Button>
        )}
      </div>
    </div>
  )
}

export default SurveyCard
