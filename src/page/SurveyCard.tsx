import { useState } from "react";
import { Button } from "antd";

type SurveyData = {
  country: string;
  age: string;
  job: string;
};

const surveyList = {
  country: ["ประเทศไทย", "ประเทศจีน", "ประเทศญี่ปุ่น"],
  age: [
    "10 - 20",
    "21 - 30",
    "31 - 40",
    "41 - 50",
    "51 - 60",
    "60 - 70",
    "71 - 80",
    "81 - 90",
    "91 - 100",
  ],
  job: [
    "นักเรียน",
    "นักศึกษา",
    "พนักงานบริษัท",
    "เจ้าของธุรกิจ",
    "เกษตรกร",
    "แม่บ้าน",
    "ผู้เกษียณอายุ",
    "อื่นๆ",
  ],
};

const SurveyCard = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<SurveyData>({
    country: "",
    age: "",
    job: "",
  });

  const handleSelect = (field: keyof SurveyData, value: string) => {
    setForm({ ...form, [field]: value });
    setStep((prev) => prev + 1);
  };

  const handleSubmit = () => {
    console.log("ส่งข้อมูลแล้ว:", form);
    alert("ส่งแบบสำรวจเรียบร้อยแล้ว!");
    // เพิ่ม logic เช่น ส่งไป backend ได้ที่นี่
    setForm({ country: "", age: "", job: "" });
    setStep(0);
  };

  const renderStep = () => {
    if (step === 0) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">เลือกประเทศ</h2>
          {surveyList.country.map((c) => (
            <Button
              key={c}
              type="primary"
              size="large"
              className="mb-2 w-full"
              onClick={() => handleSelect("country", c)}
            >
              {c}
            </Button>
          ))}
        </>
      );
    } else if (step === 1) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">เลือกช่วงอายุ</h2>
          {surveyList.age.map((a) => (
            <Button
              key={a}
              type="default"
              size="large"
              className="mb-2 w-full"
              onClick={() => handleSelect("age", a)}
            >
              {a}
            </Button>
          ))}
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">เลือกอาชีพ</h2>
          {surveyList.job.map((j) => (
            <Button
              key={j}
              type="dashed"
              size="large"
              className="mb-2 w-full"
              onClick={() => handleSelect("job", j)}
            >
              {j}
            </Button>
          ))}
        </>
      );
    } else if (step === 3) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center text-green-700">ตรวจสอบข้อมูล</h2>
          <ul className="mb-4 text-center">
            <li>ประเทศ: {form.country}</li>
            <li>อายุ: {form.age}</li>
            <li>อาชีพ: {form.job}</li>
          </ul>
          <Button type="primary" onClick={handleSubmit} className="w-full">
            ส่งข้อมูล
          </Button>
        </>
      );
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto mt-10">
      {renderStep()}
    </div>
  );
};

export default SurveyCard;
