import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  flipped: boolean;
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
  public readonly projects: Project[] = [
    {
      title: 'Project 1',
      description: 'Description for Project 1',
      flipped: false,
    },
    {
      title: 'Project 2',
      description: 'Description for Project 2',
      flipped: false,
    },
    {
      title: 'Project 3',
      description: 'Description for Project 3',
      flipped: false,
    },
    {
      title: 'Project 4',
      description: 'Description for Project 4',
      flipped: false,
    },
  ];

  public flipCard(project: Project): void {
    project.flipped = !project.flipped;
  }
}
