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
      {
        country: "USA",
        lines: [{ categories: "5", price: "7200", fontSize: 54, color: "#000" }],
        x: 160,
        y: 450,
      },
      {
        country: "USA",
        lines: [{ categories: "10-20-25", price: "8100", fontSize: 54, color: "#000" }],
        x: 390,
        y: 450,
      },
      {
        country: "USA",
        lines: [{ categories: "15-50", price: "8200", fontSize: 54, color: "#000" }],
        x: 670,
        y: 450,
        blockId: "usa-710-1",
      },
      {
        country: "USA",
        lines: [{ categories: "30-40-100", price: "8400", fontSize: 54, color: "#000" }],
        x: 920,
        y: 450,
        blockId: "usa-710-2",
      },

      // Column 2: Germany & UK
      {
        country: "Germany",
        lines: [{ categories: "5", price: "8400", fontSize: 54, color: "#000" }],
        x: 160,
        y: 700,
      },
      {
        country: "Germany",
        lines: [{ categories: "20-30-40-50", price: "8800", fontSize: 54, color: "#000" }],
        x: 390,
        y: 700,
        blockId: "ger-490-1",
      },
      {
        country: "Germany",
        lines: [{ categories: "10-15", price: "8800", fontSize: 54, color: "#000" }],
        x: 670,
        y: 700,
        blockId: "ger-490-2",
      },
      {
        country: "UK",
        lines: [{ categories: "5", price: "9200", fontSize: 54, color: "#000" }],
        x: 160,
        y: 1200,
        blockId: "uk-650-1",
      },
      {
        country: "UK",
        lines: [{ categories: "25-40", price: "8800", fontSize: 54, color: "#000" }],
        x: 390,
        y: 1200,
        blockId: "uk-650-2",
      },
      {
        country: "UK",
        lines: [{ categories: "10-15-20", price: "8800", fontSize: 54, color: "#000" }],
        x: 670,
        y: 1200,
      }, // Adjusted y
      {
        country: "UK",
        lines: [{ categories: "50-100", price: "8800", fontSize: 54, color: "#000" }],
        x: 920,
        y: 1200,
      },

      // Column 3: France & Italy
      { country: "Italy", lines: [{ price: "8900", fontSize: 54, color: "#000" }], x: 670, y: 960 },
      {
        country: "France",
        lines: [{ categories: "5", price: "8700", fontSize: 54, color: "#000" }],
        x: 920,
        y: 700,
      },
      {
        country: "France",
        lines: [{ categories: "15 to 50", price: "8900", fontSize: 54, color: "#000" }],
        x: 390,
        y: 960,
      },
      {
        country: "France",
        lines: [{ categories: "20", price: "9000", fontSize: 54, color: "#000" }],
        x: 160,
        y: 960,
      },
      { country: "Italy", lines: [{ price: "8900", fontSize: 54, color: "#000" }], x: 920, y: 960 }, // Adjusted y
    ],
  },
  template2: {
    image: template2,
    name: "قالب الخدمات الرقمية",
    date: { text: "21-7-2025", x: 850, y: 220 },
    services: [
      // نفس أماكن قالب أمازون، مع أسماء الخدمات الرقمية
      { name: "USDT", x: 105, y: 430, usd: 0, fontSize: 54, color: "#000" },
      { name: "Payeer", x: 310, y: 430, usd: 0, fontSize: 54, color: "#000" },
      { name: "iTunes USA 1", x: 525, y: 430, usd: 0, fontSize: 54, color: "#000" },
      { name: "iTunes USA 2", x: 730, y: 430, usd: 0, fontSize: 54, color: "#000" },
      { name: "iTunes USA 3", x: 935, y: 430, usd: 0, fontSize: 54, color: "#000" },

      { name: "Rezer Gold", x: 105, y: 680, usd: 0, fontSize: 54, color: "#000" },
      { name: "walmart 1", x: 310, y: 680, usd: 0, fontSize: 54, color: "#000" },
      { name: "walmart 2", x: 525, y: 680, usd: 0, fontSize: 54, color: "#000" },
      { name: "walmart 3", x: 730, y: 680, usd: 0, fontSize: 54, color: "#000" },
      { name: "Target 1", x: 935, y: 680, usd: 0, fontSize: 54, color: "#000" },

      { name: "Target 2", x: 105, y: 930, usd: 0, fontSize: 54, color: "#000" },
      { name: "Steam", x: 310, y: 930, usd: 0, fontSize: 54, color: "#000" },
      { name: "Paypal Send", x: 525, y: 930, usd: 0, fontSize: 54, color: "#000" },
      { name: "Paypal Link", x: 730, y: 930, usd: 0, fontSize: 54, color: "#000" },
      { name: "playstation", x: 935, y: 930, usd: 0, fontSize: 54, color: "#000" },

      { name: "master", x: 105, y: 1170, usd: 0, fontSize: 54, color: "#000" },
      { name: "Visa", x: 310, y: 1170, usd: 0, fontSize: 54, color: "#000" },
      { name: "Uber 1", x: 525, y: 1170, usd: 0, fontSize: 54, color: "#000" },
      { name: "Uber 2", x: 730, y: 1170, usd: 0, fontSize: 54, color: "#000" }, // مكان إضافي إذا أردت تكرار أو إضافة خدمة أخرى
      { name: "starbucks", x: 935, y: 1170, usd: 0, fontSize: 54, color: "#000" }, // مكان إضافي
    ],
  },
};

function App() {
  // التخزين المحلي: استرجاع القيم عند بدء التطبيق
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return localStorage.getItem("selectedTemplate") || null;
  });
  const [services, setServices] = useState(() => {
    const stored = localStorage.getItem("services");
    return stored ? JSON.parse(stored) : [];
  });
  const [exchangeRate, setExchangeRate] = useState(() => {
    const stored = localStorage.getItem("exchangeRate");
    return stored ? Number(stored) : 15000;
  });
  // تاريخ القالب
  const [templateDate, setTemplateDate] = useState(() => {
    const stored = localStorage.getItem("templateDate");
    return stored ? JSON.parse(stored) : {
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
      // إذا هناك بيانات مخزنة للقالب الحالي استخدمها، وإلا استخدم القيم الافتراضية
      const storedServices = localStorage.getItem(`services_${selectedTemplate}`);
      setServices(
        storedServices ? JSON.parse(storedServices) : JSON.parse(JSON.stringify(templates[selectedTemplate].services))
      );
      const storedDate = localStorage.getItem(`templateDate_${selectedTemplate}`);
      if (storedDate) {
        setTemplateDate(JSON.parse(storedDate));
      } else {
        const date = templates[selectedTemplate].date || { text: "", x: 0, y: 0 };
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
      localStorage.setItem(`services_${selectedTemplate}`, JSON.stringify(services));
    }
    localStorage.setItem("services", JSON.stringify(services));
  }, [services, selectedTemplate]);

  useEffect(() => {
    localStorage.setItem("exchangeRate", exchangeRate);
  }, [exchangeRate]);

  useEffect(() => {
    if (selectedTemplate) {
      localStorage.setItem(`templateDate_${selectedTemplate}`, JSON.stringify(templateDate));
    }
    localStorage.setItem("templateDate", JSON.stringify(templateDate));
  }, [templateDate, selectedTemplate]);

  useEffect(() => {
    if (selectedTemplate) drawCanvas();
    // eslint-disable-next-line
  }, [selectedTemplate, services, exchangeRate]);

  // إعادة الرسم عند تغيير التاريخ
  useEffect(() => {
    if (selectedTemplate) drawCanvas();
    // eslint-disable-next-line
  }, [templateDate]);

  const updateServicePrice = (serviceIndex, lineIndex, value) => {
    const newServices = [...services];
    newServices[serviceIndex].lines[lineIndex].price = value;
    setServices(newServices);
  };

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

        services.forEach((service) => {
          // Special case: two categories/prices side by side
          if (service.lines.length === 2) {
            const offset = 60; // horizontal distance from center (final polish)
            const yCat = service.y - 14;
            const yPrice = yCat + 34;
            // Helper to auto-fit and auto-grow category text
            function fitCategoryText(text, maxWidth) {
              let fontSize = 32;
              ctx.font = `900 ${fontSize}px Arial`;
              // Try to maximize font size for short categories
              while (
                ctx.measureText(text).width < maxWidth - 20 &&
                fontSize < 36
              ) {
                fontSize += 1;
                ctx.font = `900 ${fontSize}px Arial`;
              }
              // Reduce font size for long text
              while (ctx.measureText(text).width > maxWidth && fontSize > 18) {
                fontSize -= 1;
                ctx.font = `900 ${fontSize}px Arial`;
              }
              return fontSize;
            }
            // Left item
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            let leftFont = fitCategoryText(service.lines[0].categories, 110);
            ctx.font = `900 ${leftFont}px Arial`;
            ctx.fillStyle = "#000";
            ctx.fillText(service.lines[0].categories, service.x - offset, yCat);
            ctx.font = `bold ${service.lines[0].fontSize || 54}px Arial`;
            ctx.fillStyle = service.lines[0].color || "#000";
            ctx.fillText(service.lines[0].price, service.x - offset, yPrice);
            // Right item
            let rightFont = fitCategoryText(service.lines[1].categories, 110);
            ctx.font = `900 ${rightFont}px Arial`;
            ctx.fillStyle = "#000";
            ctx.fillText(service.lines[1].categories, service.x + offset, yCat);
            ctx.font = `bold ${service.lines[1].fontSize || 54}px Arial`;
            ctx.fillStyle = service.lines[1].color || "#000";
            ctx.fillText(service.lines[1].price, service.x + offset, yPrice);
          } else {
            // Default: stacked vertically
            const lineSpacing = 45;
            const totalHeight = (service.lines.length - 1) * lineSpacing;
            const startY = service.y - totalHeight / 2;
            service.lines.forEach((line, lineIndex) => {
              const yPos = startY + lineIndex * lineSpacing;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              // Categories
              if (line.categories) {
                ctx.font = "bold 28px Arial";
                ctx.fillStyle = "#000";
                ctx.fillText(line.categories, service.x, yPos - 15);
              }
              // Price
              ctx.font = `bold ${line.fontSize || 54}px Arial`;
              ctx.fillStyle = line.color || "#000";
              ctx.fillText(line.price, service.x, yPos + 20);
            });
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
            ctx.font = `bold ${service.fontSize || 54}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            const drawX = service.x + 30;
            const drawY = service.y + 30;
            ctx.strokeText(`${syp} `, drawX, drawY);
            ctx.fillStyle = service.color || "#000";
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
                      <label className="text-sm font-medium mb-1">نص التاريخ:</label>
                      <Input
                        value={templateDate.text}
                        onChange={(e) => setTemplateDate((d) => ({ ...d, text: e.target.value }))}
                        className="w-full text-sm"
                        placeholder="مثال: 21-7-2025"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium mb-1">لون الخط:</label>
                      <input
                        type="color"
                        value={templateDate.color}
                        onChange={e => setTemplateDate(d => ({ ...d, color: e.target.value }))}
                        className="w-10 h-10 p-0 border-none bg-transparent"
                        style={{ minWidth: 36 }}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium mb-1">حجم الخط:</label>
                      <Input
                        type="number"
                        min={10}
                        max={200}
                        value={templateDate.fontSize}
                        onChange={e => setTemplateDate(d => ({ ...d, fontSize: Number(e.target.value) }))}
                        className="w-full text-sm"
                        placeholder="مثال: 50"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium mb-1">الموقع X:</label>
                      <Input
                        type="number"
                        value={templateDate.x}
                        onChange={(e) => setTemplateDate((d) => ({ ...d, x: Number(e.target.value) }))}
                        className="w-full text-sm"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium mb-1">الموقع Y:</label>
                      <Input
                        type="number"
                        value={templateDate.y}
                        onChange={(e) => setTemplateDate((d) => ({ ...d, y: Number(e.target.value) }))}
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
                {selectedTemplate === "template1"
                  ? services.map((service, serviceIndex) => (
                      <Card key={serviceIndex} className="p-3">
                        <div className="font-bold text-md mb-2 text-center">
                          {service.country}
                        </div>
                        {service.lines.map((line, lineIndex) => (
                          <div
                            key={lineIndex}
                            className="flex items-center gap-2 mb-2"
                          >
                            <span
                              className="font-medium text-sm w-2/5 truncate"
                              title={line.categories}
                            >
                              {line.categories}:
                            </span>
                            <Input
                              placeholder="السعر"
                              value={line.price}
                              type="text"
                              onChange={(e) =>
                                updateServicePrice(
                                  serviceIndex,
                                  lineIndex,
                                  e.target.value
                                )
                              }
                              className="text-sm w-3/5"
                            />
                            <Input
                              type="number"
                              min={10}
                              max={200}
                              value={line.fontSize}
                              onChange={e => {
                                const newServices = [...services];
                                newServices[serviceIndex].lines[lineIndex].fontSize = Number(e.target.value);
                                setServices(newServices);
                              }}
                              className="w-16 text-xs"
                              placeholder="حجم الخط"
                              style={{direction:"ltr"}}
                            />
                            <input
                              type="color"
                              value={line.color}
                              onChange={e => {
                                const newServices = [...services];
                                newServices[serviceIndex].lines[lineIndex].color = e.target.value;
                                setServices(newServices);
                              }}
                              title="لون السعر"
                              className="w-8 h-8 p-0 border-0 bg-transparent"
                            />
                          </div>
                        ))}
                      </Card>
                    ))
                  : services.map((service, index) => (
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
                          <Input
                            type="number"
                            min={10}
                            max={200}
                            value={service.fontSize}
                            onChange={e => {
                              const newServices = [...services];
                              newServices[index].fontSize = Number(e.target.value);
                              setServices(newServices);
                            }}
                            className="w-16 text-xs"
                            placeholder="حجم الخط"
                            style={{direction:"ltr"}}
                          />
                          <input
                            type="color"
                            value={service.color}
                            onChange={e => {
                              const newServices = [...services];
                              newServices[index].color = e.target.value;
                              setServices(newServices);
                            }}
                            title="لون السعر"
                            className="w-8 h-8 p-0 border-0 bg-transparent"
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
