import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  features = [
    {
      title: 'Quality Service',
      description: 'We maintain our vehicles to the highest standards and offer exceptional customer support.',
      icon: 'fa-car'
    },
    {
      title: 'Customer First',
      description: 'Your satisfaction is our top priority. We strive to exceed your expectations.',
      icon: 'fa-users'
    },
    {
      title: '24/7 Support',
      description: 'Our support team is available around the clock to assist you.',
      icon: 'fa-headset'
    },
    {
      title: 'Safety First',
      description: 'All our vehicles undergo regular safety inspections and maintenance.',
      icon: 'fa-shield-alt'
    }
  ];
}
