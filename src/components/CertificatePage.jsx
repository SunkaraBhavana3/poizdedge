// CertificatePage.jsx
import React from "react";
import { Download, Award } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CertificatePage({ studentName, courseName, instituteName, logoUrl }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = () => {
    const input = document.getElementById("certificate");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${studentName}_Certificate.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12">
      <div
        id="certificate"
        className="bg-white rounded-2xl shadow-2xl p-12 max-w-4xl w-full text-center border-8 border-double border-blue-400"
      >
        {logoUrl && <img src={logoUrl} alt="Institute Logo" className="w-24 mx-auto mb-6" />}
        <Award className="w-20 h-20 text-blue-600 mx-auto mb-6" />

        <h1 className="text-blue-800 text-3xl font-bold mb-6">Certificate of Completion</h1>

        <p className="text-slate-700 mb-4">This is to certify that</p>

        <h2 className="text-slate-800 text-2xl font-semibold mb-4 border-b-2 border-slate-300 pb-2 inline-block px-8">
          {studentName}
        </h2>

        <p className="text-slate-700 mb-4">has successfully completed</p>

        <h3 className="text-blue-700 text-xl font-medium mb-6">{courseName}</h3>

        {instituteName && <p className="text-slate-600 mb-6">{instituteName}</p>}

        <div className="flex justify-between items-end mt-12 pt-8 border-t border-slate-300">
          <div>
            <p className="text-slate-600">Date</p>
            <p className="text-slate-800">{currentDate}</p>
          </div>
          <div>
            <div className="border-t-2 border-slate-400 pt-2 px-8">
              <p className="text-slate-700">Instructor Signature</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-8"
      >
        <Download className="w-5 h-5" />
        Download Certificate (PDF)
      </button>
    </div>
  );
}
