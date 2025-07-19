import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Download } from "lucide-react";
import "./App.css";

import template1 from "./assets/1000268395.png";
import template2 from "./assets/1000242928.png";

const templates = {
  template1: {
    image: template1,
    name: "قالب أمازون",
    services: [
      { name: "Amazon USA الأول", x: 220, y: 350, usd: 25 },
      { name: "Amazon Germany الأول", x: 550, y: 280, usd: 30 },
      { name: "Amazon France الأول", x: 850, y: 350, usd: 35 },
      { name: "Amazon USA الثاني", x: 220, y: 520, usd: 50 },
      { name: "Amazon Germany الثاني", x: 550, y: 450, usd: 75 },
      { name: "Amazon France الثاني", x: 850, y: 520, usd: 100 },
      { name: "Amazon UK الأول", x: 550, y: 620, usd: 20 },
      { name: "Amazon USA الثالث", x: 220, y: 690, usd: 15 },
      { name: "Amazon UK الثاني", x: 550, y: 780, usd: 40 },
      { name: "Amazon France الثالث", x: 850, y: 720, usd: 60 },
      { name: "Amazon USA الرابع", x: 220, y: 860, usd: 10 },
      { name: "Amazon UK الثالث", x: 550, y: 950, usd: 45 },
      { name: "Amazon Italy", x: 850, y: 880, usd: 55 },
    ],
  },
  template2: {
    image: template2,
    name: "قالب الخدمات الرقمية",
    services: [
      { name: "Apple USA", x: 250, y: 350, usd: 50 },
      { name: "USDT", x: 580, y: 300, usd: 1 },
      { name: "Payeer", x: 880, y: 360, usd: 10 },
      { name: "PayPal Send", x: 220, y: 560, usd: 25 },
      { name: "Steam", x: 570, y: 480, usd: 20 },
      { name: "PayPal Link", x: 880, y: 550, usd: 30 },
      { name: "Walmart", x: 560, y: 650, usd: 100 },
      { name: "MasterCard USA", x: 250, y: 725, usd: 200 },
      { name: "Target", x: 880, y: 735, usd: 75 },
      { name: "PlayStation", x: 570, y: 830, usd: 60 },
      { name: "Visa Tremendous", x: 240, y: 925, usd: 500 },
      { name: "Razer Gold", x: 570, y: 1000, usd: 25 },
      { name: "Visa لا يدعم", x: 900, y: 940, usd: 0 },
    ],
  },
};

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [services, setServices] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(15000);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (selectedTemplate) {
      setServices(templates[selectedTemplate].services.map((s) => ({ ...s })));
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (selectedTemplate) drawCanvas();
    // eslint-disable-next-line
  }, [selectedTemplate, services, exchangeRate]);

  const updateServiceUsd = (index, value) => {
    const newServices = [...services];
    newServices[index].usd = value === "" ? "" : Number(value);
    setServices(newServices);
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedTemplate) return;
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      services.forEach((service) => {
        if (service.usd && !isNaN(Number(service.usd))) {
          const syp = Math.round(Number(service.usd) * exchangeRate);
          ctx.font = "bold 28px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.strokeStyle = "white";
          ctx.lineWidth = 5;
          // نزّل النص للأسفل (y+30) وحركه لليمين (x+30)
          const drawX = service.x + 30;
          const drawY = service.y + 30;
          ctx.strokeText(`${syp} ل.س`, drawX, drawY);
          ctx.fillStyle = "#111";
          ctx.fillText(`${syp} ل.س`, drawX, drawY);
        }
      });
    };
    img.src = templates[selectedTemplate].image;
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `price-overlay-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          تطبيق إضافة الأسعار على الصور
        </h1>
        {!selectedTemplate ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedTemplate("template1")}
            >
              <CardHeader>
                <CardTitle className="text-center">قالب أمازون</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={template1}
                  alt="Template 1"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedTemplate("template2")}
            >
              <CardHeader>
                <CardTitle className="text-center">
                  قالب الخدمات الرقمية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={template2}
                  alt="Template 2"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Canvas Area */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">معاينة الصورة</h2>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedTemplate(null)}
                    variant="outline"
                  >
                    تغيير القالب
                  </Button>
                  <Button
                    onClick={downloadImage}
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    تحميل الصورة
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto"
                  style={{ maxHeight: "600px" }}
                />
              </div>
            </div>
            {/* Controls Area */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="mb-6 flex flex-col gap-4 items-center justify-center">
                <label className="font-medium text-lg">
                  سعر الصرف (دولار → ليرة):
                </label>
                <Input
                  type="number"
                  min="0"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(Number(e.target.value))}
                  className="w-40 text-lg"
                  placeholder="مثال: 15000"
                />
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {services.map((service, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">
                        {service.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="سعر الخدمة بالدولار"
                        value={service.usd}
                        type="number"
                        min="0"
                        onChange={(e) =>
                          updateServiceUsd(index, e.target.value)
                        }
                        className="text-sm w-24"
                      />
                      <span className="text-xs">$</span>
                      <span className="text-xs text-green-700 font-bold">
                        ={" "}
                        {service.usd && !isNaN(Number(service.usd))
                          ? Math.round(Number(service.usd) * exchangeRate)
                          : 0}{" "}
                        ل.س
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
