import { Button } from 'antd'
import { useCallback, useState } from 'react'

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

  const handleSelect = useCallback(
    (field: keyof SurveyData, value: string) => {
      setForm({ ...form, [field]: value })
      setStep(prev => prev + 1)
    },
    [form]
  )
  const handleBack = useCallback(() => {
    setStep(prev => prev - 1)
  }, [])
  const handleSubmit = () => {
    alert('ส่งแบบสำรวจเรียบร้อยแล้ว!')
    // เพิ่ม logic เช่น ส่งไป backend ได้ที่นี่
    setForm({ country: '', age: '', job: '', belief: '', action: '' })
    setStep(6)
    submitForm()
  }
  const handleReset = useCallback(() => {
    setForm({ country: '', age: '', job: '', belief: '', action: '' })
    setStep(0)
  }, [])

  const submitForm = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/survey/submit`, {
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
  const renderStep = useCallback(() => {
    if (step === 0) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center ">เลือกประเทศ</h2>
          {surveyList.country.map(c => (
            <Button
              key={c}
              type="primary"
              size="large"
              className=" mb-2 w-full text-base font-medium"
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
              className="mb-2 w-full text-base font-medium"
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
              className="mb-2 w-full text-base font-medium"
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
              className="mb-2 w-full text-base font-medium"
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
              className="mb-2 w-full text-base font-medium"
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
          <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
            ตรวจสอบข้อมูลของคุณ
          </h2>

          <ul className="space-y-4">
            <li className="flex justify-between bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="font-semibold text-gray-700">ประเทศ </span>
              <span className="text-gray-900">{form.country}</span>
            </li>
            <li className="flex justify-between bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="font-semibold text-gray-700">อายุ </span>
              <span className="text-gray-900">{form.age}</span>
            </li>
            <li className="flex justify-between bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="font-semibold text-gray-700">อาชีพ </span>
              <span className="text-gray-900">{form.job}</span>
            </li>
            <li className="flex justify-between bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="font-semibold text-gray-700">ความเชื่อ </span>
              <span className="text-gray-900">{form.belief}</span>
            </li>
            <li className="flex justify-between bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="font-semibold text-gray-700">การกระทำ</span>
              <span className="text-gray-900">{form.action}</span>
            </li>
          </ul>
        </>
      )
    } else if (step === 6) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center text-green-700">
            ขอบคุณที่ร่วมทำแบบสำรวจ!
          </h2>
          <p className="text-center">ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว</p>
        </>
      )
    }
  }, [form.action, form.age, form.belief, form.country, form.job, handleSelect, step])

  return (
    <div className="bg-white border border-orange-200 shadow-md rounded-2xl p-6 max-w-md mx-auto mt-10 transition-all">
      {renderStep()}
      <div className="flex justify-between mt-6 gap-2">
        {step !== 0 && step !== 6 && (
          <Button
            color="primary"
            className="w-full"
            variant="outlined"
            onClick={() => handleBack()}
          >
            กลับ
          </Button>
        )}
        {step === 5 && (
          <Button
            type="primary"
            onClick={handleSubmit}
            className="w-full bg-[#C96221] hover:bg-[#a44d18]"
          >
            ส่งข้อมูล
          </Button>
        )}
        {step === 6 && (
          <Button
            type="primary"
            onClick={handleReset}
            className="w-full bg-[#C96221] hover:bg-[#a44d18]"
          >
            ทำแบบสำรวจใหม่
          </Button>
        )}
      </div>
    </div>
  )
}

export default SurveyCard
