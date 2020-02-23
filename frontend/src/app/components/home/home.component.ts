import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Landmark} from "../../models/landmark.model";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    public landmarks: Landmark[];
    public showModal: boolean;
    public modalImage: string;
    public modalCaption: string;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.getLandmarks();
        this.showModal = false;
        this.modalImage = '';
        this.modalCaption = '';
    }

    getLandmarks(): void {
        this.apiService.getLandmarks().subscribe(landmarks => {
            this.landmarks = landmarks;
        });
    }

    toggleModal(image, caption): void {
        this.showModal = !this.showModal;
        this.modalImage = image;
        this.modalCaption = caption;
    }
}
