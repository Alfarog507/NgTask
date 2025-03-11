import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
})
export class GoogleButtonComponent implements OnInit {
  @Output() onClick = new EventEmitter<void>();
  buttonText: string = 'Sign Up with Google';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      if (url.some((segment) => segment.path === 'sign-in')) {
        this.buttonText = 'Sign In with Google';
      } else if (url.some((segment) => segment.path === 'sign-up')) {
        this.buttonText = 'Sign Up with Google';
      }
    });
  }
}
