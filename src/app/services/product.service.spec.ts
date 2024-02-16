import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { generateManyProducts } from '../models/product.mock';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let controller: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    productsService = TestBed.inject(ProductsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  describe('getAllSimple', () => {
    const productsMock: Product[] = generateManyProducts(2);
    it('should have two products', (doneFn) => {
      productsService.getAllSimple().subscribe((products) => {
        expect(products.length).toBe(productsMock.length);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products`;
      const testRequest = controller.expectOne(url);
      testRequest.flush(productsMock);
      controller.verify();
    });
  });

  describe('getAll', () => {
    it('should have two products', (doneFn) => {
      const productsMock: Product[] = generateManyProducts(2);
      productsService.getAll().subscribe((products) => {
        expect(products.length).toBe(productsMock.length);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products`;
      const testRequest = controller.expectOne(url);
      testRequest.flush(productsMock);
      controller.verify();
    });

    it('should return taxes', (doneFn) => {
      const productsMock: Product[] = generateManyProducts(2).map(
        (product, index) => ({
          ...product,
          price: index % 2 === 0 ? 100 : 200,
        })
      );
      productsService.getAll().subscribe((products) => {
        expect(products[0].taxes).toBe(19);
        expect(products[1].taxes).toBe(38);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products`;
      const testRequest = controller.expectOne(url);
      testRequest.flush(productsMock);
      controller.verify();
    });
  });
});
