import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoComponent {
  public email = 'reygarcia.develops@gmail.com'

}
