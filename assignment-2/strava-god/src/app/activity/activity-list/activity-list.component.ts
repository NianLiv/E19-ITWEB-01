import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  activities$ = this.activityService.activities$;

  displayedColumns = ['workoutTitle', 'comment', 'created'];

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.activityService.getActivities().subscribe();
  }
}
