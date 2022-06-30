import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './household-form.component.html',
  styleUrls: ['./household-form.component.scss'],
})
export class HouseholdFormComponent implements OnInit {
  form!: string;

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => (this.form = params['form']));
  }

  getI18nSectionName(section: string) {
    return 'HOUSEHOLD.SECTION.' + section.replace(/-/g, '_').toUpperCase();
  }
}
