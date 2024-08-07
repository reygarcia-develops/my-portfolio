import { ChangeDetectionStrategy, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';

interface Project {
  title: string;
  summary: string[];
  active: boolean;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  @ViewChildren('card') cards!: QueryList<ElementRef>;

  public readonly projects: Project[] = [
    {
      title: 'Bloomsflowers',
      summary: ['Created a PCI complient E-Commerce website for H-E-B flowers. This was built using Java, utilizing the Spring framework, and AnguarJs. Our team was the first to introduce AngularJS to H-E-B as well as pilot the Agile methodology using Scrum.',
      'Along the way, I learned how to create and manage integrations using Tibco BusinessWorks.',
      ],
      active: false,
    },
    {
      title: 'Project 2',
      summary: ['Description for Project 2'],
      active: false,
    },
    {
      title: 'Project 3',
      summary: ['Description for Project 3'],
      active: false,
    },
    {
      title: 'Project 4',
      summary: ['Description for Project 4'],
      active: false,
    },
  ];
  constructor(private renderer: Renderer2) {}

  public toggleActive(project: Project): void {
    project.active = !project.active;
  }

  public addAnimateToPortfolioCards(): void {
    this.cards.forEach((card) => {
      this.renderer.addClass(card.nativeElement, 'animate');
    });
  }
}
