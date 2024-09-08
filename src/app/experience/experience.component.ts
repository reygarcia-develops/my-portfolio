import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, ViewChildren, QueryList, AfterViewInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  selectedCategory = 'languages'; // Default selected category

  categories = [
    {
      name: 'languages',
      skills: ['JavaScript', 'Python', 'TypeScript']
    },
    {
      name: 'frameworks',
      skills: ['Angular', 'React', 'Vue']
    },
    {
      name: 'tools',
      skills: ['Docker', 'Git', 'Webpack']
    },
    {
      name: 'design',
      skills: ['Photoshop', 'Figma', 'Sketch']
    }
  ];

  @ViewChildren('skillsList') skillsLists!: QueryList<ElementRef>;

  public selectCategory(category: string = 'languages') {
    this.selectedCategory = category;
  }
}