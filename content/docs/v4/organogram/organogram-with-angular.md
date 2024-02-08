title: Angular organogram
keywords: Javascript, organogram, organogram plugin, JS organogram, examples, example, angular, angular integration
description: How to create a javascript organogram using Angular.

* [Angular Organogram](/docs/v4/organogram)

Angular organogram
==================

Angular organogram [working example](https://codesandbox.io/s/jsuites-angular-organogram-lgj2g) on codesandbox.

  

Component installation
----------------------

```bash
npm i @jsuites/organogram
```
  

Organogram component
--------------------

#### organogram.component.ts

```javascript
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-organogram",
  templateUrl: "./organogram.component.html",
  styleUrls: ["./organogram.component.css"]
})

export class OrganogramComponent implements AfterViewInit {
  @Input()
  properties: Object;

  @ViewChild("organogram") organogram: ElementRef;

  ngAfterViewInit() {
    organogram(this.organogram.nativeElement, this.properties);
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
  handleOrganogramClick = (el, obj, event) => {
    console.log(event.target);
  };
}
```
  

Component template
------------------

#### organogram.component.html

```xml
<div #organogram></div>
```
  

Importing the component
-----------------------

#### app.module.ts

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { OrganogramComponent } from "./organogram/organogram.component";

@NgModule({
  declarations: [AppComponent, OrganogramComponent],
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
<app-organogram
[properties]="{
  width: 600,
  height: 480,
  onclick: handleOrganogramClick,
  data: [
    {
      id: 1,
      name: 'Jorge',
      role: 'CEO',
      parent: 0,
      status: '#90EE90',
      img: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'
    },
    {
      id: 2,
      name: 'Antonio',
      role: 'Vice president',
      parent: 1,
      status: '#90EE90',
      img: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'
    },
    {
      id: 3,
      name: 'Manoel',
      role: 'Production manager',
      parent: 1,
      status: '#D3D3D3',
      img: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'
    },
    {
      id: 4,
      name: 'Pedro',
      role: 'Intern',
      parent: 3,
      status: '#90EE90',
      img: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'
    },
    {
      id: 5,
      name: 'Carlos',
      role: 'Intern',
      parent: 3,
      status: '#90EE90',
      img: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'
    },
    {
      id: 6,
      name: 'Marcos',
      role: 'Marketing manager',
      parent: 2,
      status: '#D3D3D3',
      img: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'
    },
    {
      id: 7,
      name: 'Ana',
      role: 'Sales manager',
      parent: 2,
      status: '#90EE90',
      img: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'
    },
    {
      id: 8,
      name: 'Nicolly',
      role: 'Operations manager',
      parent: 2,
      status: '#D3D3D3',
      img: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'
    },
    {
      id: 9,
      name: 'Paulo',
      role: 'Sales assistant',
      parent: 7,
      status: '#90EE90',
      img: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'
    },
    {
      id: 10,
      name: 'Iris',
      role: 'Sales assistant',
      parent: 7,
      status: '#90EE90',
      img: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'
    }
  ],
  vertical: false
}"
></app-organogram>
```

NOTE: Make sure to import the organogram.js and organogram.css in your angular.json or angular-cli.json

"styles": ["styles.css", "node_modules/@jsuites/organogram/organogram.css"],
"scripts": ["node_modules/@jsuites/organogram/organogram.js"]
