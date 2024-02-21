import { Component, OnInit } from '@angular/core';
import { HighligthDirective } from '../../directives/highligth.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss'],
  standalone: true,
  imports: [HighligthDirective, FormsModule],
})
export class OthersComponent implements OnInit {
  color = 'blue';
  constructor() {}

  ngOnInit(): void {}
}
