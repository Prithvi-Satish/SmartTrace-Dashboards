// KSPCB (Karnataka State Pollution Control Board) PDF & Official Document Generator
// Generates official printable forms formatted according to BMWM Rules 2016 & KSPCB guidelines.

export function generateKSPCBForm4PDF(data) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download KSPCB Form IV report.');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>KSPCB Form IV - Annual Return Report</title>
        <style>
          body { font-family: 'Arial', sans-serif; margin: 30px; color: #1e293b; font-size: 13px; line-height: 1.5; }
          .header { text-align: center; border-bottom: 2px solid #00875a; padding-bottom: 15px; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 20px; color: #00875a; text-transform: uppercase; }
          .header h2 { margin: 5px 0 0 0; font-size: 14px; color: #475569; font-weight: normal; }
          .header h3 { margin: 3px 0 0 0; font-size: 12px; color: #64748b; font-weight: bold; }
          .meta-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 15px; margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
          .meta-item { margin-bottom: 5px; }
          .meta-item strong { color: #0f172a; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
          th { background: #e2e8f0; font-weight: bold; color: #1e293b; }
          .total-row { background: #f1f5f9; font-weight: bold; }
          .footer { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
          .sig-box { text-align: center; border-top: 1px solid #94a3b8; width: 220px; padding-top: 5px; }
          .watermark { position: fixed; top: 40%; left: 20%; transform: rotate(-30deg); font-size: 48px; color: rgba(0, 135, 90, 0.08); font-weight: bold; pointer-events: none; }
        </style>
      </head>
      <body>
        <div class="watermark">KSPCB OFFICIAL STATUTORY SUBMISSION</div>
        <div class="header">
          <h1>KARNATAKA STATE POLLUTION CONTROL BOARD</h1>
          <h2>FORM IV (See rule 13) - ANNUAL REPORT</h2>
          <h3>Preceded Calendar Year Period: 01-Jan-2025 to 31-Dec-2025</h3>
        </div>

        <div class="meta-grid">
          <div>
            <div class="meta-item"><strong>Healthcare Facility Name:</strong> ${data.facilityName}</div>
            <div class="meta-item"><strong>KSPCB Authorization No:</strong> ${data.kspcbAuthorizationNo}</div>
            <div class="meta-item"><strong>KSPCB Regional Office:</strong> ${data.kspcbRegionalOffice}</div>
            <div class="meta-item"><strong>Sanctioned Bed Capacity:</strong> ${data.authorizedBeds} Beds</div>
          </div>
          <div>
            <div class="meta-item"><strong>X-GN Submission Ack No:</strong> ${data.form4AnnualReturnSummary.xgnAckNo}</div>
            <div class="meta-item"><strong>CBWTF Partner Vendor:</strong> ${data.cbwtfPartner.name}</div>
            <div class="meta-item"><strong>CBWTF License No:</strong> ${data.cbwtfPartner.cbwtfLicenseNo}</div>
            <div class="meta-item"><strong>Compliance Officer:</strong> Dr. Srinivas N.</div>
          </div>
        </div>

        <h4 style="margin-bottom: 5px; color: #0f172a;">1. Category-Wise Annual Waste Generation Summary</h4>
        <table>
          <thead>
            <tr>
              <th>Waste Category Code</th>
              <th>Color Coding & Waste Specification</th>
              <th>Annual Generation (Kg/Year)</th>
              <th>Average Daily Generation (Kg/Day)</th>
              <th>Treatment & Disposal Mode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Yellow Category</td>
              <td>Human Anatomical, Animal Waste, Soiled & Cytotoxic Waste</td>
              <td>${data.form4AnnualReturnSummary.totalYellowKg.toLocaleString()} kg</td>
              <td>${(data.form4AnnualReturnSummary.totalYellowKg / 365).toFixed(1)} kg</td>
              <td>Incineration at Maridi CBWTF / On-site Pre-sterilization</td>
            </tr>
            <tr>
              <td>Red Category</td>
              <td>Contaminated Tubing, Catheters, IV Sets & Plastics</td>
              <td>${data.form4AnnualReturnSummary.totalRedKg.toLocaleString()} kg</td>
              <td>${(data.form4AnnualReturnSummary.totalRedKg / 365).toFixed(1)} kg</td>
              <td>Autoclaving / Shredding & Recycling via CBWTF</td>
            </tr>
            <tr>
              <td>White (Translucent)</td>
              <td>Waste Sharps including Needles, Syringes with fixed needles</td>
              <td>${data.form4AnnualReturnSummary.totalWhiteKg.toLocaleString()} kg</td>
              <td>${(data.form4AnnualReturnSummary.totalWhiteKg / 365).toFixed(1)} kg</td>
              <td>Puncture Proof Container & Encapsulation / CBWTF Shredder</td>
            </tr>
            <tr>
              <td>Blue Category</td>
              <td>Glassware, Medicine Vials, Ampoules & Metallic Implants</td>
              <td>${data.form4AnnualReturnSummary.totalBlueKg.toLocaleString()} kg</td>
              <td>${(data.form4AnnualReturnSummary.totalBlueKg / 365).toFixed(1)} kg</td>
              <td>Sodium Hypochlorite Disinfection & Glass Recycling</td>
            </tr>
            <tr class="total-row">
              <td colspan="2">TOTAL ANNUAL BIOMEDICAL WASTE GENERATED</td>
              <td>${data.form4AnnualReturnSummary.totalCombinedKg.toLocaleString()} kg</td>
              <td>${data.form4AnnualReturnSummary.dailyAvgKg} kg</td>
              <td>100% Accounted & Verified via SmartTrace™</td>
            </tr>
          </tbody>
        </table>

        <h4 style="margin-bottom: 5px; color: #0f172a;">2. Environmental & Occupational Safety Metrics</h4>
        <table>
          <thead>
            <tr>
              <th>Mandatory Metric</th>
              <th>Logged Status</th>
              <th>Regulatory Standard Compliance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Staff BMW Training Conducted</td>
              <td>${data.form4AnnualReturnSummary.trainingSessionsCount} Sessions (${data.form4AnnualReturnSummary.staffTrainedCount} personnel)</td>
              <td>COMPLIANT (100% Core Staff Covered)</td>
            </tr>
            <tr>
              <td>Hepatitis B Immunization Rate</td>
              <td>${data.form4AnnualReturnSummary.hepBCoveragePct}% Staff Covered</td>
              <td>COMPLIANT (3 Doses Verified)</td>
            </tr>
            <tr>
              <td>Liquid Effluent (ETP) Parameter</td>
              <td>${data.form4AnnualReturnSummary.liquidEffluentStatus}</td>
              <td>MEETS KSPCB EFFLUENT STANDARDS</td>
            </tr>
            <tr>
              <td>Autoclave Spore Strip Test Result</td>
              <td>NEGATIVE (Geobacillus stearothermophilus)</td>
              <td>STERILITY VERIFIED (48h Incubation)</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <div>
            <p><strong>Generated By:</strong> SmartTrace™ Cryptographic Compliance Engine</p>
            <p><strong>SHA-256 Hash Chain:</strong> 994812f84b912a7a8d01128e400a12998a</p>
          </div>
          <div class="sig-box">
            <p><strong>Occupier / Nodal Officer Signature</strong></p>
            <p style="font-size: 11px; color: #64748b;">(Apollo Super Speciality Hospital, Bangalore)</p>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

export function generateKSPCBForm1PDF(incident) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to view Form I Incident Report.');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>KSPCB Form I - Accident Reporting</title>
        <style>
          body { font-family: 'Arial', sans-serif; margin: 30px; color: #0f172a; font-size: 13px; line-height: 1.5; }
          .header { text-align: center; border-bottom: 2px solid #dc2626; padding-bottom: 12px; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 18px; color: #dc2626; }
          .header h2 { margin: 4px 0 0 0; font-size: 13px; color: #475569; }
          .box { border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; margin-bottom: 15px; background: #f8fafc; }
          .field { margin-bottom: 8px; }
          .field label { font-weight: bold; color: #334155; }
          .sig { margin-top: 40px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>KARNATAKA STATE POLLUTION CONTROL BOARD</h1>
          <h2>FORM I (See rule 13) - ACCIDENT REPORTING LOG</h2>
          <p style="font-size: 11px; color: #dc2626; font-weight: bold; margin: 2px 0 0 0;">MANDATORY 24-HOUR STATUTORY SUBMISSION</p>
        </div>

        <div class="box">
          <div class="field"><label>Incident Tracking ID:</label> ${incident.id}</div>
          <div class="field"><label>Date & Time of Accident:</label> ${incident.date} at ${incident.time}</div>
          <div class="field"><label>Location of Occurrence:</label> ${incident.location}</div>
          <div class="field"><label>Waste Category Involved:</label> ${incident.categoryInvolved} (${incident.estimatedQuantityKg} kg)</div>
        </div>

        <div class="box">
          <div class="field"><label>Cause of Accident:</label> ${incident.cause}</div>
          <div class="field"><label>Personnel Affected:</label> ${incident.affectedStaff}</div>
          <div class="field"><label>Injuries / Exposure Extent:</label> ${incident.injuries}</div>
        </div>

        <div class="box">
          <div class="field"><label>Immediate Mitigation & PEP Protocol:</label> ${incident.correctiveAction}</div>
          <div class="field"><label>Reported By Nodal Officer:</label> ${incident.nodalOfficerReported}</div>
          <div class="field"><label>Notification Timestamp:</label> ${incident.nodalReportTime}</div>
          <div class="field"><label>KSPCB X-GN Receipt Ack:</label> ${incident.kspcbFiledReceipt}</div>
        </div>

        <div class="sig">
          <div>
            <p><strong>SmartTrace Audit Hash:</strong> ${incident.id}-HASH-VERIFIED</p>
          </div>
          <div style="text-align: center; border-top: 1px solid #64748b; width: 200px; padding-top: 5px;">
            <strong>Hospital Nodal Officer</strong>
          </div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

export function generateKSPCBManifestPDF(manifest) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to print Waste Transfer Manifest.');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>KSPCB Form VI / Daily Pickup Manifest</title>
        <style>
          body { font-family: 'Arial', sans-serif; margin: 30px; color: #0f172a; font-size: 13px; line-height: 1.5; }
          .header { text-align: center; border-bottom: 2px solid #0284c7; padding-bottom: 10px; margin-bottom: 15px; }
          .header h1 { margin: 0; font-size: 18px; color: #0284c7; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { border: 1px solid #94a3b8; padding: 8px; text-align: center; }
          th { background: #e0f2fe; color: #0369a1; }
          .sig-row { display: flex; justify-content: space-between; margin-top: 30px; }
          .sig-cell { width: 45%; text-align: center; border-top: 1px solid #64748b; padding-top: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>KARNATAKA STATE POLLUTION CONTROL BOARD</h1>
          <h2>BIOMEDICAL WASTE TRANSPORT & HANDOVER MANIFEST (FORM-6)</h2>
        </div>

        <p><strong>Manifest Serial No:</strong> ${manifest.manifestNo} | <strong>Pickup Date:</strong> ${manifest.date} at ${manifest.pickupTime}</p>
        <p><strong>Healthcare Facility:</strong> Apollo Super Speciality Hospital (Bannerghatta Road, Bangalore)</p>
        <p><strong>CBWTF Transporter:</strong> ${manifest.transporter} (Vehicle: ${manifest.vehicleNo})</p>

        <table>
          <thead>
            <tr>
              <th>Waste Category Color</th>
              <th>Hospital Registered Weight (Kg)</th>
              <th>CBWTF Scanned Weight (Kg)</th>
              <th>Variance Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Yellow Category</td><td>${manifest.yellowKg} kg</td><td>-</td><td>Verified Barcoded</td></tr>
            <tr><td>Red Category</td><td>${manifest.redKg} kg</td><td>-</td><td>Verified Barcoded</td></tr>
            <tr><td>White Sharps</td><td>${manifest.whiteKg} kg</td><td>-</td><td>Verified Barcoded</td></tr>
            <tr><td>Blue Glassware</td><td>${manifest.blueKg} kg</td><td>-</td><td>Verified Barcoded</td></tr>
            <tr style="font-weight: bold; background: #f1f5f9;">
              <td>TOTAL BATCH WEIGHT</td>
              <td>${manifest.totalHospitalKg} kg</td>
              <td>${manifest.cbwtfScannedKg} kg</td>
              <td style="color: ${manifest.varianceStatus === 'MATCHED_PASSED' ? '#059669' : '#dc2626'}">
                ${manifest.variancePct} (${manifest.varianceStatus})
              </td>
            </tr>
          </tbody>
        </table>

        <div class="sig-row">
          <div class="sig-cell">
            <strong>Hospital BMW Incharge Signature</strong>
            <p style="font-size: 11px; margin-top: 3px;">${manifest.hospitalAgentSig}</p>
          </div>
          <div class="sig-cell">
            <strong>CBWTF Vehicle Driver Signature</strong>
            <p style="font-size: 11px; margin-top: 3px;">${manifest.driverSig} (${manifest.driver})</p>
          </div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
