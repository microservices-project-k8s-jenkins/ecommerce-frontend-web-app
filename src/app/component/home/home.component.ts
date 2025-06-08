import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryDtoCollectionResponse } from 'src/app/model/response/collection/category-dto-collection-response';
import { CategoryService } from 'src/app/service/category.service';
import { ConfigService } from 'src/app/service/config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  public categories!: Category[];
  public secretText: string = 'loading...';
  private configSubscription: Subscription;
  
  constructor(
    private categoryService: CategoryService,
    private configService: ConfigService
  ) {
    this.configSubscription = this.configService.config$.subscribe(config => {
      console.log('Config actualizada en HomeComponent:', config);
      this.secretText = config?.secretText || 'not provided';
    });
  }
  
  ngOnInit(): void {
    this.findAll();
  }

  ngOnDestroy(): void {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }
  
  public findAll(): void {
    this.categoryService.findAll()
        .subscribe(
          (response: CategoryDtoCollectionResponse) => {
            this.categories = response!.collection;
            this.categories.forEach(c => console.log(JSON.stringify(c)));
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
            alert(error.message);
          }
        );
  }
  
  
  
}










