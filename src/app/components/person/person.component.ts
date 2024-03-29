import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent {
  @Input() person: Person = new Person('', '', 0, 0, 0);
  @Output() onSelectedPerson: EventEmitter<Person> = new EventEmitter<Person>();
  public imc = '';

  calcIMC() {
    this.imc = this.person.calcIMC();
  }

  selectPerson() {
    this.onSelectedPerson.emit(this.person);
  }
}
