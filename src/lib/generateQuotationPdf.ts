import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { QuotationLineItem } from '@/models/Quotation';

export interface PdfQuotationInput {
  quoteNumber: string;
  clientName: string;
  companyName?: string;
  email: string;
  phone: string;
  notes?: string;
  hostingTier: string;
  selectedItems: QuotationLineItem[];
  oneTimeTotal: number;
  monthlyTotal: number;
  estimatedWeeks: number;
}

async function loadLogoBase64(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  try {
    const res = await fetch('/assets/logo.png');
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function formatLkr(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-LK')}`;
}

/**
 * Generates and downloads a print-ready corporate A4 PDF Quotation:
 * Filename: Zora_Solutions_Quotation_[QuoteID].pdf
 */
export async function generateOfficialQuotationPdf(data: PdfQuotationInput): Promise<void> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  const issueDate = new Date();
  const validUntil = new Date(issueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const dateFmt = (d: Date) =>
    d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const cleanQuoteId = data.quoteNumber.replace(/[^A-Za-z0-9_-]/g, '');

  // =========================================================================
  // 1. CORPORATE DARK-NAVY HEADER BANNER WITH LOGO & METADATA BOX
  // =========================================================================
  doc.setFillColor(4, 9, 20); // #040914
  doc.rect(0, 0, pageWidth, 44, 'F');

  // Electric Cyan accent line under header
  doc.setFillColor(0, 240, 255); // #00F0FF
  doc.rect(0, 44, pageWidth, 1.4, 'F');

  const logoBase64 = await loadLogoBase64();
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', margin, 8, 22, 22);
  }

  const brandX = logoBase64 ? margin + 27 : margin;
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('ZORA SOLUTIONS', brandX, 17);

  doc.setTextColor(0, 240, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('CRAFTING DIGITAL SOLUTIONS', brandX, 23);

  doc.setTextColor(203, 213, 225);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('OFFICIAL PROJECT ESTIMATE & QUOTATION', brandX, 31);

  // Right Metadata Box inside header
  const metaBoxW = 64;
  const metaBoxX = pageWidth - margin - metaBoxW;
  doc.setFillColor(10, 22, 46);
  doc.setDrawColor(0, 240, 255);
  doc.setLineWidth(0.35);
  doc.roundedRect(metaBoxX, 7, metaBoxW, 30, 2, 2, 'FD');

  doc.setTextColor(255, 184, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text(data.quoteNumber, metaBoxX + 4, 14);

  doc.setTextColor(226, 232, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Issued: ${dateFmt(issueDate)}`, metaBoxX + 4, 21.5);
  doc.text(`Valid Until: ${dateFmt(validUntil)}`, metaBoxX + 4, 27.5);
  doc.text('Timeline: Confirmed by Company', metaBoxX + 4, 33.5);

  // =========================================================================
  // 2. PREPARED FOR (CLIENT) & PREPARED BY (ZORA SOLUTIONS)
  // =========================================================================
  let cursorY = 53;
  const colW = (pageWidth - margin * 2 - 8) / 2;

  // Left Card: Prepared For
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, cursorY, colW, 32, 2, 2, 'FD');

  doc.setTextColor(0, 81, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('PREPARED FOR', margin + 4, cursorY + 6.5);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text(data.clientName, margin + 4, cursorY + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(data.companyName || 'Client / Business Partner', margin + 4, cursorY + 18.5);
  doc.text(`Phone: ${data.phone}`, margin + 4, cursorY + 23.5);
  doc.text(`Email: ${data.email}`, margin + 4, cursorY + 28.5);

  // Right Card: Prepared By
  const rightX = margin + colW + 8;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rightX, cursorY, colW, 32, 2, 2, 'FD');

  doc.setTextColor(0, 81, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('PREPARED BY', rightX + 4, cursorY + 6.5);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('Zora Solutions', rightX + 4, cursorY + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Panduka: +94 777 321 165 (Call / WhatsApp)', rightX + 4, cursorY + 18.5);
  doc.text('Dilum: +94 77 749 8608 (Call / WhatsApp)', rightX + 4, cursorY + 23.5);
  doc.text('Email: zorasolution.official@gmail.com', rightX + 4, cursorY + 28.5);

  cursorY += 39;

  const hasPlusHosting = data.hostingTier.includes('Dedicated Cloud Hosting') || data.hostingTier.includes('25,000+');

  // =========================================================================
  // 3. ITEMIZED PRICING TABLE
  // =========================================================================
  const tableRows = data.selectedItems.map((item, index) => [
    String(index + 1).padStart(2, '0'),
    item.name,
    item.billingType,
    item.billingType === 'Monthly'
      ? `${formatLkr(item.price)} / mo`
      : item.name.includes('Dedicated Cloud Hosting')
      ? `${formatLkr(item.price)}+`
      : formatLkr(item.price),
  ]);

  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin, right: margin },
    head: [['#', 'Service / Module Description', 'Billing Type', 'Price (LKR)']],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: [4, 9, 20],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      cellPadding: 3.5,
    },
    bodyStyles: {
      textColor: [15, 23, 42],
      fontSize: 8.5,
      cellPadding: 3.2,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 32, halign: 'center' },
      3: { cellWidth: 38, halign: 'right', fontStyle: 'bold' },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cursorY = ((doc as any).lastAutoTable?.finalY ?? cursorY + 55) + 7;

  // Check page space before Totals & Clauses
  if (cursorY > pageHeight - 95) {
    doc.addPage();
    cursorY = 20;
  }

  // =========================================================================
  // 4. SUMMARY TOTALS BOX
  // =========================================================================
  const summaryH = data.monthlyTotal > 0 ? 24 : 16;
  doc.setFillColor(4, 9, 20);
  doc.roundedRect(margin, cursorY, pageWidth - margin * 2, summaryH, 2.5, 2.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('TOTAL ONE-TIME INVESTMENT (LKR)', margin + 6, cursorY + 10);

  doc.setTextColor(0, 240, 255);
  doc.setFontSize(13);
  doc.text(
    `${formatLkr(data.oneTimeTotal)}${hasPlusHosting ? '+' : ''}`,
    pageWidth - margin - 6,
    cursorY + 10,
    {
      align: 'right',
    }
  );

  if (data.monthlyTotal > 0) {
    doc.setTextColor(226, 232, 240);
    doc.setFontSize(9.5);
    doc.text('TOTAL MONTHLY RETAINER (LKR)', margin + 6, cursorY + 19);

    doc.setTextColor(255, 184, 0);
    doc.setFontSize(11.5);
    doc.text(`${formatLkr(data.monthlyTotal)} / month`, pageWidth - margin - 6, cursorY + 19, {
      align: 'right',
    });
  }

  cursorY += summaryH + 7;

  // Special Client Notes (if provided)
  if (data.notes && data.notes.trim().length > 0) {
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, cursorY, pageWidth - margin * 2, 16, 2, 2, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('SPECIAL PROJECT NOTES:', margin + 4, cursorY + 5.5);
    doc.setFont('helvetica', 'normal');
    const wrappedNotes = doc.splitTextToSize(data.notes.trim(), pageWidth - margin * 2 - 8);
    doc.text(wrappedNotes.slice(0, 2), margin + 4, cursorY + 10.5);
    cursorY += 20;
  }

  // =========================================================================
  // 5. USD EXCHANGE RATE CLAUSE, PAYMENT SCHEDULE & DIGITAL STAMP
  // =========================================================================
  // USD Notice Box
  doc.setFillColor(255, 251, 235);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.35);
  const usdText =
    'Currency & Market Rate Notice: All base development prices are quoted in Sri Lankan Rupees (LKR). However, third-party cloud infrastructure, custom domains (.com/.net), external APIs, and paid advertising budgets are tied to the US Dollar (USD) and may fluctuate based on the prevailing bank USD exchange rate at the time of invoice.';
  const wrappedUsd = doc.splitTextToSize(usdText, pageWidth - margin * 2 - 8);
  const usdBoxH = wrappedUsd.length * 4.2 + 7;
  doc.roundedRect(margin, cursorY, pageWidth - margin * 2, usdBoxH, 2, 2, 'FD');

  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.text(wrappedUsd, margin + 4, cursorY + 5.5);

  cursorY += usdBoxH + 6;

  // Payment Terms & Validity
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('TERMS, MILESTONES & VALIDITY', margin, cursorY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(
    '• Payment Schedule: 50% Advance mobilization fee to commence project, 30% upon UI/Demo approval, 20% upon final deployment.',
    margin,
    cursorY + 5.5
  );
  doc.text(
    `• Hosting Tier Selected: ${data.hostingTier}`,
    margin,
    cursorY + 10.5
  );
  doc.text(
    `• Delivery Schedule & Validity: Project timeline is decided by Zora Solutions at kickoff. Valid until ${dateFmt(validUntil)}.`,
    margin,
    cursorY + 15.5
  );

  // Authorized Digital Stamp / Signature Block
  const stampY = Math.max(cursorY + 24, pageHeight - 34);
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, stampY, margin + 62, stampY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Panduka & Dilum — Co-Founders', margin, stampY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Authorized Digital Stamp • Zora Solutions', margin, stampY + 9.5);

  // Digital Seal Box on Right
  const sealX = pageWidth - margin - 60;
  doc.setFillColor(4, 9, 20);
  doc.setDrawColor(0, 240, 255);
  doc.roundedRect(sealX, stampY - 7, 60, 20, 2, 2, 'FD');
  doc.setTextColor(0, 240, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('VERIFIED OFFICIAL ESTIMATE', sealX + 30, stampY - 0.5, { align: 'center' });
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('WhatsApp: +94 777 321 165 | +94 77 749 8608', sealX + 30, stampY + 4.8, {
    align: 'center',
  });
  doc.text(data.quoteNumber, sealX + 30, stampY + 9.5, { align: 'center' });

  doc.save(`Zora_Solutions_Quotation_${cleanQuoteId}.pdf`);
}

