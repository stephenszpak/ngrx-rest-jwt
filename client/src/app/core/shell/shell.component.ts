import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Title } from '@angular/platform-browser';
import { sidenavIsOpen, State } from '../../state';
import { HideSidenav, ShowSidenav } from '../../state/shared/sidenav/sidenav.actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Component({
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  opened: Observable<boolean>;
  currentUser: any;

  constructor(
    private titleService: Title,
    private media: ObservableMedia,
    private store: Store<State>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.opened = this.store.pipe(select(sidenavIsOpen));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  closeSidenav() {
    this.store.dispatch(new HideSidenav());
  }

  openSidenav() {
    this.store.dispatch(new ShowSidenav());
  }

  logout() {
    this.closeSidenav();
    this.authService.logout();
  }

  toggleSidenav() {
    this.opened.pipe(first()).subscribe(open => {
      if (open) {
        return this.closeSidenav();
      }
      this.openSidenav();
    });
  }
}
