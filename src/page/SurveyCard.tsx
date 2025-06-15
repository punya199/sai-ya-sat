import { Button, type ButtonProps } from 'antd'
import { useCallback, useState, type ReactNode } from 'react'

type SurveyData = {
  country: string
  ageRanges: string
  job: string
  belief: string
  action: string
  isAgrreed?: boolean
}
type CustomButtonProps = {
  children: ReactNode
} & ButtonProps

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
    'ไม่มีความเชื่อ',
  ],
  action: [
    'ไหว้ อธิษฐาน ขอพร',
    'บริจาคเงิน',
    'เสี่ยงทายดวงชะตาและการพยากรณ์อนาคต',
    'ถ่ายรูปแล้วกลับมาโพสต์ในโซเชียลมีเดีย',
    'ขอหวย',
  ],
  isAgrreed: [],
}

const SurveyCard = () => {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<SurveyData>({
    country: '',
    ageRanges: '',
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
    setForm({ country: '', ageRanges: '', job: '', belief: '', action: '', isAgrreed: true })
    setStep(7)
    submitForm()
  }
  const handleReset = useCallback(() => {
    setForm({ country: '', ageRanges: '', job: '', belief: '', action: '' })
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
    } catch (error) {
      console.error(error)
    }
  }

  const CustomButton = ({ children, ...props }: CustomButtonProps) => {
    return (
      <Button
        {...props}
        type="primary"
        className=" mb-2 w-full !py-2 !text-wrap !h-auto"
        style={{ fontSize: '20px' }}
      >
        {children}
      </Button>
    )
  }
  const renderStep = useCallback(() => {
    if (step === 0) {
      return (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center ">เลือกประเทศ</h2>
          {surveyList.country.map(c => (
            <CustomButton onClick={() => handleSelect('country', c)}>{c}</CustomButton>
          ))}
        </>
      )
    } else if (step === 1) {
      return (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center">เลือกช่วงอายุ</h2>
          {surveyList.age.map(a => (
            <CustomButton onClick={() => handleSelect('ageRanges', a)}>{a}</CustomButton>
          ))}
        </>
      )
    } else if (step === 2) {
      return (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center">เลือกอาชีพ</h2>
          {surveyList.job.map(j => (
            <CustomButton onClick={() => handleSelect('job', j)}>{j}</CustomButton>
          ))}
        </>
      )
    } else if (step === 3) {
      return (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center">คุณมีความเชื่อต่อสิ่งใด</h2>
          {surveyList.belief.map(b => (
            <CustomButton onClick={() => handleSelect('belief', b)}>{b}</CustomButton>
          ))}
        </>
      )
    } else if (step === 4) {
      return (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center">สิ่งแรกที่คุณจะทำ</h2>
          {surveyList.action.map(b => (
            <CustomButton onClick={() => handleSelect('action', b)}>{b}</CustomButton>
          ))}
        </>
      )
    } else if (step === 5) {
      return (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
            คุณคิดว่าสิ่งที่คุณเลือกมา ได้มาอยู่บนหน้าจอโทรศัพท์มือถือของคุณ ดีหรือไม่?
          </h2>

          <div className="flex flex-col gap-2"></div>

          <CustomButton onClick={() => handleSelect('isAgrreed', 'ดี')}>ดี</CustomButton>

          <CustomButton onClick={() => handleSelect('isAgrreed', 'ไม่ดี')}>ไม่ดี</CustomButton>
        </>
      )
    } else if (step === 6) {
      return (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
            ตรวจสอบข้อมูลของคุณ
          </h2>

          <ul className="space-y-4">
            <li className="flex justify-between gap-2 bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="font-semibold text-gray-700">ประเทศ </span>
              <span className="text-gray-900 text-right">{form.country}</span>
            </li>
            <li className="flex justify-between gap-2 bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="font-semibold text-gray-700">อายุ </span>
              <span className="text-gray-900 text-right">{form.ageRanges}</span>
            </li>
            <li className="flex justify-between gap-2 bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="font-semibold text-gray-700">อาชีพ </span>
              <span className="text-gray-900 text-right">{form.job}</span>
            </li>
            <li className="flex justify-between gap-2 bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="font-semibold text-gray-700">ความเชื่อ </span>
              <span className="text-gray-900 text-right">{form.belief}</span>
            </li>
            <li className="flex justify-between gap-2 bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="font-semibold text-gray-700">การกระทำ</span>
              <span className="text-gray-900 text-right">{form.action}</span>
            </li>
            <li className="flex justify-between gap-2 bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="font-semibold text-gray-700">ความคิดเห็น</span>
              <span className="text-gray-900 text-right">{form.isAgrreed}</span>
            </li>
          </ul>
        </>
      )
    } else if (step === 7) {
      return (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
            ขอบคุณที่ร่วมทำแบบสำรวจ!
          </h2>
          <p className="text-center text-xl">ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว</p>
        </>
      )
    }
  }, [
    form.action,
    form.ageRanges,
    form.belief,
    form.country,
    form.isAgrreed,
    form.job,
    handleSelect,
    step,
  ])

  return (
    <div className="bg-white border border-orange-200 shadow-md rounded-2xl p-6 max-w-md mx-auto mt-5 transition-all duration-300 hover:shadow-lg">
      {renderStep()}
      <div className="flex justify-between mt-6 gap-2">
        {step !== 0 && step !== 7 && (
          <Button
            color="primary"
            className="w-full !text-xl !py-1  !h-auto"
            variant="outlined"
            onClick={() => handleBack()}
          >
            กลับ
          </Button>
        )}
        {step === 6 && (
          <Button
            type="primary"
            onClick={handleSubmit}
            className=" bg-[#C96221] hover:bg-[#a44d18] !text-xl !py-1  !h-auto !w-3/1"
          >
            ส่งข้อมูล
          </Button>
        )}
        {step === 7 && (
          <Button
            type="primary"
            onClick={handleReset}
            className="w-full bg-[#C96221] hover:bg-[#a44d18] !text-xl !py-1  !h-auto"
          >
            ทำแบบสำรวจใหม่
          </Button>
        )}
      </div>
    </div>
  )
}

export default SurveyCard
