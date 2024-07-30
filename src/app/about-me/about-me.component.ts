import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent {
  public readonly summary: string[] = [
    "Hello! I'm Rey Garcia, a full-stack developer with over 10 years of experience in the industry. Throughout my career, I’ve had the opportunity to work with a wide range of technologies. In addition to being a software engineer, I also balance life as a husband and father.",
    "I began my journey at H-E-B right after college, and since then, I’ve accumulated valuable experience. My passion lies in creating innovative and user-friendly solutions that make a positive impact. Whether it's developing responsive web applications, optimizing backend processes, or ensuring seamless user experiences, I strive to deliver excellence in every project I undertake.",
    "Fast forward to today, I’ve had the privilege of being part of a team that helped sideline one of our mainframe systems, modernizing our infrastructure and enhancing efficiency. This experience has deepened my understanding of system architecture and the importance of scalable solutions.",
    "I hope this has piqued your interest. Let’s connect and explore how we can create impactful solutions together!"
  ];
}
