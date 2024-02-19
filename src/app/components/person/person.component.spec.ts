import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';
import { firstValueFrom } from 'rxjs';

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

  /* it('should contain p with "Soy un parrafo"', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const pElement = nativeElement.querySelector('p');
    expect(pElement?.textContent).toBe('Soy un parrafo');
  }); */

  it('should contain p with {{person.age}} with debugElement and By.css', () => {
    component.person = new Person('Angel', 'Hernandez', 25, 80, 170);
    //el DebugElement sirve para el server side rendering o para pruebas
    //que no necesariamente se hacen en el navegado
    const debugElement: DebugElement = fixture.debugElement;
    //By.css te permute seleccionar un elemento con una regla de css
    const pDebugElement = debugElement.query(By.css('p'));
    const pElement = pDebugElement.nativeElement;
    fixture.detectChanges();
    expect(pElement?.textContent).toContain(component.person.age);
  });

  it('should contain h3 with {{person.name}} with debugElement and By.css', () => {
    component.person = new Person('Angel', 'Hernandez', 25, 80, 170);
    const debugElement: DebugElement = fixture.debugElement;
    const h3DebugElement = debugElement.query(By.css('h3'));
    const h3Element = h3DebugElement.nativeElement;
    fixture.detectChanges();
    expect(h3Element?.textContent).toContain(component.person.name);
  });

  it('should display text when clicks on button', () => {
    // Arrange
    const expectedMsg = 'overweigth level 3';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    const buttonDebug: DebugElement = fixture.debugElement.query(
      By.css('.btn-imc')
    );
    const button: HTMLButtonElement = buttonDebug.nativeElement;

    //Act
    buttonDebug.triggerEventHandler('click');
    fixture.detectChanges();

    //Assert
    expect(button.textContent).toContain(expectedMsg);
  });

  it('should emmit person', (doneFn) => {
    const expetedPerson = new Person('Juan', 'Perez', 30, 120, 1.65);
    component.person = expetedPerson;
    const buttonDebug: DebugElement = fixture.debugElement.query(
      By.css('.btn-select')
    );
    let person: Person | undefined;

    component.onSelectedPerson.subscribe((personResult) => {
      person = personResult;
      expect(person).toEqual(expetedPerson);
      doneFn();
    });

    buttonDebug.triggerEventHandler('click');
    fixture.detectChanges();
  });
});
