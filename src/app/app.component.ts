import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent } from 'rxjs';

import { AboutMeComponent } from './about-me/about-me.component';
import { HeaderComponent } from './header/header.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PortfolioComponent, AboutMeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
@UntilDestroy()
export class AppComponent implements AfterViewInit {
  @ViewChildren('contentSection') sections!: QueryList<ElementRef>
  public title = 'my-portfolio';

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (window.scrollY !== 0) {
      this.disableSmoothScroll();
      window.scrollTo({ top: 0, behavior: 'auto' });

      setTimeout(() => {
        this.enableSmoothScroll();

        if (window.scrollY === 0) {
          this.intersectionObserver();
        } else {
          fromEvent(window, 'scroll')
            .pipe(
              untilDestroyed(this),
              filter(() => window.scrollY === 0)
            )
            .subscribe(() => {
              this.intersectionObserver();
            });
        }
      }, 0);
    } else {
      this.intersectionObserver();
    }
  }

  private onScrollToTop() {
    if (window.scrollY === 0) {
      window.removeEventListener('scroll', this.onScrollToTop.bind(this));
      this.intersectionObserver();
    }
  }
  

  public navigateToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      const component = element.querySelector('.component-transition') as HTMLElement;
  
      if (entry.isIntersecting) {
        const index = this.sections?.toArray().findIndex(section => section.nativeElement === entry.target);
        const titleDelay = index === 0 ? 1.8 : .5; 
        const dividerDelay = titleDelay + .5;
        const componentDelay = dividerDelay + .6; 
  
        if (title) {
          title.style.setProperty('--title-delay', `${titleDelay}s`);
          title.classList.add('animate');
        }
  
        if (divider) {
          divider.style.setProperty('--divider-animation-delay', `${dividerDelay}s`);

          // Ensure the divider is visible and animation is triggered
          divider.classList.add('animate');
        }
        if (component) {
          component.style.setProperty('--component-delay', `${componentDelay}s`);
          component.classList.add('visible');
        }
      }
    });
  }

  private disableSmoothScroll() {
    this.renderer.setStyle(document.body, 'scroll-behavior', 'auto');
  }

  private enableSmoothScroll() {
    this.renderer.setStyle(document.body, 'scroll-behavior', 'smooth');
  }
}
