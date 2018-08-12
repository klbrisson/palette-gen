import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsComponent } from './components/forms/forms.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutComponent } from './components/layout/layout.component';
import { IndicatorsComponent } from './components/indicators/indicators.component';
import { ModalsComponent } from './components/modals/modals.component';
import { TablesComponent } from './components/tables/tables.component';
import { ThemeService } from './services/theme-service/theme.service';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    NavigationComponent,
    LayoutComponent,
    IndicatorsComponent,
    ModalsComponent,
    TablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
