import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';
import { firstValueFrom } from 'rxjs';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService],
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for all methods', () => {
    it('should be "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });

    it('should change', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });

    it('should resolve value with done', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('my value');
        //normalmente las pruebas entienden que deben terminar en la
        //ultima linea sin embargo en casos en los que los expect acaban
        //en una callback se debe especificar que ahí es donde acaban las
        //pruebas para esto es el dondeFn
        doneFn();
      });
    });

    //se puede usar el async/await en lugar del doneFn
    it('should resolve value with async/await', async () => {
      const value = await service.getPromiseValue();
      expect(value).toBe('my value');
    });

    it('should resolve value of observable', (doneFn) => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('my value');
        doneFn();
      });
    });

    it('should return "my value"', async () => {
      const value = await firstValueFrom(service.getObservableValue());
      expect(value).toBe('my value');
    });
  });
});
