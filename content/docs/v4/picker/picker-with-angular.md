title: Angular picker
keywords: Javascript, picker, picker plugin, JS picker, Javascript picker, example, angular, angular integration
description: How to integrate the jsuites picker with Angular.

* [Angular Picker](/docs/v4/picker)

Angular picker
==============

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-angular-picker-zqluh)

Picker component
----------------

#### picker.component.ts

```javascript
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-picker",
  templateUrl: "./picker.component.html",
  styleUrls: ["./picker.component.css"]
})

export class PickerComponent implements AfterViewInit {
  @Input()
  properties: Object;

  @ViewChild("picker") picker: ElementRef;

  ngAfterViewInit() {
    jSuites.picker(this.picker.nativeElement, this.properties);
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
  value = 0;

  setValue = (newValue) => {
    this.value = newValue;
  };

  handlePickerChange = (el, obj, label, valueIndex) => {
    this.setValue(valueIndex);
  };
}
```

Component template
------------------

#### picker.component.html

```xml
<div #picker></div>
```

Importing the component
-----------------------

#### app.module.ts

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { PickerComponent } from "./picker/picker.component";

@NgModule({
  declarations: [AppComponent, PickerComponent],
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
<h3>Angular color example</h3>
<app-picker
  [properties]="{
    value: value,
    onchange: handlePickerChange,
    data: ['Pizza', 'Hamburguer', 'Marshmello']
  }"
></app-picker>
<h3>Selected index: {{ value }}</h3>
```

NOTE: Make sure to import the jsuites.js and jsuites.css in your angular.json or angular-cli.json

"styles": ["styles.css", "node_modules/jsuites/dist/jsuites.css"],
"scripts": ["node_modules/jsuites/dist/jsuites.js"]
