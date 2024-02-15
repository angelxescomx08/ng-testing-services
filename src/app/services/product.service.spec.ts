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
    it('should have two products', (doneFn) => {
      productsService.getAllSimple().subscribe((products) => {
        expect(products.length).toBe(2);
        doneFn();
      });
      const productsMock: Product[] = generateManyProducts(2);
      const url = `${environment.API_URL}/api/v1/products`;
      const testRequest = controller.expectOne(url);
      testRequest.flush(productsMock);
      controller.verify();
    });
  });
});
