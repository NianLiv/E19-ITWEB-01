import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
  @Input() exercises!: Exercise[];
  displayedColumns: string[] = ['name', 'description', 'sets', 'times'];

  constructor() { }

  ngOnInit() {
  }

}
