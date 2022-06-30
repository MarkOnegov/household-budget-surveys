import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './update-household.component.html',
  styleUrls: ['./update-household.component.scss'],
})
export class UpdateHouseholdComponent implements OnInit {
  urlValues?: { [name: string]: string };
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['household'];
      this.urlValues = id === 'new' ? undefined : { id };
    });
  }
}
