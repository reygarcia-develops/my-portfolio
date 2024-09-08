import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { AboutMeComponent } from './about-me/about-me.component';
import { HeaderComponent } from './header/header.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ContactInfoComponent } from "./contact-info/contact-info.component";
import { ExperienceComponent } from './experience/experience.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PortfolioComponent, AboutMeComponent, CommonModule, WelcomeComponent, ContactInfoComponent, ExperienceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('contentSection') sections!: QueryList<ElementRef>
  @ViewChild(AboutMeComponent) aboutMe!: AboutMeComponent;
  @ViewChild(PortfolioComponent) portfolio!: PortfolioComponent;
  @ViewChild(ExperienceComponent) experience!: ExperienceComponent;


  constructor(private router: Router) {}

  ngOnInit() {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   window.scrollTo({ top: 0, behavior: 'smooth' });
    // });
  }

  ngAfterViewInit(): void {
    if (window.scrollY !== 0) {
      // Delay the execution to allow scroll to complete
      setTimeout(() => {
        // Ensure the DOM is updated before running IntersectionObserver
        requestAnimationFrame(() => {
          this.intersectionObserver();
        });
      }, 700);
    } else {
      this.intersectionObserver();
    }
  }
  
  public navigateToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  private intersectionObserver() {
    let threshold = .1;
    if (window.innerWidth >= 875) {
      threshold = .25;
    }
    const options = {
      root: null, //relative to document viewport
      threshold: threshold,
    }

    const observer = new IntersectionObserver(this.handleIntersect.bind(this), options);
    this.sections?.forEach((section, index) => {
      const divider = section.nativeElement.querySelector('.divider') as HTMLElement;
      if (divider) {
        divider.setAttribute('data-divider-id', `divider-${index}`);
      }
      observer.observe(section.nativeElement);
    });
  }

  private handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      const element = entry.target as HTMLElement;
      const title = element.querySelector('.title') as HTMLElement;
      const divider = element.querySelector('.divider') as HTMLElement;
  
      if (entry.isIntersecting) {
        const titleDelay = .5; 
        const dividerDelay = titleDelay + .5;
  
        if (title) {
          title.style.setProperty('--title-delay', `${titleDelay}s`);
          title.classList.add('animate');
        }
  
        if (divider) {
          divider.style.setProperty('--divider-animation-delay', `${dividerDelay}s`);

          // Ensure the divider is visible and animation is triggered
          divider.classList.add('animate');
        }
        
        switch (element.id) { 
          case 'aboutMe': {
            this.aboutMe.addAnimateToContent();
            break;
          }
          case 'portfolio': {
            this.portfolio.addAnimateToPortfolioCards();
            break;
          }
          case 'experience': {
            this.experience.selectCategory();
          }
        }
      }
    });
  }
}
