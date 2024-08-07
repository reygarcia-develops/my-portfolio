import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements AfterViewInit {
  @ViewChild('mainMessage') mainMessageRef!: ElementRef;
  @ViewChild('subMessage') subMessageRef!: ElementRef;

  public message: string = 'Hi!';

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const mainMessageEl = this.mainMessageRef.nativeElement;
    const subMessageEl = this.subMessageRef.nativeElement;
    mainMessageEl.addEventListener('animationend', (event: AnimationEvent) => {
      if (event.animationName.includes('final-typing')) {
        this.renderer.addClass(mainMessageEl, 'visible');
        this.renderer.addClass(subMessageEl, 'visible');
      } else if (event.animationName.includes('delete')) {
        this.message = 'Welcome';
        mainMessageEl.textContent = this.message;
        this.renderer.removeClass(mainMessageEl, 'typing');
        this.renderer.removeClass(mainMessageEl, 'deleting');
        this.renderer.addClass(mainMessageEl, 'final-typing');
      } else {
        this.renderer.addClass(mainMessageEl, 'deleting');
      }
    });

    this.renderer.addClass(mainMessageEl, 'typing');
  }
}
