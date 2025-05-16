import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactInfo = {
    phone: '+7 777 777 77 77',
    email: 'carrental@gmail.com',
    address: 'Tole Bi 59(KBTU)'
  };

  message = {
    name: '',
    email: '',
    text: ''
  };

  isSubmitted = false;

  sendMessage() {
    console.log('Message sent:', this.message);
    this.isSubmitted = true;
    // Здесь будет логика отправки сообщения
    setTimeout(() => {
      this.isSubmitted = false;
      this.message = { name: '', email: '', text: '' };
    }, 3000);
  }
}
