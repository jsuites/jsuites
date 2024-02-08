title: Angular color picker
keywords: Javascript, color picker, color picker, examples, angular
description: How to create a color picker with Angular and jSuites

* [JavaScript Color Picker](/docs/v4/color-picker)

Angular color picker
====================

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-angular-color-picker-bubgh)

Color picker component
----------------------

#### color.component.ts

```javascript
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-color",
  templateUrl: "./color.component.html",
  styleUrls: ["./color.component.css"]
})

export class ColorPickerComponent implements AfterViewInit {
  @Input()
  properties: Object;

  @ViewChild("color") color: ElementRef;

  ngAfterViewInit() {
    jSuites.color(this.color.nativeElement, this.properties);
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
  value = "#f3e5f5";

  setValue = (newValue) => {
    this.value = newValue;
  };

  handleColorPickerChange = (el, newValue) => {
    this.setValue(newValue);
  };
}
```

Component template
------------------

#### color.component.html

```xml
<input #color />
```

Importing the component
-----------------------

#### app.module.ts

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ColorPickerComponent } from "./color/color.component";

@NgModule({
  declarations: [AppComponent, ColorPickerComponent],
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
<h3>Angular Color Picker</h3>
<app-color
  [properties]="{
    value: value,
    closeOnChange: true,
    onchange: handleColorPickerChange
  }"
></app-color>
<h3>Picked color: {{ value }}</h3>
```

NOTE: Make sure to import the jsuites.js and jsuites.css in your angular.json or angular-cli.json

"styles": ["styles.css", "node_modules/jsuites/dist/jsuites.css"],
"scripts": ["node_modules/jsuites/dist/jsuites.js"]
