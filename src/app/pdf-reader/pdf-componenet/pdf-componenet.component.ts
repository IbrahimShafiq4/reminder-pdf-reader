import { Component, OnInit } from '@angular/core';
import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import { CommonModule } from '@angular/common';

// Import worker as URL
const workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
);
(pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerSrc.toString();

interface StoredPdf {
  name: string;
  content: string;
}

@Component({
  selector: 'app-pdf-componenet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-componenet.component.html',
  styleUrls: ['./pdf-componenet.component.scss'],
})
export class PdfComponenetComponent implements OnInit {
  pdfList: StoredPdf[] = [];
  isLoading = false;
  ocrProgress = 0;

  ngOnInit() {
    const data = localStorage.getItem('ocrPdfs');
    if (data) this.pdfList = JSON.parse(data);
  }

  async onFileSelected(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      this.isLoading = true;
      this.ocrProgress = 0;

      const arrayBuffer = await file.arrayBuffer();

      let pdf;
      try {
        pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      } catch (pdfError) {
        console.error('PDF loading error:', pdfError);
        alert('حدث خطأ في تحميل ملف PDF. يرجى التأكد من أن الملف صالح.');
        this.isLoading = false;
        return;
      }

      let fullText = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        await page.render(renderContext).promise;

        const imgData = canvas.toDataURL('image/png');

        const result = await Tesseract.recognize(imgData, 'eng+ara', {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              this.ocrProgress = Math.round(
                ((pageNum - 1) / pdf.numPages) * 100 +
                  m.progress * (100 / pdf.numPages)
              );
            }
          },
        });

        fullText += result.data.text + '\n';
      }

      this.pdfList.unshift({ name: file.name, content: fullText });
      this.pdfList = this.pdfList.slice(0, 10);
      localStorage.setItem('ocrPdfs', JSON.stringify(this.pdfList));

      this.isLoading = false;
      this.ocrProgress = 100;
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('حدث خطأ غير متوقع أثناء معالجة الملف.');
      this.isLoading = false;
    }
  }

  deletePdf(i: number) {
    this.pdfList.splice(i, 1);
    localStorage.setItem('ocrPdfs', JSON.stringify(this.pdfList));
  }
}
