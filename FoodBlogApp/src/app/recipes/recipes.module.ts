import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {RECIEPES_ROUTES} from './recipes.routes';
import {RecipesService} from './recipes.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(RECIEPES_ROUTES)
  ],
  declarations: [
    RecipesListComponent, 
    RecipeEditComponent],
    providers: [RecipesService],
    exports: []
  })
export class RecipesModule { }
