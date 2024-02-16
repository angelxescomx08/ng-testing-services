import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { CreateProductDTO, Product } from '../models/product.model';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';

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

  afterEach(() => {
    //verificar que no quede ninguna request pendiente y que la peticiones
    //esten correctas
    controller.verify();
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
    });

    it('should have limit and offset', (doneFn) => {
      const limit = 3;
      const offset = 2;
      const productsMock: Product[] = generateManyProducts(10);
      productsService.getAll(limit, offset).subscribe((products) => {
        expect(products.length).toBe(productsMock.length);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const testRequest = controller.expectOne(url);
      testRequest.flush(productsMock);
      const params = testRequest.request.params;
      expect(params.get('limit')).toBe(`${limit}`);
      expect(params.get('offset')).toBe(`${offset}`);
    });
  });

  describe('create', () => {
    it('should return observable product', (doneFn) => {
      const dto: CreateProductDTO = {
        categoryId: 1,
        description: '',
        images: [],
        price: 120,
        title: 'title',
        taxes: 19,
      };
      const mockProduct = generateOneProduct();
      productsService.create(dto).subscribe((product) => {
        expect(product).toEqual(mockProduct);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products`;
      const resquestTest = controller.expectOne(url);
      resquestTest.flush(mockProduct);
      expect(resquestTest.request.body).toEqual(dto);
      expect(resquestTest.request.method).toBe('POST');
    });
  });

  describe('update', () => {
    it('should return observable product', (doneFn) => {
      const id = '1';
      const dto: CreateProductDTO = {
        categoryId: 1,
        description: '',
        images: [],
        price: 120,
        title: 'title',
        taxes: 19,
      };
      const mockProduct = generateOneProduct();
      productsService.update(id, dto).subscribe((product) => {
        expect(product).toEqual(mockProduct);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const resquestTest = controller.expectOne(url);
      resquestTest.flush(mockProduct);
      expect(resquestTest.request.body).toEqual(dto);
      expect(resquestTest.request.method).toBe('PUT');
    });
  });

  describe('delete', () => {
    it('should return observable boolean', (doneFn) => {
      const id = '1';
      const mockBoolean = false;
      productsService.delete(id).subscribe((result) => {
        expect(result).toEqual(mockBoolean);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const resquestTest = controller.expectOne(url);
      resquestTest.flush(mockBoolean);
      expect(resquestTest.request.method).toBe('DELETE');
    });
  });
});
