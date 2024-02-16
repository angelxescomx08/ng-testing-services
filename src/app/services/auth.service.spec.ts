import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should ', (doneFn) => {
      const mockAuth: Auth = {
        access_token: '123',
      };
      const email = 'john@doe.com';
      const password = 'abc123';
      //callThrough espiara pero no ejecutara el código
      spyOn(tokenService, 'saveToken').and.callThrough();
      authService.login(email, password).subscribe((auth) => {
        expect(mockAuth).toEqual(auth);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('123');
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const testRequest = httpController.expectOne(url);
      testRequest.flush(mockAuth);
    });
  });
});
