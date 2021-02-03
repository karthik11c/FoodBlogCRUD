import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Recipe } from './recipes';
import { RecipesFilter } from './recipes.filter';

@Injectable()
export class RecipesService {
  RecipeList: Recipe[] = [];

  constructor(private http: HttpClient) { }
  // 1. findRecipe using id
  findRecipeById(id: string): Observable<Recipe> {
    const url = `http://localhost:3001/recipes/recipeById/${id}`;
    // const params = { 'id': id };
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<Recipe>(url, {headers});
  }

  // 2. get all recipes
  loadAll(): void {
    this.findAll().subscribe(result => {
        this.RecipeList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  findAll(): Observable<Recipe[]> { 
    const url = `http://localhost:3001/recipes/`;
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<Recipe[]>(url, {headers});
  }

  // 3. sort search

  findAllWithSort(filter: RecipesFilter): Observable<Recipe[]> {
    const url = `http://localhost:3001/recipes/searchWithSort`;
    const headers = new HttpHeaders().set('Accept', 'application/json');
    let var1 = filter.recipeName;
    let var2 = filter.countryOrigin;
    // Initialize Params Object
    let params = new HttpParams({
      fromString : `recipeName=${var1}&countryOrigin=${var2}`
    });
    return this.http.get<Recipe[]>(url,{params : params, headers});
  }

  save(entity: Recipe): Observable<Recipe> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `http://localhost:3001/recipes/updateRecipe`;
      // params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Recipe>(url, entity, {headers});
    } else {
      url = `http://localhost:3001/recipes/updateRecipe`;
      return this.http.post<Recipe>(url, entity, {headers, params});
    }
  }

  delete(entity: Recipe): Observable<Recipe> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `http://www.angular.at/api/Recipe/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Recipe>(url, {headers, params});
    }
    return null;
  }
}

