import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import{Router}from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnDestroy {
 
  mobileQuery: MediaQueryList;  
    fillerNav = Array.from({length:5}, (_, i) => `Nav Item ${i + 1}`);
  
    private _mobileQueryListener: () => void;  
    constructor(private router:Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    };
  
    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    };
  
   Logout()
   {
    this.router.navigate(['/Login']);
   };
    
}
