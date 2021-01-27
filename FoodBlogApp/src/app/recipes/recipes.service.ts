import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Recipe } from './recipes';
import { RecipesFilter } from './recipes.filter';

@Injectable()
export class RecipesService {
  RecipeList: Recipe[] = [];

  constructor(private http: HttpClient) { }

  findById(id: string): Observable<Recipe> {
    const url = `http://www.angular.at/api/Recipe/${id}`;
    const params = { 'id': id };
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<Recipe>(url, {params, headers});
  }

  load(filter: RecipesFilter): void {
    this.find(filter).subscribe(result => {
        this.RecipeList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: RecipesFilter): Observable<Recipe[]> {
    const url = `http://www.angular.at/api/Flight`;
    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = {
      'from': filter.from,
      'to': filter.to,
    };

    return this.http.get<Recipe[]>(url, {params, headers});
  }

  save(entity: Recipe): Observable<Recipe> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `http://www.angular.at/api/Recipe/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Recipe>(url, entity, {headers, params});
    } else {
      url = `http://www.angular.at/api/Recipe`;
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

