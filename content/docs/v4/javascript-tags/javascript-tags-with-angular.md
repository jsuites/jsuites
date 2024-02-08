title: Angular tags
keywords: Javascript, tagging, javascript tags, keywords, examples, angular
description: Create a tags javascript component with Angular and jSuites

* [Angular Tags](/docs/v4/javascript-tags)

Angular Tags
============

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-angular-tags-orn3i)

Tags component
--------------

#### tags.component.ts

```javascript
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.css"]
})

export class TagsComponent implements AfterViewInit {
  @Input()
  properties: Object;

  @ViewChild("tags") tags: ElementRef;

  ngAfterViewInit() {
    jSuites.tags(this.tags.nativeElement, this.properties);
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
  value = "test@gmail.com";

  setValue = (newValue) => {
    this.value = newValue;
  };

  handleTagsChange = (el, obj, newValue) => {
    this.setValue(newValue);
  };
}
```

Component template
------------------

#### tags.component.html

```xml
<div #tags></div>
```

Importing the component
-----------------------

#### app.module.ts

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TagsComponent } from "./tags/tags.component";

@NgModule({
  declarations: [AppComponent, TagsComponent],
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
<h3>Angular tags example</h3>
<app-tags
  [properties]="{
    value: value,
    onchange: handleTagsChange,
    placeholder: 'keywords'
  }"
></app-tags>
<h3>Tags value: {{ value }}</h3>
```

NOTE: Make sure to import the jsuites.js and jsuites.css in your angular.json or angular-cli.json

"styles": ["styles.css", "node_modules/jsuites/dist/jsuites.css"],
"scripts": ["node_modules/jsuites/dist/jsuites.js"]
