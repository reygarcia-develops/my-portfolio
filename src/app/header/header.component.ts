import { ChangeDetectionStrategy, Component, output } from '@angular/core';

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
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  sectionChanged = output<string>();

  public headerContent: HeaderTitle = {
    title: 'Rey Garcia',
    subtitle: 'Code whisperer',
  };

  public navList: NavItems[] = [
    {label:'About me', id: 'aboutMe'},
    {label: 'Portfolio', id: 'portfolio'},
    {label: 'Contact me', id: 'contactMe'},
    {label: 'Experience', id: 'experience'}
  ];

  public emitSectionToNavigateTo(sectionId: string): void {
    this.sectionChanged.emit(sectionId);
  }
}
