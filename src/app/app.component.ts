import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public title = 'my-portfolio';

  public readonly summary: string[] = [
    "Hello! I'm Rey Garcia, a full-stack developer with over 10 years of experience in the industry. Throughout my career, I’ve had the opportunity to work with a wide range of technologies. In addition to being a software engineer, I also balance life as a husband and father.",
    "I began my journey at H-E-B right after college, and since then, I’ve accumulated valuable experience. My passion lies in creating innovative and user-friendly solutions that make a positive impact. Whether it's developing responsive web applications, optimizing backend processes, or ensuring seamless user experiences, I strive to deliver excellence in every project I undertake.",
    "Fast forward to today, I’ve had the privilege of being part of a team that helped sideline one of our mainframe systems, modernizing our infrastructure and enhancing efficiency. This experience has deepened my understanding of system architecture and the importance of scalable solutions.",
    "I hope this has piqued your interest. Let’s connect and explore how we can create impactful solutions together!"
  ];

  public  navigateToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
