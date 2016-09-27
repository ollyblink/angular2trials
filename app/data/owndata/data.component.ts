import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from "./data.service";
import {Data} from "../../models/data";

@Component({
  selector: 'own-data',
  templateUrl: 'app/data/owndata/data.component.html',
  styleUrls: ['app/data/owndata/data.component.css'],
  providers: [DataService]
})
export class DataComponent implements OnInit {
  private user: string;
  private spirometryData: Data[] = [];
  private isAddItemShown: boolean = false;
  private message: string = "";
  private dataItem = new Data("", "", null, null);


  constructor(private router: Router, private dataService: DataService) {
  }

  public getOwnData(): void {
    this.dataService.getOwnData().then(json => {
      this.user = json.user;
      this.spirometryData = json.spirometryData;
    });
  }

  public deleteDataItem(title: string): void {
    this.message = title;
    this.dataService.deleteDataItem(title).then(message => {
      this.message = message;
      //reload
      this.getOwnData();
    });
  }

  public showAddItem(): void {
    this.isAddItemShown = (this.isAddItemShown == false ? true : false);
  }

  public addDataItem(): void {
    if (localStorage.getItem('user')) {
      this.dataService.addDataItem(this.dataItem).then(message => {
        this.message = message;
        //reload
        this.getOwnData();
      });
    }
  }

  public showGrantConsent(): void {
    this.router.navigate(['/grantconsent']);
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.getOwnData();
    }
  }
}
