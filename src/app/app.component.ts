import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AboutMeComponent } from './about-me/about-me.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PortfolioComponent, AboutMeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('contentSection') sections!: QueryList<ElementRef>
  public title = 'my-portfolio';


  ngAfterViewInit(): void {
    this.intersectionObserver();
  }
  

  public navigateToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private intersectionObserver() {
    const options = {
      root: null, //relative to document viewport
      rootMargin: '0px',
      threshold: 0.25, // 25% of the element in view
    }

    const observer = new IntersectionObserver(this.handleIntersect.bind(this), options);
    console.log(this.sections);
    this.sections?.forEach(section => {
      observer.observe(section.nativeElement);
    });
  }

  private handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    // Track the number of sections in view
    const visibleSections = entries.filter(entry => entry.isIntersecting);
    const multipleInView = visibleSections.length >= 2;
  
    entries.forEach(entry => {
      const element = entry.target as HTMLElement;
      const title = element.querySelector('.title') as HTMLElement;
      const divider = element.querySelector('.divider') as HTMLElement;
      const component = element.querySelector('.component-transition') as HTMLElement;
  
      if (entry.isIntersecting) {
        const index = this.sections?.toArray().findIndex(section => section.nativeElement === entry.target);
        const titleDelay = multipleInView ? index * 1.15 : 1; // Default delay of 1s if not multiple in view
        const dividerDelay = titleDelay + .5; // Divider animation starts after title animation
        const componentDelay = dividerDelay + 1.5; // Component animation starts after divider animation
  
        if (title) {
          title.style.setProperty('--transition-delay', `${titleDelay}s`);
          title.classList.add('visible');
        }
  
        if (divider) {
          divider.style.setProperty('--divider-animation-delay', `${dividerDelay}s`);
          
          // Ensure the divider is visible and animation is triggered
          divider.classList.remove('reset');
          divider.classList.add('animate');
        }
        if (component) {
          component.style.setProperty('--component-delay', `${componentDelay}s`);
          component.classList.add('visible');
        }
      } else {
        if (title) {
          title.classList.remove('visible');
        }
        if (divider) {
          // Reset the animation
          divider.classList.remove('animate');
          divider.classList.add('reset');
        }
        if (component) {
          component.classList.remove('visible');
        }
      }
    });
  }
}
