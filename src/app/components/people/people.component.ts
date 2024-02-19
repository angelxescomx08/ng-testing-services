import { Component } from '@angular/core';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [PersonComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent {
  person: Person = new Person('Name', 'LastName', 30, 80, 1.69);
}
