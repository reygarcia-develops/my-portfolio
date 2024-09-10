import { ChangeDetectionStrategy, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';

interface Project {
  title: string;
  summary: string[];
  tools: string[];
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

  private animationTriggered: boolean = false;

  public readonly projects: Project[] = [
    {
      title: 'Coupon Management System',
      summary: ['Enhanced the CMS to manage coupons in groups, simplifying the editing process for partners.'],
      tools: ['Java', 'Spring', 'Jquery'],
    },
    {
      title: 'Bloomsflowers',
      summary: [
        'Developed a PCI-compliant E-Commerce site for H-E-B flowers. Our team pioneered AngularJS at H-E-B and introduced Scrum-based Agile methodologies.',
      ],
      tools: ['AngularJS', 'Java', 'Spring', 'TibcoBW'],
    },
    {
      title: 'Pricing Analytical Tool',
      summary: [
        'Assisted with the Angular 2 to 5 migration and established best practices for the project',
      ],
      tools: ['Angular', 'Java', 'Spring',]
    },
    {
      title: 'Supplier Universal Registry',
      summary: ['Developed an API system to replace a legacy system, establishing SPUR as the primary source of supplier data for H-E-B.'],
      tools: ['Haskell']
    },
    {
      title: 'Hivemind',
      summary: ['Partner-facing application for H-E-B that aggregates data from internal APIs to streamline order viewing, transfer creation, purchase orders, and more.'],
      tools: ['Angular', 'NestJS', 'Python', 'GraphQL']
    },
    {
      title: 'BeeBot',
      summary: [
        'A personal project slack bot developed to assist internal teams by providing insights into merge requests and streamlining deployments. BeeBot supports multiple teams, enhancing efficiency and transparency in the process.'
      ],
      tools: ['Express', 'SlackBolt']
    },
  ];
  
  constructor(private renderer: Renderer2) {}

  public addAnimateToPortfolioCards(): void {
    if (this.animationTriggered) {
      return;
    }
    this.cards.forEach((card) => {
      this.renderer.addClass(card.nativeElement, 'animate');
      // Listen for the animationend event to remove the animate class
      // This is to prevent the .animate class conflicting with the :hover state transform.
      this.renderer.listen(card.nativeElement, 'animationend', () => {
        this.renderer.setStyle(card.nativeElement, 'opacity', '1');
        this.renderer.removeClass(card.nativeElement, 'animate');
      });
    });
    this.animationTriggered = true;
  }
}
