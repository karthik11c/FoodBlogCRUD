import { Routes } from '@angular/router';
import { RecipesListComponent} from './recipes-list/recipes-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

export const RECIEPES_ROUTES: Routes = [
  {
    path: 'recipes',
    component: RecipesListComponent
  },
  {
    path: 'recipes/:id',
    component: RecipeEditComponent
  }
];
