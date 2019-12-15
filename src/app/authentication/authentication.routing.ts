import { Routes } from '@angular/router';
import { NotfoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ECollectionDataComponent } from './e-collection-data/e-collection-data.component';
import { AppDetailsComponent } from './app-details/app-details.component'
import { ProductPageComponent} from './product-page/product-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CatalogComponent } from './catalog/catalog.component'
import { ProfileComponent } from './profile/profile.component'
import {UserProfileComponent} from './user-profile/user-profile.component';
import { MappingComponent } from './mapping/mapping.component';
import { MakerPageComponent } from './maker-page/maker-page.component';
import { AppStatusComponent } from './app-status/app-status.component';
import { MakerDetailsComponent } from './maker-details/maker-details.component';
import { UserAppDetailsComponent } from './user-app-details/user-app-details.component';
import { IsurePayMappingComponent } from './isure-pay-mapping/isure-pay-mapping.component';
import { IsurepayMapping2Component } from './isurepay-mapping2/isurepay-mapping2.component';
import { Mapping2Component } from './mapping2/mapping2.component';
import { Mapping3Component } from './mapping3/mapping3.component';
import { Mapping4Component } from './mapping4/mapping4.component';
import { Mapping5Component } from './mapping5/mapping5.component';
import { Mapping6Component } from './mapping6/mapping6.component';
import { CheckerPageComponent } from './checker-page/checker-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {CmsComponentComponent} from './cms-component/cms-component.component';
import { MakerDetailsPageComponent } from './maker-details-page/maker-details-page.component';

/**
   * @author Sanchita 
   * @description Routinng Defined for signUp login
   */
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'reset',
        component: ResetPasswordComponent
      },
      {
        path: 'mapping',
        component: MappingComponent
      },
      {
        path: 'Mapping-2',
        component: Mapping2Component
      },
      {
        path: 'Mapping-3',
        component: Mapping3Component
      },
      {
        path: 'Mapping-4',
        component: Mapping4Component
      },
      {
        path: 'Mapping-5',
        component: Mapping5Component
      },
      {
        path: 'Mapping-6',
        component: Mapping6Component
      },
      {
        path:'iSurePay-1',
        component:IsurePayMappingComponent
      },
      {
        path:'iSurePay-2',
        component:IsurepayMapping2Component
      },
      
      {
        path:'userAppDetails',
        component:UserAppDetailsComponent
      },
      {
        path:'makerPage',
        component:MakerDetailsPageComponent
      },
      {
        path: 'appDetails',
        component: AppDetailsComponent
      },
      {
        path: 'Profile',
        component: ProfileComponent
      },
      {
        path:'production',
        component:CmsComponentComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
      {
        path: 'Catalog',
        component: CatalogComponent
      },
      {
        path:'Checker',
        component:MakerPageComponent
      },
      {
        path:'Maker',
        component:CheckerPageComponent
      },
      {
        path:'Product',
        component: ProductPageComponent
      },
      {
        path:'makerDetails',
        component: MakerDetailsComponent
      },
      {
        path:'appStatus',
        component: AppStatusComponent
      },
      {
        path: '404',
        component: NotfoundComponent
      },

      {
        path: 'login',
        component: LoginComponent
      },
      {
        path:'landingPage',
        component:LandingPageComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path:'Data1',
        component:ECollectionDataComponent
      },
      {
        path:'Home',
        component:HomepageComponent
      }
    ]
  }
];
