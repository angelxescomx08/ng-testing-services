import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../../services/product.service';
import { generateManyProducts } from '../../models/product.mock';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, ProductComponent],
      providers: [{ provide: ProductsService, useValue: productsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;

    const mockProducts = generateManyProducts(3);
    productsService.getAll.and.returnValue(of(mockProducts));
    fixture.detectChanges(); //ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
