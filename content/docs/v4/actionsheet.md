title: Javascript actionsheet
keywords: Javascript, calendar, date, datetime, date picker, datetime picker
description: The jsuites calendar is a lightweight, full responsive javascript calendar date and datetime picker with easy integration.

Calendar javascript plugin with date and datetime picker
========================================================

Another datetime javascript picker? Not really. A very lean and responsive javascript plugin. We tried many different plugins in the marketing, but none of them had all features we were looking for. This plugin was taylored to be straight forward, simple, elegant and responsive.

Simple calendar with format
---------------------------

```html
<html>
<div id='app' class='app'></div>

<script>
jSuites.actionsheet.open({
    question:'',
    groups: [
        [
            { title:'Open Library', onclick:function() { alert(1); } },
            { title:'Take photo', onclick:function() { alert(2); } },
        ],
        [
            { title:'Cancel', className:'actionsheet-cancel', onclick:function() { jSuites.actionsheet.close(); } },
        ]
    ]
});
</script>
</html>
```