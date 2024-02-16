import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain p with "Soy un parrafo"', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const pElement = nativeElement.querySelector('p');
    expect(pElement?.textContent).toBe('Soy un parrafo');
  });

  it('should contain p with "Soy un parrafo" with debugElement and By.css', () => {
    //el DebugElement sirve para el server side rendering o para pruebas
    //que no necesariamente se hacen en el navegado
    const debugElement: DebugElement = fixture.debugElement;
    //By.css te permute seleccionar un elemento con una regla de css
    const pDebugElement = debugElement.query(By.css('p'));
    const pElement = pDebugElement.nativeElement;
    expect(pElement?.textContent).toBe('Soy un parrafo');
  });

  it('should contain h3 with "Hola" with debugElement and By.css', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const h3DebugElement = debugElement.query(By.css('h3'));
    const h3Element = h3DebugElement.nativeElement;
    expect(h3Element?.textContent).toBe('Hola');
  });
});
