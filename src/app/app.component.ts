import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuOpen = true;
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  innerWidth;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.menuRs();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.menuRs();
  }

  onLogoutclick() {
    this.authService.logout();
    this.flashMessage.show('You are now logged out', {cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
  }

  menuRs() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 768) {
      this.menuOpen = false;
    } else {
      if (this.menuOpen === false) { return; }
      this.menuOpen = true;
    }
  }


}
