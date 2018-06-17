import { Component } from '@angular/core';
import { UserService } from './services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor(private userService: UserService, private modalService: NgbModal) {}

    openModal(): boolean
    {
        this.modalService.open(LoginComponent);
        return false;
    }
}
