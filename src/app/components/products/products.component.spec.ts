import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../../services/product.service';
import { generateManyProducts } from '../../models/product.mock';
import { defer, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Product } from '../../models/product.model';
import { ValueService } from '../../services/value.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', [
      'getPromiseValue',
    ]);
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    const mockProducts = generateManyProducts(3);
    productsService.getAll.and.returnValue(of(mockProducts));
    fixture.detectChanges(); //ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test for getAllProducts()', () => {
    it('should return product list from service', () => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productsService.getAll.and.returnValue(of(productsMock));
      const countPrev = component.products.length;
      // Act
      component.getAllProducts();
      const expectedImg = fixture.debugElement.query(By.css('app-product img'));
      fixture.detectChanges();
      // Assert

      expect(component.products.length).toEqual(
        productsMock.length + countPrev
      );
      expect(component.products[0].images[0]).toEqual(
        expectedImg.nativeElement.src
      );
    });

    it('should change status "loading" => "success"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productsService.getAll.and.returnValue(
        defer(() => Promise.resolve<Product[]>(productsMock))
      );
      // Act
      component.getAllProducts();
      fixture.detectChanges();
      // Assert
      expect(component.status).toBe('loading');
      //tick sirve para ejecutar todo lo que esta pendiente observables,
      //setTimeout, promesas entre otras cosas, debe ser siempre usada con
      //fakeAsync
      tick();
      fixture.detectChanges();
      expect(component.status).toBe('success');
    }));

    it('should change status "loading" => "error"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productsService.getAll.and.returnValue(
        defer(() => Promise.reject<Product[]>(productsMock))
      );
      // Act
      component.getAllProducts();
      fixture.detectChanges();
      // Assert
      expect(component.status).toBe('loading');
      //Se le puede pasar un número para que espere ese tiempo, esto es
      //porque los setTimeout o cosas con un tiempo indefinido podrían no
      //ejecutarse a tiempo, dale un número más grande del que tienes en
      //setTimeout
      tick(2000);
      fixture.detectChanges();
      expect(component.status).toBe('error');
    }));

    describe('test for callPromise', () => {
      it('should call to promise', async () => {
        // Arrange
        const mockMsg = 'my mock string';

        valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
        // Act
        //se puede utilizar un await o un tick
        await component.callPromise();
        fixture.detectChanges();
        // Assert
        expect(component.rta).toEqual(mockMsg);
        expect(valueService.getPromiseValue).toHaveBeenCalled();
      });
    });
  });
});
