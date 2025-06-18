import SurveyCard from './SurveyCard'

const PageSurvey = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header ตรึงอยู่ด้านบน */}
      <div className="bg-[#FDE6C3] text-[#913903] py-6 text-center text-4xl font-bold">
        แบบสำรวจความเชื่อ
      </div>

      {/* ส่วนเนื้อหาที่ scroll ได้ */}
      <div className="flex-1 px-3 overflow-y-auto bg-gray-50">
        <SurveyCard />
      </div>
    </div>
  )
}

export default PageSurvey
