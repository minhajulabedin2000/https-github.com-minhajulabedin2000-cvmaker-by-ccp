import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function downloadPdfFromElement(
  elementId: string,
  fileName: string = 'CV_BioData.pdf',
  onProgress?: (status: boolean) => void
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    if (onProgress) onProgress(true);

    // Temporarily ensure element is at full 100% scale without CSS transform for capture
    const originalTransform = element.style.transform;
    const originalTransition = element.style.transition;
    element.style.transform = 'none';
    element.style.transition = 'none';

    // Capture at high resolution (scale: 2.2 provides sharp 300dpi-equivalent quality)
    const canvas = await html2canvas(element, {
      scale: 2.2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Restore original transform
    element.style.transform = originalTransform;
    element.style.transition = originalTransition;

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // If height fits within one A4 page, output single page
    if (imgHeight <= pdfHeight + 2) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(imgHeight, pdfHeight));
    } else {
      // Multi-page slicing if user adds lots of content
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
    }

    pdf.save(fileName);
    if (onProgress) onProgress(false);
    return true;
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    if (onProgress) onProgress(false);
    return false;
  }
}

export function printDocument(): void {
  window.print();
}

export function exportJsonData(data: unknown, filename: string = 'cv_data.json'): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
