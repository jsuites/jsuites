title: Angular dropdown
keywords: javascript, autocomplete, javascript dropdown, angular
description: Create a dropdown component with Angular and jSuites

* [Angular Dropdown](/docs/v4/dropdown-and-autocomplete)

Angular Dropdown
================

Angular dropdown and autocomplete [working example](https://codesandbox.io/s/jsuites-angular-dropdown-pu392) on codesandbox.  
  

Dropdown component
------------------

#### dropdown.component.ts

```javascript
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Input
} from "@angular/core";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"]
})

export class DropdownComponent implements AfterViewInit {
  @Input()
  properties: Object;

  @ViewChild("dropdown") dropdown: ElementRef;

  ngAfterViewInit() {
    jSuites.dropdown(this.dropdown.nativeElement, this.properties);
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
  value = "";

  setValue = (newValue) => {
    this.value = newValue;
  };

  handleDropdownChange = (el, index, oldValue, newValue) => {
    this.setValue(newValue);
  };
}
```

  

Component template
------------------

#### dropdown.component.html

```xml
<div #dropdown></div>
```
  

Importing the component
-----------------------

#### app.module.ts

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DropdownComponent } from "./dropdown/dropdown.component";

@NgModule({
  declarations: [AppComponent, DropdownComponent],
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
<h3>Angular dropdown example</h3>
<app-dropdown
  [properties]="{
      value: value,
      data: ['Pizza', 'Hamburguer', 'Banana'],
      onchange: handleDropdownChange
  }"
></app-dropdown>
<h3>Dropdown value: {{ value }}</h3>
```

NOTE: Make sure to import the jsuites.js and jsuites.css in your angular.json or angular-cli.json

"styles": ["styles.css", "node_modules/jsuites/dist/jsuites.css"],
"scripts": ["node_modules/jsuites/dist/jsuites.js"]
