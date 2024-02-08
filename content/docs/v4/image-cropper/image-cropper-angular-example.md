title: Angular image cropper
keywords: JavaScript image cropper, crop, angular image cropper
description: How to integrate the image cropper into an Angular project.

* [JavaScript Cropper](/docs/v4/image-cropper)

Angular cropper
===============

Angular cropper [working example](https://codesandbox.io/s/angular-image-cropper-wc7s8k) on codesandbox.

  

Installation
------------

to install the component you must have npm. Navigate to the root of your project, and enter the command below

```bash
npm i @jsuites/cropper
```
  

Image cropper
-----------------

### Component

```javascript
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import "jsuites/dist/jsuites.layout.css";

@Component({
    selector: "app-cropper",
    templateUrl: "./cropper.component.html",
    styleUrls: ["./cropper.component.css"]
})

export class CropperComponent implements AfterViewInit {
    @Input()
    properties: Object;
    @ViewChild("crop") crop: ElementRef;
    ngAfterViewInit() {
        cropper(this.crop.nativeElement, this.properties);
    }
} 
```

### State

```javascript
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})

export class AppComponent {
    imageUrl = "";

    setImage = (newValue) => {
        this.imageUrl = newValue;
    };

    handleCropperChange = (el, imageElement) => {
        this.setImage(imageElement.src);
    };
}    
```

### Template

```xml
<div #crop></div>
```

### Importing the component

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CropperComponent } from "./cropper/cropper.component";

@NgModule({
    declarations: [AppComponent, CropperComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {}
```

### Using the component

```xml
<h3>Angular cropper example</h3>
<app-cropper
    [properties]="{
    value: imageUrl,
    onchange: handleCropperChange,
    area: [300, 300],
    crop: [100, 100]
}"
></app-cropper>
<span> Selected image base64: {{ imageUrl }}</span>
```

NOTE: Make sure to import the cropper.js and cropper.css in your angular.json or angular-cli.json

"styles": ["styles.css", "node_modules/@jsuites/cropper/cropper.css"],
"scripts": ["node_modules/@jsuites/cropper/cropper.js"]
