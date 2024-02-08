title: jSuites template quick reference
keywords: Javascript, template plugin, templates, JS template, Javascript template, quick reference, documentation
description: The quick reference on how to use jsuites template to easily render templates with remote or local data.

* [jSuites template](/docs/v4/javascript-template)

JavaScript Template
===================

Quick reference
---------------

Considering the example below:

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/template/template.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jsuites/template/template.min.js"></script>


<div class='row'>
<div class='column p10'>
    <div id='jsuites-template' style='border:1px solid #ccc; padding: 10px;'></div>
</div>
</div>

<script>
jSuites.template(document.getElementById('jsuites-template'), {
    url: "/plugins/products.json",
    template: {
        item: function(data) {
            return `
                <div>
                <div class="row">
                    <div class="column f1 p10 center">
                        <div class="column">
                            <img class="users-large mr1" alt="${data.Description}" src="${data.img}">
                        </div>
                        <div class="column">
                            ${data.Title}
                        </div>
                    </div>
                    <div class="column f1 p6 center" style="align-self: center;">$${data.Price}</div>
                    <div class="column f1 p10 center" style="align-self: center;">
                        <button class="jbutton dark">Add to cart</button>
                    </div>
                </div>
            </div>
            `
        }
    },
    search: true,
    pagination: 5,
    searchPlaceHolder: 'Search a item'
});
</script>
</html>
```

  
  

Methods
-------

| Method | Description |
| --- | --- |
| template.addItem(data,beginOfDataSet); | Adds a new item to the element.  <br>@param boolean beginOfDataSet - defines whether the item should be added at the beginning of the data array. |
| template.appendData(data,pageNumber); | Append data to a specific page.  <br>@param array data - elements to be added.  <br>@param Number pageNumber - page number. |
| template.refresh(); | Updates and re-renders the element. |
| template.reload(); | Reloads the data and changes the pagination to its initial value. |
| template.removeItem(element); | Removes a specific item from the template.  <br>@param DOMElement element - element from the dom tree to be removed. |
| template.render(pageNumber,forceLoad); | Renders data in the element.  <br>@param int pageNumber - initial pagination.  <br>@param boolean forceLoad - for remote data, forces data to be reloaded. |
| template.renderTemplate(); | Renders all visual content in the template. |
| template.search(query); | Searches matching elements  <br>@param string query - search term. |
| template.setData(data); | Sets a new data value and re-renders the element.  <br>@param array data - data to load. |
| template.updatePagination(); | Updates the pagination according to pageNumber. |

  
  

Events
------

| Method | Description |
| --- | --- |
| onload | Trigger a method when component is loaded.  <br>`onload(DOMElement element, Object obj) => void` |
| onchange | Trigger a method when pagination is changed.  <br>`onchange(DOMElement element, Array data) => void` |
| onsearch | Trigger a method when searching.  <br>`onsearch(DOMElement element, Object obj, String query) => void` |
| onclick | Trigger a method when element is clicked.  <br>`on(DOMElement element, Object obj, DOMEvent e) => void` |

  
  

Initialization options
----------------------

| Property | Description |
| --- | --- |
| url: string | Can be loaded from a external file. |
| data: mixed | Data to be rendered. |
| filter: function | Method to apply a filter to the data before it is rendered.  <br>(data: Array) => filteredData: Array |
| pageNumber: number | Current page number. |
| numberOfPages: number | Total number of pages. |
| template: object | { template: { item: function } }  <br>(data: Array) => template string |
| render: function | Method for rendering html content.  <br>(obj: object) => string |
| noRecordsFound: string | Displayed message when data was not found. |
| containerClass: string | Add a class to content container. |
| search: boolean | Shows a searchable input. Default: null. |
| searchInput: boolean | Enables or disables the searchable input. Default: true. |
| searchPlaceHolder: string | Adds a placeholder to the search input. |
| searchValue: string | Changes the value of the search input. |
| remoteData: boolean | Allows remote data search. Default: null. |
| pagination: number | Number of items on each page. |
