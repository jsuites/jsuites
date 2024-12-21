title: Angular Calendar
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, inline javascript date picker, angular
description: Create a calendar picker component with Angular and jSuites

* [Angular Calendar](/docs/v4/javascript-calendar)

# Angular Calendar

Take a look at this example in CodeSandbox: [working example](https://codesandbox.io/s/jsuites-angular-calendar-qrq5e)

## Calendar component

#### calendar.component.ts

```javascript
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
})

export class CalendarComponent implements AfterViewInit {
  @Input()
  properties: Object;

  @ViewChild("calendar") calendar: ElementRef;

  ngAfterViewInit() {
    jSuites.calendar(this.calendar.nativeElement, this.properties);
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
  value = "1998-07-25";

  setValue = (newValue) => {
    this.value = newValue;
  };

  handleCalendarChange = (el, currentValue) => {
    this.setValue(currentValue.substr(0, 10));
  };
}
```

Component template
------------------

#### calendar.component.html

```xml
<input #calendar />
```

Importing the component
-----------------------

#### app.module.ts

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CalendarComponent } from "./calendar/calendar.component";

@NgModule({
  declarations: [AppComponent, CalendarComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
```

Component usage
---------------

#### app.component.html

```html
<h3>Angular calendar example</h3>
<app-calendar
  [properties]="{
    value: value,
    onchange: handleCalendarChange,
    format: 'DD/MM/YYYY' 
  }"
></app-calendar>
<h3>Calendar date: {{ value }}</h3>
```

NOTE: Make sure to import the jsuites.js and jsuites.css in your angular.json or angular-cli.json

"styles": ["styles.css", "node_modules/jsuites/dist/jsuites.css"],
"scripts": ["node_modules/jsuites/dist/jsuites.js"]
