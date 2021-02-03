import { Component, OnInit } from '@angular/core';
import { RecipesFilter } from '../recipes.filter';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipes';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
})
export class RecipesListComponent implements OnInit {
  filter = new RecipesFilter();
  selectedRecipe: Recipe;
  feedback: any = {};

  get recipeList(): Recipe[] {
    return this.recipeService.RecipeList;
  }

  constructor(private recipeService: RecipesService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.recipeService.loadAll();
  }

  searchWithSort(): void{
    this.recipeService.findAllWithSort(this.filter);
  }

  select(selected: Recipe): void {
    this.selectedRecipe = selected;
  }

  delete(recipe: Recipe): void {
    if (confirm('Are you sure?')) {
      this.recipeService.delete(recipe).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
