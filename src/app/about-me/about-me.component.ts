import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent {
  @ViewChild('imageContent') imageContent!: ElementRef;
  @ViewChildren('paragraph') paragraphs!: ElementRef[];

  public readonly summary: string[] = [
    "Hello! I'm Rey Garcia, a full-stack developer with over 10 years of experience in the industry. Throughout my career, I’ve had the opportunity to work with a wide range of technologies. In addition to being a software engineer, I also balance life as a husband and father.",
    "I began my journey at H-E-B right after college, and since then, I have accumulated valuable experience. My passion lies in creating innovative and user-friendly solutions that make a positive impact. Whether it is developing responsive web applications, optimizing backend processes, or ensuring seamless user experiences, I strive to deliver excellence in every project I undertake.",
    "Fast forward to today, I have had the privilege of being part of a team that first introduced Angular 1 to H-E-B to build an e-commerce site for flowers. I have also worked on optimizing coupon management, creating a new API for managing supplier data in Haskell, and developing a full-stack application to transition business users from the mainframe to a modern solution. This experience has deepened my understanding of system architecture and the importance of scalable solutions.",
    "I hope this has piqued your interest. Let’s connect and explore how we can create impactful solutions together!"
  ];

  public addAnimateToContent(): void {
    this.imageContent.nativeElement.classList.add('animate');
    this.paragraphs.forEach(paragraph => paragraph.nativeElement.classList.add('animate'));
  }
}
