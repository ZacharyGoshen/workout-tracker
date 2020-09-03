import { Component, OnInit, Input } from '@angular/core';
import { SetPlan } from '../../models/set-plan';

@Component({
  selector: 'app-set-plan',
  templateUrl: './set-plan.component.html',
  styleUrls: ['./set-plan.component.css']
})
export class SetPlanComponent implements OnInit {

  @Input() setPlan: SetPlan;

  constructor() { }

  ngOnInit() {
  }

}
