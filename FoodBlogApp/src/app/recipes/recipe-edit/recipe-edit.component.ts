import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipes';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit {

  id: string;
  recipe: Recipe;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Recipe()); }
          return this.recipeService.findRecipeById(id);
        })
      )
      .subscribe(recipe => {
          this.recipe = recipe;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.recipeService.save(this.recipe).subscribe(
      recipe => {
        this.recipe = recipe;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/recipes']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/recipes']);
  }

}
