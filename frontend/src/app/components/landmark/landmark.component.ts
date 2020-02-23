import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {Landmark} from "../../models/landmark.model";
import {AlertService} from 'ngx-alerts';

@Component({
    selector: 'app-landmark',
    templateUrl: './landmark.component.html',
    styleUrls: ['./landmark.component.css']
})
export class LandmarkComponent implements OnInit {
    public landmark: Landmark;
    public editing: boolean;
    public uploading: boolean;

    constructor(private apiService: ApiService,
                private alertService: AlertService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.editing = false;
        this.uploading = false;
        this.getLandmark();
    }

    getLandmark(): void {
        const id = this.route.snapshot.params.id;
        this.apiService.getLandmarkById(id).subscribe((landmark: Landmark) => {
            this.landmark = landmark;
        }, (error) => {
            this.alertService.danger(error.error.message);
        });
    }

    toggleEditing(): void {
        this.editing = !this.editing;
    }

    saveChanges(): void {
        this.apiService.updateLandmark(this.landmark).subscribe((landmark: Landmark) => {
            this.landmark = landmark;
            this.editing = false;
            this.alertService.success("Article updated!");
        }, (error) => {
            this.alertService.danger(error.error.message);
        });
    }

    discardChanges(): void {
        this.getLandmark();
        this.toggleEditing();
    }

    onFileChanged(event) {
        this.uploading = true;
        this.landmark.image_file = event.target.files[0];
        this.apiService.updateLandmark(this.landmark).subscribe((landmark: Landmark) => {
            this.landmark = landmark;
            this.alertService.success("Image updated!");
            this.uploading = false;
        }, (error) => {
            this.alertService.danger(error.error.message);
            this.uploading = false;
        });
    }
}
