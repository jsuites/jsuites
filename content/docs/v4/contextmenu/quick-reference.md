title: Quick reference documentation for the jsuites javascript contextmenu
keywords: Javascript, contextmenu, quick reference, documentation
description: The documentation reference to use the jsuites javascript contextmenu plugin.

JavaScript Contextmenu Quick Reference
======================
  

Initialization options
----------------------

| Property | Description |
| --- | --- |
| items: Array of objects | Array of item object descriptions. |
| onclick: function | Global onclick event. `function(instance, event)` |

  
  

Item options
------------

| Property | Description |
| --- | --- |
| type: string | Context menu item type: line | divisor | default |
| icon: string | Context menu icon key. (Material icon key icon identification) |
| id: string | HTML id property of the item DOM element |
| disabled: boolean | The item is disabled |
| onclick: function(element: HTMLElement, event: e) : void | Specific onclick event for the element. |
| shortcut: string | A short description or instruction for the item. Normally a shortcut. |
| tooltip: string | Show this text when the user mouse over the element |
| submenu: Array of objects | Submenu items |

