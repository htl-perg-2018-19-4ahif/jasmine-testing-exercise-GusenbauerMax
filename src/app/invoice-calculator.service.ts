import { Injectable } from '@angular/core';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculatorService {

  constructor(private vatCategoriesService: VatCategoriesService) { }

  public CalculatePriceExclusiveVat(priceInclusiveVat: number, vatPercentage: number): number {
    return priceInclusiveVat/(vatPercentage+100)*100;
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    let result: Invoice = {
      invoiceLines: [],
      totalPriceExclusiveVat: null,
      totalPriceInclusiveVat: null,
      totalVat: null
    }

    let foodVat = (1+(this.vatCategoriesService.getVat(VatCategory.Food)/100));
    let drinkVat = (1+(this.vatCategoriesService.getVat(VatCategory.Drinks)/100));

    invoiceLines.forEach(line => {
      result.totalPriceInclusiveVat += line.priceInclusiveVat;
      result.invoiceLines.push({
        product: line.product,
        vatCategory: line.vatCategory,
        priceInclusiveVat: line.priceInclusiveVat,
        priceExclusiveVat: line.priceInclusiveVat / foodVat
      });
    });

    result.totalPriceExclusiveVat = result.totalPriceInclusiveVat / foodVat;
    
    return result;
  }
}
