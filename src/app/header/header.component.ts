import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Host, HostListener, output, signal, ViewChild, WritableSignal } from '@angular/core';

interface NavItems {
  label: string;
  id: string;
}

interface HeaderTitle {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('headerContainer') headerContainer!: ElementRef;

  public sectionChanged = output<string>();
  public isOverlayVisible = false;

  public headerContent: HeaderTitle = {
    title: 'Rey Garcia',
    subtitle: 'Pixel wizard',
  };

  public navList: NavItems[] = [
    {label:'About me', id: 'aboutMe'},
    {label: 'Portfolio', id: 'portfolio'},
    {label: 'Contact me', id: 'contactMe'},
    {label: 'Experience', id: 'experience'}
  ];

  ngAfterViewInit(): void {
    this.onWindowScroll();
  }

  public emitSectionToNavigateTo(sectionId: string): void {
    this.isOverlayVisible = false;
    this.sectionChanged.emit(sectionId);
  }
  @HostListener('window:scroll', [])
  private onWindowScroll(): void {
    if (window.scrollY > 0) {
      this.headerContainer.nativeElement.classList.add('scrolled');
    } else {
      this.headerContainer.nativeElement.classList.remove('scrolled');
    }
  }
}
