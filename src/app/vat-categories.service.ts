import { Injectable, SystemJsNgModuleLoader } from '@angular/core';

export enum VatCategory {
  Food,
  Drinks
}

@Injectable({
  providedIn: 'root'
})
export class VatCategoriesService {

  constructor() { }

  public getVat(category: VatCategory): number {
    if (category === VatCategory.Food) return 20;
    if (category === VatCategory.Drinks) return 10;
    return NaN;
  }
}
