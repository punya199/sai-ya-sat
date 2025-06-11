import SurveyCard from './SurveyCard'

const PageSurvey = () => {
  // const navigate = useNavigate()
  return (
    <div>
      <div className=" bg-amber-200 text-amber-950 p-10 text-center text-2xl font-bold h-12 flex items-center justify-center">
        แบบสำรวจความเชื่อ
      </div>
      <SurveyCard></SurveyCard>
      {/* <Button block onClick={() => navigate('/')}>ย้อนกลับ</Button> */}
    </div>
  )
}

export default PageSurvey
