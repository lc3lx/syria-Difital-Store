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
      { name: "USA 5", x: 140, y: 450, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "USA 10-15-25", x: 380, y: 450, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "USA 20-..-100", x: 650, y: 450, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "USA مكسر", x: 900, y: 450, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },

      // Column 2: Germany & UK
      { name: "Germany 5", x: 140, y: 710, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "Germany 10-15-25", x: 380, y: 700, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "Germany 30-40-50", x: 650, y: 700, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "UK 5 15 20", x: 140, y: 1200, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "UK 25 - 30 -40", x: 380, y: 1200, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "UK 50 - 100", x: 650, y: 1200, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "UK", x: 900, y: 1200, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },

      // Column 3: France & Italy
      { name: "Italy 5 - 40", x: 650, y: 960, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "France 5", x: 900, y: 720, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "France 20", x: 390, y: 960, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "France 10-15-25-30-40-50", x: 140, y: 960, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "Italy 10-15-25-30-50", x: 900, y: 960, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" }
    ],
  },
  template2: {
    image: template2,
    name: "قالب الخدمات الرقمية",
    date: { text: "21-7-2025", x: 850, y: 220 },
    services: [
      // نفس أماكن قالب أمازون، مع أسماء الخدمات الرقمية
      { name: "USDT", x: 105, y: 430, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "Payeer", x: 310, y: 430, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      {
        name: "iTunes USA 1",
        x: 525,
        y: 440,
        usd: 0,
        fontSize: 54,
        colorLabel: "#000", colorValue: "#000",
      },
      {
        name: "iTunes USA 2",
        x: 730,
        y: 440,
        usd: 0,
        fontSize: 54,
        colorLabel: "#000", colorValue: "#000",
      },
      {
        name: "iTunes USA 3",
        x: 935,
        y: 470,
        usd: 0,
        fontSize: 54,
        colorLabel: "#000", colorValue: "#000",
      },

      {
        name: "Rezer Gold",
        x: 105,
        y: 680,
        usd: 0,
        fontSize: 54,
        colorLabel: "#000", colorValue: "#000",
      },
      {
        name: "walmart 1",
        x: 310,
        y: 690,
        usd: 0,
        fontSize: 54,
        colorLabel: "#000", colorValue: "#000",
      },
      {
        name: "walmart 2",
        x: 525,
        y: 690,
        usd: 0,
        fontSize: 54,
        colorLabel: "#000", colorValue: "#000",
      },
      {
        name: "walmart 3",
        x: 730,
        y: 710,
        usd: 0,
        fontSize: 54,
        colorLabel: "#000", colorValue: "#000",
      },
      { name: "Target 1", x: 935, y: 700, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },

      { name: "Target 2", x: 105, y: 950, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "Steam", x: 310, y: 940, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      {
        name: "Paypal Send",
        x: 525,
        y: 940,
        usd: 0,
        fontSize: 54,
        colorLabel: "#000", colorValue: "#000",
      },
      {
        name: "Paypal Link",
        x: 730,
        y: 940,
        usd: 0,
        fontSize: 54,
        colorLabel: "#000", colorValue: "#000",
      },
      {
        name: "playstation",
        x: 935,
        y: 940,
        usd: 0,
        fontSize: 54,
        colorLabel: "#000", colorValue: "#000",
      },

      { name: "master", x: 105, y: 1180, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "Visa", x: 310, y: 1180, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "Uber 1", x: 525, y: 1200, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" },
      { name: "Uber 2", x: 730, y: 1200, usd: 0, fontSize: 54, colorLabel: "#000", colorValue: "#000" }, // مكان إضافي إذا أردت تكرار أو إضافة خدمة أخرى
      {
        name: "starbucks",
        x: 935,
        y: 1180,
        usd: 0,
        fontSize: 54,
        colorLabel: "#000", colorValue: "#000",
      }, // مكان إضافي
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

        // رسم اسم الفئة والسعر والموقع واللون والحجم من البيانات المنفصلة
        templates[selectedTemplate].services.forEach((service, idx) => {
          const name = categoryNames[idx] || "";
          const usd = categoryPrices[idx];
          const priceFont = service.fontSize || 54;
          const nameFont = Math.max(18, priceFont - 14);
          const drawX = service.x + 30;
          const drawY = service.y + 30;
          // رسم الاسم دائماً
          ctx.font = `bold ${nameFont}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.strokeStyle = "white";
          ctx.lineWidth = 4;
          ctx.strokeText(name, drawX, drawY - priceFont);
          ctx.fillStyle = service.colorLabel || "#000";
          ctx.fillText(name, drawX, drawY - priceFont);
          // رسم السعر إذا كان موجوداً
          if (usd && !isNaN(Number(usd))) {
            const syp = Math.round(Number(usd) * exchangeRate);
            ctx.font = `bold ${priceFont}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.strokeText(`${syp} `, drawX, drawY);
            ctx.fillStyle = service.colorValue || "#000";
            ctx.fillText(`${syp} `, drawX, drawY);
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
        services.forEach((service) => {
          if (service.usd && !isNaN(Number(service.usd))) {
            const syp = Math.round(Number(service.usd) * exchangeRate);
            const priceFont = service.fontSize || 54;
            const nameFont = Math.max(18, priceFont - 14);
            const drawX = service.x + 30;
            const drawY = service.y + 30;

            // Draw category name above price
            ctx.font = `bold ${nameFont}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 4;
            ctx.strokeText(service.name, drawX, drawY - priceFont);
            ctx.fillStyle = service.colorLabel || "#000";
            ctx.fillText(service.name, drawX, drawY - priceFont);

            // Draw price
            ctx.font = `bold ${priceFont}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.strokeText(`${syp} `, drawX, drawY);
            ctx.fillStyle = service.colorValue || "#000";
            ctx.fillText(`${syp} `, drawX, drawY);
          }
        });
      }
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
                      <span className="text-xs text-gray-500">X:</span>
                      <Input
                        type="number"
                        value={service.x}
                        onChange={(e) => {
                          const newTemplate = { ...templates };
                          newTemplate[selectedTemplate].services[index].x = Number(e.target.value);
                          templates[selectedTemplate].services[index].x = Number(e.target.value);
                          setCategoryNames([...categoryNames]);
                        }}
                        className="w-16 h-7 text-xs"
                      />
                      <span className="text-xs text-gray-500">Y:</span>
                      <Input
                        type="number"
                        value={service.y}
                        onChange={(e) => {
                          const newTemplate = { ...templates };
                          newTemplate[selectedTemplate].services[index].y = Number(e.target.value);
                          templates[selectedTemplate].services[index].y = Number(e.target.value);
                          setCategoryNames([...categoryNames]);
                        }}
                        className="w-16 h-7 text-xs"
                      />
                      <span className="text-xs text-gray-500">حجم اسم:</span>
                      <Input
                        type="number"
                        min={10}
                        max={200}
                        value={service.fontSize}
                        onChange={(e) => {
                          const newTemplate = { ...templates };
                          newTemplate[selectedTemplate].services[index].fontSize = Number(e.target.value);
                          templates[selectedTemplate].services[index].fontSize = Number(e.target.value);
                          setCategoryNames([...categoryNames]);
                        }}
                        className="w-14 text-xs"
                        placeholder="حجم الخط"
                        style={{ direction: "ltr" }}
                      />
                      <input
                        type="color"
                        value={service.colorLabel || "#000"}
                        onChange={(e) => {
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
                    <input
                      type="number"
                      min={10}
                      max={200}
                      value={templates[selectedTemplate]?.services[index]?.fontSize || 54}
                      onChange={(e) => {
                        if (templates[selectedTemplate] && templates[selectedTemplate].services[index]) {
                          templates[selectedTemplate].services[index].fontSize = Number(e.target.value);
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
                      title="لون خط السعر"
                      className="w-7 h-7 p-0 border-0 bg-transparent"
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
