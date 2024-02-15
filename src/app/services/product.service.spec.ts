import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let controller: HttpTestingController;
  const productsMock: Product[] = [
    {
      id: '1',
      title: 'product 1',
      price: 100,
      description: 'description 1',
      category: {
        id: 1,
        name: 'category 1',
      },
      images: [
        'https://img.uswitch.com/n36b8lzdmgnp/6flMYPMjJ0sZzNs16Fsqa/c525a3f838b0e62716631f003390506b/shutterstock_1736005427212121212.jpg?auto=format%2Ccompress&q=35&ixlib=react-9.5.1-beta.1',
        'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/02/hipertextual-samsung-galaxy-a51-2020945736.jpg?resize=800%2C600&quality=50&strip=all&ssl=1',
      ],
    },
    {
      id: '2',
      title: 'product 2',
      price: 200,
      description: 'description 2',
      category: {
        id: 2,
        name: 'category 2',
      },
      images: [
        'https://m-cdn.phonearena.com/images/article/64576-wide-two_1200/The-Best-Phones-to-buy-in-2023---our-top-10-list.jpg',
        'https://www.todoparaelhogar.net/wp-content/uploads/2023/09/mejores-marcas-de-celulares-800x533.jpg',
      ],
    },
  ];
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
      const url = `${environment.API_URL}/api/v1/products`;
      const testRequest = controller.expectOne(url);
      testRequest.flush(productsMock);
      controller.verify();
    });
  });
});
