import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import {GuestStudentListComponent} from './components/guest-student-list/guest-student-list.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { StudentGradesViewComponent } from './components/student-grades-view/student-grades-view.component';
import { StudentGradesListComponent } from './components/student-grades-list/student-grades-list.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { CourseinfoAddComponent } from './components/courseinfo-add/courseinfo-add.component';
library.add(faMinus);
library.add(faPlus);

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'admin', component: AdminComponent }
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
        BasicStudentDataComponent,
        StudentsListComponent,
        StudentAddComponent,
        AdminComponent,
        LoginComponent,
        GuestStudentListComponent,
        StudentViewComponent,
        StudentGradesViewComponent,
        StudentGradesListComponent,
        AutofocusDirective,
        CourseinfoAddComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes),
        FontAwesomeModule,
        NgbModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [LoginComponent, CourseinfoAddComponent]
})
export class AppModule { }
