import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GradeComponent } from './components/grade/grade.component';

// Font Awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AboutComponent } from './components/about/about.component';
import { GradesViewComponent } from './components/grades-view/grades-view.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { CoursesDataComponent } from './components/courses-data/courses-data.component';
import { BasicStudentDataComponent } from './components/basic-student-data/basic-student-data.component';
library.add(faMinus);
library.add(faPlus);

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        GradeComponent,
        AboutComponent,
        GradesViewComponent,
        CourseAddComponent,
        CoursesDataComponent,
        BasicStudentDataComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgbModule.forRoot(),
        RouterModule.forRoot(routes),
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
