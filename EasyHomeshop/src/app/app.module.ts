import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import{HttpClientModule} from '@angular/common/http'
import{HttpModule} from '@angular/http';

import {
  MatInputModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule, 
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule, 
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
 
} from '@angular/material';


import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CategoryComponent } from './category/category.component';
import { HeaderComponent } from './header/header.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { CategoryServiceService } from 'src/app/Services/category-service.service';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { OfferComponent } from './offer/offer.component';
import { FeedbackComponent } from './feedback/feedback.component';


const appRoutes: Routes = [
  { path: 'Login', component: LoginComponent},
  { path: 'Registration', component: RegisterComponent},
  { path: '', component:LoginComponent ,pathMatch:'full' },
  { path: '', component:LayoutComponent,
children:[    
  { path: 'Category', component:CategoryComponent},
  { path: 'SubCategory', component:SubCategoryComponent},
  { path: 'Products', component:ProductsComponent},
  { path: 'Feedback', component:FeedbackComponent},
  {path:'SpecialOffer',component:OfferComponent}
]
},
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent,
    CategoryComponent,
    HeaderComponent,
    SubCategoryComponent,
    RegisterComponent,
    ProductsComponent,
    OfferComponent,
    FeedbackComponent   
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,    
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,  
    HttpClientModule,  
    HttpModule,
    RouterModule.forRoot(
        appRoutes
      ),
    LayoutModule
  ],
  exports:[
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,   
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    
  ],
  providers: [CategoryServiceService,
    {
    provide:ErrorStateMatcher,useClass:ShowOnDirtyErrorStateMatcher,
    
  }],
  bootstrap: [AppComponent]

  
})
export class AppModule { }
