import { Component } from '@angular/core';
import { InvoiceLine, InvoiceCalculatorService, Invoice } from './invoice-calculator.service';
import { VatCategory } from './vat-categories.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  invoiceLines: InvoiceLine[] = [];
  invoice: Invoice = {
    invoiceLines: [],
    totalPriceExclusiveVat: 0,
    totalPriceInclusiveVat: 0,
    totalVat: null
  };

  product = '';
  priceInclusiveVat = 6;
  vatCategoryString = 'Food';

  vatCategories = VatCategory;

  constructor(private invoiceCalculator: InvoiceCalculatorService) { }

  addInvoice() {
    let line: InvoiceLine = {
      product: null,
      vatCategory: null,
      priceInclusiveVat: null
    };
    line.product = this.product;

    if (this.vatCategoryString === "Food") {
      line.vatCategory = this.vatCategories.Food;
    }
    if (this.vatCategoryString === "Drinks") {
      line.vatCategory = VatCategory.Drinks;
    }

    line.priceInclusiveVat = this.priceInclusiveVat;
    this.invoiceLines.push(line);
    console.log (line);
    this.invoice = this.invoiceCalculator.CalculateInvoice(this.invoiceLines);
    console.log (this.invoice)
  }

  productEmpty(){
    if (this.product === '') return true;
    return false;
  }
}
