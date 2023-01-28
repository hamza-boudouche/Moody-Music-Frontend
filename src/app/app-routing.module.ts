import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecognitionComponent } from './recognition/recognition.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { InfoComponent } from './info/info.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'recognition', component: RecognitionComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'about', component: AboutComponent },
  { path :'login',component :LoginComponent },
  { path :'register',component :RegisterComponent},
  {path : 'contact-us', component: ContactUsComponent},
  {path:'feedback', component: FeedbackComponent},
  {path:'info',component: InfoComponent},
  {path:'home',component: HomeComponent}
  
  ];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
