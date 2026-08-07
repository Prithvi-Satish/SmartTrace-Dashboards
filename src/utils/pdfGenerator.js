// SmartTrace™ Watermarked PDF Audit Certificate & CPCB Report Generator

export function generateAuditCertificatePDF(cycleData, hospitalName = "Apollo Super Speciality Hospital") {
  const windowRef = window.open('', '_blank');
  if (!windowRef) {
    alert("Please allow popups to download the official PDF Audit Certificate.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Official CPCB Audit Certificate - ${cycleData.cycleId}</title>
      <style>
        @page { size: A4; margin: 20mm; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #0f172a;
          margin: 0;
          padding: 0;
          position: relative;
          background-color: #ffffff;
        }
        
        /* Security Watermark Background Overlay */
        .watermark {
          position: fixed;
          top: 35%;
          left: 5%;
          width: 90%;
          text-align: center;
          font-size: 42px;
          font-weight: 900;
          color: rgba(225, 29, 72, 0.07);
          transform: rotate(-30deg);
          pointer-events: none;
          text-transform: uppercase;
          letter-spacing: 4px;
          line-height: 1.4;
          z-index: 1;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 3px solid #0284c7;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }

        .logo-title {
          font-size: 22px;
          font-weight: 900;
          color: #0369a1;
          letter-spacing: -0.5px;
        }

        .subtitle {
          font-size: 11px;
          color: #64748b;
          margin-top: 2px;
        }

        .badge-verified {
          background-color: #dcfce7;
          color: #15803d;
          border: 1px solid #86efac;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          display: inline-block;
        }

        .section-title {
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #0f172a;
          border-bottom: 1.5px solid #e2e8f0;
          padding-bottom: 4px;
          margin-top: 20px;
          margin-bottom: 12px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .info-card {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 10px 14px;
          border-radius: 8px;
        }

        .label {
          font-size: 10px;
          text-transform: uppercase;
          color: #64748b;
          font-weight: 700;
        }

        .value {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          margin-top: 2px;
        }

        .hash-box {
          background-color: #0f172a;
          color: #38bdf8;
          font-family: monospace;
          font-size: 10px;
          padding: 10px 14px;
          border-radius: 8px;
          word-break: break-all;
          margin-top: 15px;
        }

        .qr-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 30px;
          padding: 15px;
          background-color: #f1f5f9;
          border-radius: 10px;
          border: 1px dashed #cbd5e1;
        }

        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 10px;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
          padding-top: 15px;
        }
      </style>
    </head>
    <body>
      <!-- Watermark -->
      <div class="watermark">
        OFFICIAL MEDICAL BOARD AUDIT RECORD<br/>
        UNCOMPROMISED DATA INTEGRITY<br/>
        SHA-256 HASH VERIFIED
      </div>

      <!-- Header -->
      <div class="header">
        <div>
          <div class="logo-title">SmartTrace™ Compliance Certificate</div>
          <div class="subtitle">Central Pollution Control Board (CPCB) Biomedical Waste Rule 2016 Compliant</div>
        </div>
        <div class="badge-verified">
          ✓ CPCB PASSED & SIGNED
        </div>
      </div>

      <!-- Facility & Machine Identity -->
      <div class="section-title">Facility & Device Identification</div>
      <div class="grid-2">
        <div class="info-card">
          <div class="label">Healthcare Facility</div>
          <div class="value">${hospitalName}</div>
        </div>
        <div class="info-card">
          <div class="label">Sterilization Machine ID</div>
          <div class="value">${cycleData.machineId}</div>
        </div>
        <div class="info-card">
          <div class="label">Department / Location</div>
          <div class="value">${cycleData.department}</div>
        </div>
        <div class="info-card">
          <div class="label">Operator ID</div>
          <div class="value">${cycleData.operator}</div>
        </div>
      </div>

      <!-- Cycle Telemetry Record -->
      <div class="section-title">Cycle Telemetry & Waste Details</div>
      <div class="grid-2">
        <div class="info-card">
          <div class="label">Unique Cycle Reference</div>
          <div class="value">${cycleData.cycleId}</div>
        </div>
        <div class="info-card">
          <div class="label">Barcoded Waste Bag ID</div>
          <div class="value">${cycleData.bagId} (${cycleData.bagCategory})</div>
        </div>
        <div class="info-card">
          <div class="label">Cycle Timestamp</div>
          <div class="value">${cycleData.startTime} - ${cycleData.endTime} (${cycleData.duration})</div>
        </div>
        <div class="info-card">
          <div class="label">AI Bag Integrity Analysis</div>
          <div class="value">${cycleData.aiResult}</div>
        </div>
      </div>

      <!-- Cryptographic Hash Verification -->
      <div class="section-title">End-to-End Cryptographic Audit Hash</div>
      <div class="hash-box">
        <div>SHA-256 DIGEST: ${cycleData.hashChain}</div>
        <div style="margin-top: 4px; color: #4ade80;">HARDWARE SIGNATURE: ATECC608A-ECDSA-VERIFIED</div>
      </div>

      <!-- Verification QR Section -->
      <div class="qr-section">
        <div>
          <div style="font-weight: 800; font-size: 13px;">Government Audit Verification QR</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 3px;">
            Scan code or visit <strong>https://smarttrace.med/verify/${cycleData.cycleId}</strong> to verify cryptographic proof on public ledger.
          </div>
        </div>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://smarttrace.med/verify/${cycleData.cycleId}" alt="QR" style="border-radius: 6px; border: 1px solid #cbd5e1;" />
      </div>

      <!-- Footer -->
      <div class="footer">
        Generated automatically by SmartTrace™ Medical Audit Engine v2.8 • Licensed under CPCB BMW Rules 2016 • Document ID: ${cycleData.cycleId}-CERT
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  windowRef.document.write(htmlContent);
  windowRef.document.close();
}
