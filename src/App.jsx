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
    date: { text: "21-7-2025", x: 850, y: 220 },
    services: [
      // Column 1: USA
      { name: "USA 5", xName: 140, yName: 450, fontSizeName: 40, colorName: "#000", xValue: 140, yValue: 490, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "USA 10-15-25", xName: 380, yName: 450, fontSizeName: 40, colorName: "#000", xValue: 380, yValue: 490, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "USA 20-..-100", xName: 650, yName: 450, fontSizeName: 40, colorName: "#000", xValue: 650, yValue: 490, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "USA مكسر", xName: 900, yName: 450, fontSizeName: 40, colorName: "#000", xValue: 900, yValue: 490, fontSizeValue: 54, colorValue: "#000", usd: 0 },

      // Column 2: Germany & UK
      { name: "Germany 5", xName: 140, yName: 710, fontSizeName: 40, colorName: "#000", xValue: 140, yValue: 750, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Germany 10-15-25", xName: 380, yName: 700, fontSizeName: 40, colorName: "#000", xValue: 380, yValue: 740, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Germany 30-40-50", xName: 650, yName: 700, fontSizeName: 40, colorName: "#000", xValue: 650, yValue: 740, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "UK 5 15 20", xName: 140, yName: 1200, fontSizeName: 40, colorName: "#000", xValue: 140, yValue: 1240, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "UK 25 - 30 -40", xName: 380, yName: 1200, fontSizeName: 40, colorName: "#000", xValue: 380, yValue: 1240, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "UK 50 - 100", xName: 650, yName: 1200, fontSizeName: 40, colorName: "#000", xValue: 650, yValue: 1240, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "UK", xName: 900, yName: 1200, fontSizeName: 40, colorName: "#000", xValue: 900, yValue: 1240, fontSizeValue: 54, colorValue: "#000", usd: 0 },

      // Column 3: France & Italy
      { name: "Italy 5 - 40", xName: 650, yName: 960, fontSizeName: 40, colorName: "#000", xValue: 650, yValue: 1000, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "France 5", xName: 900, yName: 720, fontSizeName: 40, colorName: "#000", xValue: 900, yValue: 760, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "France 20", xName: 390, yName: 960, fontSizeName: 40, colorName: "#000", xValue: 390, yValue: 1000, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "France 10-15-25-30-40-50", xName: 140, yName: 960, fontSizeName: 40, colorName: "#000", xValue: 140, yValue: 1000, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Italy 10-15-25-30-50", xName: 900, yName: 960, fontSizeName: 40, colorName: "#000", xValue: 900, yValue: 1000, fontSizeValue: 54, colorValue: "#000", usd: 0 }
    ],
  },
  template2: {
    image: template2,
    name: "قالب الخدمات الرقمية",
    date: { text: "21-7-2025", x: 850, y: 220 },
    services: [
      // نفس أماكن قالب أمازون، مع أسماء الخدمات الرقمية
      { name: "USDT", xName: 105, yName: 430, fontSizeName: 40, colorName: "#000", xValue: 105, yValue: 470, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Payeer", xName: 310, yName: 430, fontSizeName: 40, colorName: "#000", xValue: 310, yValue: 470, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "iTunes USA 1", xName: 525, yName: 440, fontSizeName: 40, colorName: "#000", xValue: 525, yValue: 480, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "iTunes USA 2", xName: 730, yName: 440, fontSizeName: 40, colorName: "#000", xValue: 730, yValue: 480, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "iTunes USA 3", xName: 935, yName: 470, fontSizeName: 40, colorName: "#000", xValue: 935, yValue: 510, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Rezer Gold", xName: 105, yName: 680, fontSizeName: 40, colorName: "#000", xValue: 105, yValue: 720, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "walmart 1", xName: 310, yName: 690, fontSizeName: 40, colorName: "#000", xValue: 310, yValue: 730, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "walmart 2", xName: 525, yName: 690, fontSizeName: 40, colorName: "#000", xValue: 525, yValue: 730, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "walmart 3", xName: 730, yName: 710, fontSizeName: 40, colorName: "#000", xValue: 730, yValue: 750, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Target 1", xName: 935, yName: 700, fontSizeName: 40, colorName: "#000", xValue: 935, yValue: 740, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Target 2", xName: 105, yName: 950, fontSizeName: 40, colorName: "#000", xValue: 105, yValue: 990, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Steam", xName: 310, yName: 940, fontSizeName: 40, colorName: "#000", xValue: 310, yValue: 980, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Paypal Send", xName: 525, yName: 940, fontSizeName: 40, colorName: "#000", xValue: 525, yValue: 980, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Paypal Link", xName: 730, yName: 940, fontSizeName: 40, colorName: "#000", xValue: 730, yValue: 980, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "playstation", xName: 935, yName: 940, fontSizeName: 40, colorName: "#000", xValue: 935, yValue: 980, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "master", xName: 105, yName: 1180, fontSizeName: 40, colorName: "#000", xValue: 105, yValue: 1220, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Visa", xName: 310, yName: 1180, fontSizeName: 40, colorName: "#000", xValue: 310, yValue: 1220, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Uber 1", xName: 525, yName: 1200, fontSizeName: 40, colorName: "#000", xValue: 525, yValue: 1240, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "Uber 2", xName: 730, yName: 1200, fontSizeName: 40, colorName: "#000", xValue: 730, yValue: 1240, fontSizeValue: 54, colorValue: "#000", usd: 0 },
      { name: "starbucks", xName: 935, yName: 1180, fontSizeName: 40, colorName: "#000", xValue: 935, yValue: 1220, fontSizeValue: 54, colorValue: "#000", usd: 0 },
    ],
  },
};

function App() {
  // التخزين المحلي: استرجاع القيم عند بدء التطبيق
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return localStorage.getItem("selectedTemplate") || null;
  });
  // مصفوفة أسماء الفئات لكل قالب
  const [categoryNames, setCategoryNames] = useState(() => {
    if (!selectedTemplate) return [];
    const stored = localStorage.getItem(`categoryNames_${selectedTemplate}`);
    if (stored) return JSON.parse(stored);
    return templates[selectedTemplate].services.map((s) => s.name);
  });
  // مصفوفة أسعار الفئات لكل قالب
  const [categoryPrices, setCategoryPrices] = useState(() => {
    if (!selectedTemplate) return [];
    const stored = localStorage.getItem(`categoryPrices_${selectedTemplate}`);
    if (stored) return JSON.parse(stored);
    return templates[selectedTemplate].services.map((s) => s.usd);
  });
  const [exchangeRate, setExchangeRate] = useState(() => {
    const stored = localStorage.getItem("exchangeRate");
    return stored ? Number(stored) : 15000;
  });
  // تاريخ القالب
  const [templateDate, setTemplateDate] = useState(() => {
    const stored = localStorage.getItem("templateDate");
    return stored
      ? JSON.parse(stored)
      : {
          text: "",
          x: 0,
          y: 0,
          color: "#d90429",
          fontSize: 50,
        };
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    if (selectedTemplate) {
      // تحميل أسماء الفئات الخاصة بالقالب
      const storedNames = localStorage.getItem(`categoryNames_${selectedTemplate}`);
      setCategoryNames(
        storedNames
          ? JSON.parse(storedNames)
          : templates[selectedTemplate].services.map((s) => s.name)
      );
      // تحميل أسعار الفئات الخاصة بالقالب
      const storedPrices = localStorage.getItem(`categoryPrices_${selectedTemplate}`);
      setCategoryPrices(
        storedPrices
          ? JSON.parse(storedPrices)
          : templates[selectedTemplate].services.map((s) => s.usd)
      );
      // تحميل التاريخ
      const storedDate = localStorage.getItem(`templateDate_${selectedTemplate}`);
      if (storedDate) {
        setTemplateDate(JSON.parse(storedDate));
      } else {
        const date = templates[selectedTemplate].date || {
          text: "",
          x: 0,
          y: 0,
        };
        setTemplateDate({
          text: date.text || "",
          x: typeof date.x === "number" ? date.x : 0,
          y: typeof date.y === "number" ? date.y : 0,
          color: date.color || "#d90429",
          fontSize: date.fontSize || 50,
        });
      }
    }
    localStorage.setItem("selectedTemplate", selectedTemplate || "");
  }, [selectedTemplate]);

  // حفظ القيم في التخزين المحلي عند أي تغيير
  useEffect(() => {
    if (selectedTemplate) {
      localStorage.setItem(
        `categoryNames_${selectedTemplate}`,
        JSON.stringify(categoryNames)
      );
      localStorage.setItem(
        `categoryPrices_${selectedTemplate}`,
        JSON.stringify(categoryPrices)
      );
    }
  }, [categoryNames, categoryPrices, selectedTemplate]);

  useEffect(() => {
    localStorage.setItem("exchangeRate", exchangeRate);
  }, [exchangeRate]);

  useEffect(() => {
    if (selectedTemplate) {
      localStorage.setItem(
        `templateDate_${selectedTemplate}`,
        JSON.stringify(templateDate)
      );
    }
    localStorage.setItem("templateDate", JSON.stringify(templateDate));
  }, [templateDate, selectedTemplate]);

  useEffect(() => {
    if (selectedTemplate) drawCanvas();
    // eslint-disable-next-line
  }, [selectedTemplate, categoryNames, categoryPrices, exchangeRate]);

  // إعادة الرسم عند تغيير التاريخ
  useEffect(() => {
    if (selectedTemplate) drawCanvas();
    // eslint-disable-next-line
  }, [templateDate]);
  // تم حذف دوال تعديل الأسعار القديمة لأنها لم تعد مستخدمة

  const drawCanvas = () => {
    console.log("drawCanvas called", {
      selectedTemplate,
      categoryNames,
      categoryPrices,
      services: templates[selectedTemplate]?.services,
      canvas: canvasRef.current
    });
    const canvas = canvasRef.current;
    if (!canvas || !selectedTemplate) return;
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (selectedTemplate === "template1") {
        const templateData = templates[selectedTemplate];
        // استخدم التاريخ من state بدلاً من الثابت
        if (templateDate.text) {
          ctx.font = `bold ${templateDate.fontSize}px Arial`;
          ctx.fillStyle = templateDate.color;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(templateDate.text, templateDate.x, templateDate.y);
        }

        // رسم الخدمات مع تحكم كامل لكل خاصية (مثل القالب الرقمي)
        templates[selectedTemplate].services.forEach((service, idx) => {
          const name = categoryNames[idx] || "";
          const usd = categoryPrices[idx];
          // رسم الاسم
          ctx.font = `bold ${service.fontSizeName || 40}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.strokeStyle = "white";
          ctx.lineWidth = 4;
          ctx.strokeText(name, service.xName, service.yName);
          ctx.fillStyle = service.colorName || "#000";
          ctx.fillText(name, service.xName, service.yName);
          // رسم السعر إذا كان موجوداً
          if (usd && !isNaN(Number(usd))) {
            const syp = Math.round(Number(usd) * exchangeRate);
            ctx.font = `bold ${service.fontSizeValue || 54}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.strokeText(`${syp} `, service.xValue, service.yValue);
            ctx.fillStyle = service.colorValue || "#000";
            ctx.fillText(`${syp} `, service.xValue, service.yValue);
          }
        });
      } else {
        // رسم التاريخ في القالب الثاني
        if (templateDate.text) {
          ctx.font = `bold ${templateDate.fontSize}px Arial`;
          ctx.fillStyle = templateDate.color;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(templateDate.text, templateDate.x, templateDate.y);
        }

        // رسم الخدمات مع تحكم كامل لكل خاصية
        templates[selectedTemplate].services.forEach((service, idx) => {
          const name = categoryNames[idx] || "";
          const usd = categoryPrices[idx];
          // رسم الاسم
          ctx.font = `bold ${service.fontSizeName || 40}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.strokeStyle = "white";
          ctx.lineWidth = 4;
          ctx.strokeText(name, service.xName, service.yName);
          ctx.fillStyle = service.colorName || "#000";
          ctx.fillText(name, service.xName, service.yName);
          // رسم السعر إذا كان موجوداً
          if (usd && !isNaN(Number(usd))) {
            const syp = Math.round(Number(usd) * exchangeRate);
            ctx.font = `bold ${service.fontSizeValue || 54}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.strokeText(`${syp} `, service.xValue, service.yValue);
            ctx.fillStyle = service.colorValue || "#000";
            ctx.fillText(`${syp} `, service.xValue, service.yValue);
          }
        });
      }
    };
    img.src = templates[selectedTemplate].image;
// ...
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
              {/* واجهة تعديل التاريخ */}
              {selectedTemplate && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6 flex flex-col gap-3 items-center w-full">
                  <h3 className="font-bold text-lg text-yellow-800 mb-2 text-center">
                    تعديل التاريخ الظاهر على القالب
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium mb-1">
                        نص التاريخ:
                      </label>
                      <Input
                        value={templateDate.text}
                        onChange={(e) =>
                          setTemplateDate((d) => ({
                            ...d,
                            text: e.target.value,
                          }))
                        }
                        className="w-full text-sm"
                        placeholder="مثال: 21-7-2025"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium mb-1">
                        لون الخط:
                      </label>
                      <input
                        type="color"
                        value={templateDate.color}
                        onChange={(e) =>
                          setTemplateDate((d) => ({
                            ...d,
                            color: e.target.value,
                          }))
                        }
                        className="w-10 h-10 p-0 border-none bg-transparent"
                        style={{ minWidth: 36 }}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium mb-1">
                        حجم الخط:
                      </label>
                      <Input
                        type="number"
                        min={10}
                        max={200}
                        value={templateDate.fontSize}
                        onChange={(e) =>
                          setTemplateDate((d) => ({
                            ...d,
                            fontSize: Number(e.target.value),
                          }))
                        }
                        className="w-full text-sm"
                        placeholder="مثال: 50"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium mb-1">
                        الموقع X:
                      </label>
                      <Input
                        type="number"
                        value={templateDate.x}
                        onChange={(e) =>
                          setTemplateDate((d) => ({
                            ...d,
                            x: Number(e.target.value),
                          }))
                        }
                        className="w-full text-sm"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium mb-1">
                        الموقع Y:
                      </label>
                      <Input
                        type="number"
                        value={templateDate.y}
                        onChange={(e) =>
                          setTemplateDate((d) => ({
                            ...d,
                            y: Number(e.target.value),
                          }))
                        }
                        className="w-full text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
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
              <div className="space-y-4 max-h-96 overflow-y-auto p-2">
                {/* قسم خصائص الفئة */}
                <div className="flex justify-end mb-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition"
                    onClick={() => {
                      const newNames = [...categoryNames, "فئة جديدة"];
                      const newPrices = [...categoryPrices, 0];
                      const newService = {
                        name: "فئة جديدة",
                        x: 100,
                        y: 100,
                        usd: 0,
                        fontSize: 54,
                        colorLabel: "#000",
                        colorValue: "#000"
                      };
                      templates[selectedTemplate].services.push(newService);
                      setCategoryNames(newNames);
                      setCategoryPrices(newPrices);
                    }}
                  >
                    + إضافة فئة جديدة
                  </button>
                </div>
                <h4 className="font-bold text-md mb-2 text-blue-700">خصائص الفئة (اسم، موقع، لون، حجم)</h4>
                {templates[selectedTemplate]?.services.map((service, index) => (
                  <Card key={index} className="p-3 mb-2">
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                      {/* اسم الفئة */}
                      <Input
                        value={categoryNames[index]}
                        onChange={(e) => {
                          const newNames = [...categoryNames];
                          newNames[index] = e.target.value;
                          setCategoryNames(newNames);
                        }}
                        className="font-medium text-xs w-32"
                        placeholder="اسم الفئة"
                      />
                      <button
                        title="حذف الفئة"
                        className="text-red-600 hover:text-red-800 text-lg px-1"
                        onClick={() => {
                          const newNames = categoryNames.filter((_, i) => i !== index);
                          const newPrices = categoryPrices.filter((_, i) => i !== index);
                          const newServices = templates[selectedTemplate].services.filter((_, i) => i !== index);
                          templates[selectedTemplate].services = newServices;
                          setCategoryNames(newNames);
                          setCategoryPrices(newPrices);
                        }}
                      >
                        🗑️
                      </button>
                      <span className="text-xs text-blue-700 font-bold">خصائص الاسم:</span>
                      <span className="text-xs text-gray-500">X:</span>
                      <Input
                        type="number"
                        value={service.xName || 100}
                        onChange={(e) => {
                          templates[selectedTemplate].services[index].xName = Number(e.target.value);
                          setCategoryNames([...categoryNames]);
                        }}
                        className="w-14 h-7 text-xs"
                      />
                      <span className="text-xs text-gray-500">Y:</span>
                      <Input
                        type="number"
                        value={service.yName || 100}
                        onChange={(e) => {
                          templates[selectedTemplate].services[index].yName = Number(e.target.value);
                          setCategoryNames([...categoryNames]);
                        }}
                        className="w-14 h-7 text-xs"
                      />
                      <span className="text-xs text-gray-500">حجم:</span>
                      <Input
                        type="number"
                        min={10}
                        max={200}
                        value={service.fontSizeName || 40}
                        onChange={(e) => {
                          templates[selectedTemplate].services[index].fontSizeName = Number(e.target.value);
                          setCategoryNames([...categoryNames]);
                        }}
                        className="w-12 text-xs"
                        placeholder="حجم اسم"
                        style={{ direction: "ltr" }}
                      />
                      <input
                        type="color"
                        value={service.colorName || "#000"}
                        onChange={(e) => {
                          templates[selectedTemplate].services[index].colorName = e.target.value;
                          setCategoryNames([...categoryNames]);
                        }}
                        title="لون اسم الفئة"
                        className="w-7 h-7 p-0 border-0 bg-transparent"
                      />
                      <span className="text-xs text-green-700 font-bold ml-4">خصائص السعر:</span>
                      <span className="text-xs text-gray-500">X:</span>
                      <Input
                        type="number"
                        value={service.xValue || 100}
                        onChange={(e) => {
                          templates[selectedTemplate].services[index].xValue = Number(e.target.value);
                          setCategoryNames([...categoryNames]);
                        }}
                        className="w-14 h-7 text-xs"
                      />
                      <span className="text-xs text-gray-500">Y:</span>
                      <Input
                        type="number"
                        value={service.yValue || 100}
                        onChange={(e) => {
                          templates[selectedTemplate].services[index].yValue = Number(e.target.value);
                          setCategoryNames([...categoryNames]);
                        }}
                        className="w-14 text-xs"
                      />
                      <span className="text-xs text-gray-500">حجم:</span>
                      <Input
                        type="number"
                        min={10}
                        max={200}
                        value={service.fontSizeValue || 54}
                        onChange={(e) => {
                          templates[selectedTemplate].services[index].fontSizeValue = Number(e.target.value);
                          setCategoryNames([...categoryNames]);
                          if (templates[selectedTemplate] && templates[selectedTemplate].services[index]) {
                            templates[selectedTemplate].services[index].colorLabel = e.target.value;
                            setCategoryNames([...categoryNames]);
                          }
                        }}
                        title="لون اسم الفئة"
                        className="w-7 h-7 p-0 border-0 bg-transparent"
                      />
                    </div>
                  </Card>
                ))}
                {/* قسم الأسعار */}
                <h4 className="font-bold text-md mb-2 text-green-700 mt-4">القيم (السعر بالدولار فقط)</h4>
                {categoryPrices.map((price, index) => (
                  <Card key={index} className="p-2 mb-2 flex flex-row items-center gap-2">
                    <span className="font-medium text-xs w-32 truncate">{categoryNames[index]}</span>
                    <Input
                      placeholder="سعر الفئة بالدولار"
                      value={categoryPrices[index]}
                      type="number"
                      min="0"
                      onChange={(e) => {
                        const newPrices = [...categoryPrices];
                        newPrices[index] = e.target.value === "" ? "" : Number(e.target.value);
                        setCategoryPrices(newPrices);
                      }}
                      className="text-sm w-24"
                    />
                    <span className="text-xs text-gray-500">X سعر:</span>
                    <Input
                      type="number"
                      value={templates[selectedTemplate]?.services[index]?.xValue || 100}
                      onChange={(e) => {
                        if (templates[selectedTemplate] && templates[selectedTemplate].services[index]) {
                          templates[selectedTemplate].services[index].xValue = Number(e.target.value);
                          setCategoryNames([...categoryNames]); // trigger re-render
                        }
                      }}
                      className="w-14 text-xs border rounded px-1"
                      title="موقع X للسعر"
                      style={{ direction: "ltr" }}
                    />
                    <span className="text-xs text-gray-500">Y سعر:</span>
                    <Input
                      type="number"
                      value={templates[selectedTemplate]?.services[index]?.yValue || 100}
                      onChange={(e) => {
                        if (templates[selectedTemplate] && templates[selectedTemplate].services[index]) {
                          templates[selectedTemplate].services[index].yValue = Number(e.target.value);
                          setCategoryNames([...categoryNames]); // trigger re-render
                        }
                      }}
                      className="w-14 text-xs border rounded px-1"
                      title="موقع Y للسعر"
                      style={{ direction: "ltr" }}
                    />
                    <Input
                      type="number"
                      min={10}
                      max={200}
                      value={templates[selectedTemplate]?.services[index]?.fontSizeValue || 54}
                      onChange={(e) => {
                        if (templates[selectedTemplate] && templates[selectedTemplate].services[index]) {
                          templates[selectedTemplate].services[index].fontSizeValue = Number(e.target.value);
                          setCategoryNames([...categoryNames]); // trigger re-render
                        }
                      }}
                      className="w-14 text-xs border rounded px-1"
                      title="حجم خط السعر"
                      style={{ direction: "ltr" }}
                    />
                    <input
                      type="color"
                      value={templates[selectedTemplate]?.services[index]?.colorValue || "#000"}
                      onChange={(e) => {
                        if (templates[selectedTemplate] && templates[selectedTemplate].services[index]) {
                          templates[selectedTemplate].services[index].colorValue = e.target.value;
                          setCategoryNames([...categoryNames]); // trigger re-render
                        }
                      }}
                      className="w-10 h-10 p-0 border-none bg-transparent"
                      title="لون السعر"
                    />
                    <button
                      title="حذف السعر فقط"
                      className="text-red-600 hover:text-red-800 text-lg px-1"
                      onClick={() => {
                        const newPrices = [...categoryPrices];
                        newPrices[index] = "";
                        setCategoryPrices(newPrices);
                        if (templates[selectedTemplate] && templates[selectedTemplate].services[index]) {
                          templates[selectedTemplate].services[index].usd = "";
                        }
                      }}
                    >
                      🗑️
                    </button>
                    <span className="text-xs">$</span>
                    <span className="text-xs text-green-700 font-bold">
                      = {categoryPrices[index] && !isNaN(Number(categoryPrices[index]))
                        ? Math.round(Number(categoryPrices[index]) * exchangeRate)
                        : 0} ل.س
                    </span>
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
