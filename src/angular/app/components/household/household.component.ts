import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseholdProgress } from 'src/common/types/household.types';
import { HouseholdsService } from '../../services/households.service';

@Component({
  templateUrl: './household.component.html',
  styleUrls: ['./household.component.scss'],
})
export class HouseholdComponent implements OnInit {
  progress: HouseholdProgress | undefined = undefined;
  displayedColumns = ['section', 'progress'];

  //FIXME:
  private sections = [
    'section-1',
    'section-2',
    'section-3',
    'section-4',
    'section-5',
    'section-6',
    'section-7',
    'section-8',
    'section-9',
    'section-10',
    'section-11',
  ];

  constructor(
    private router: ActivatedRoute,
    private householdsService: HouseholdsService,
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) =>
      this.householdsService.getProgress(params['id']).subscribe((progress) => {
        let sections = [...this.sections];
        progress.forms.forEach(
          ({ name }) =>
            (sections = sections.filter((section) => section !== name)),
        );
        sections.forEach((section) =>
          progress.forms.push({ done: false, name: section, progress: -1 }),
        );
        this.progress = progress;
      }),
    );
  }

  getI18nSectionName(section: string) {
    return 'HOUSEHOLD.SECTION.' + section.replace(/-/g, '_').toUpperCase();
  }
}
