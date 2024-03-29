import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrModule } from 'ngx-toastr';
import { GeneralTitleComponent } from './components/general-title/general-title.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailComponent, GeneralTitleComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
