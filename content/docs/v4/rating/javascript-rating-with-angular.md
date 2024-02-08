title: Angular rating
keywords: Javascript, rating, five star rating plugin, angular
description: Create a javascript rating component with Angular and jSuites

* [Angular Rating](/docs/v4/rating)

Angular rating
==============

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-angular-rating-lg3e0)

Rating component
----------------

#### rating.component.ts

```javascript
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.css"]
})

export class RatingComponent implements AfterViewInit {
  @Input()
  properties: Object;

  @ViewChild("rating") rating: ElementRef;

  ngAfterViewInit() {
    jSuites.rating(this.rating.nativeElement, this.properties);
  }
}
```
    

Component state
---------------

#### app.component.ts

```javascript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  value = 5;

  setValue = (newValue) => {
    this.value = newValue;
  };

  handleRatingChange = (el, newValue) => {
    this.setValue(newValue);
  };
}
```

Component template
------------------

#### rating.component.html

```xml
<div #rating></div>
```

Importing the component
-----------------------

#### app.module.ts

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RatingComponent } from "./rating/rating.component";

@NgModule({
  declarations: [AppComponent, RatingComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
```

Component usage
---------------

#### app.component.html

```xml
<h3>Angular rating example</h3>
<app-rating
  [properties]="{
    value: value,
    onchange: handleRatingChange,
    number: 10,
    tooltip: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }"
></app-rating>
<h3>Select stars: {{ value }}</h3>
```

NOTE: Make sure to import the jsuites.js and jsuites.css in your angular.json or angular-cli.json

"styles": ["styles.css", "node_modules/jsuites/dist/jsuites.css"],
"scripts": ["node_modules/jsuites/dist/jsuites.js"]
