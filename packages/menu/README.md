# JavaScript Navigation Menu - jSuites Menu Plugin

A lightweight, responsive **JavaScript navigation menu** component for building sidebar menus and documentation navigation. Features collapsible folders, automatic URL-based selection, smooth animations, and mobile-friendly design.

## Key Features

- **Collapsible Folders**: Expandable/collapsible sections with smooth animations
- **URL-Based Selection**: Automatically highlights menu items based on current URL
- **Responsive Design**: Transforms into a slide-out sidebar on mobile devices (<800px)
- **Smooth Animations**: Slide-in/slide-out transitions for mobile navigation
- **Material Icons Support**: Built-in support for Material Icons in folder headers
- **Scroll to Selected**: Auto-scrolls to the currently selected menu item on load
- **Toggle Functionality**: Show, hide, and toggle menu visibility programmatically
- **Event Callbacks**: onload and onclick event handlers for custom logic
- **Lightweight**: No dependencies, works standalone or with jSuites

## Installation

### NPM Installation

```bash
npm install @jsuites/menu
```

### CDN Installation

```html
<!-- jSuites Menu Plugin -->
<script src="https://cdn.jsdelivr.net/npm/@jsuites/menu/menu.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/menu/menu.min.css" />
```

## Quick Start Example

### Basic Navigation Menu

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/@jsuites/menu/menu.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/menu/menu.min.css" />
</head>
<body>
<div id="navigation">
    <nav>
        <h2 data-icon="home" class="folder">Getting Started</h2>
        <div>
            <ul>
                <li><a href="/docs/introduction">Introduction</a></li>
                <li><a href="/docs/installation">Installation</a></li>
                <li><a href="/docs/quick-start">Quick Start</a></li>
            </ul>
        </div>
    </nav>
    <nav>
        <h2 data-icon="code" class="folder">API Reference</h2>
        <div>
            <ul>
                <li><a href="/docs/methods">Methods</a></li>
                <li><a href="/docs/events">Events</a></li>
                <li><a href="/docs/options">Options</a></li>
            </ul>
        </div>
    </nav>
</div>

<script>
    const navigation = menu(document.getElementById('navigation'), {
        adjustOnLoad: true,
        onclick: function(instance, e) {
            console.log('Menu item clicked');
        }
    });
</script>
</body>
</html>
```

### Using with LemonadeJS

```javascript
import lemonade from 'lemonadejs';
import menu from '@jsuites/menu';

export default function Menu() {
    let self = this;

    self.data = self.data || [];

    self.createMenu = function(o) {
        self.instance = menu(o, {
            adjustOnLoad: true,
        });
    }

    self.toggle = function() {
        if (self.el.offsetWidth) {
            self.instance.hide();
        } else {
            self.instance.show();
        }
    }

    self.hide = function() {
        self.instance.hide();
    }

    self.show = function() {
        self.instance.show();
    }

    self.onload = function() {
        if (document.body.offsetWidth < 800) {
            self.el.style.display = 'none';
        }
    }

    // Template
    return render => render`<div :ready="self.createMenu" path="{{self.path}}" class="lm-p20">
        <img src="{{self.logo}}" class="jmenu-logo" />
        <div :loop="self.data">
            <nav data-id="{{self.id}}">
                <h2 data-icon="{{self.icon}}" class="folder">{{self.title}}</h2>
                <div>
                    <ul :loop="self.items">
                        <li><a href="{{self.href}}">{{self.title}}</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>`;
}
```

### React Integration

```javascript
import React, { useRef, useEffect } from 'react';
import menu from '@jsuites/menu';
import '@jsuites/menu/menu.css';

function NavigationMenu({ items }) {
    const menuRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            menuRef.current = menu(containerRef.current, {
                adjustOnLoad: true,
                onclick: (instance, e) => {
                    console.log('Navigation clicked');
                }
            });
        }
    }, []);

    const handleToggle = () => {
        menuRef.current?.toggle();
    };

    return (
        <>
            <button className="jmenu-icon" onClick={handleToggle}>Menu</button>
            <div ref={containerRef}>
                {items.map((section, index) => (
                    <nav key={index}>
                        <h2 data-icon={section.icon} className="folder">{section.title}</h2>
                        <div>
                            <ul>
                                {section.links.map((link, i) => (
                                    <li key={i}><a href={link.href}>{link.title}</a></li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                ))}
            </div>
        </>
    );
}

export default NavigationMenu;
```

### Vue Integration

```vue
<template>
    <div>
        <button class="jmenu-icon" @click="toggle">Menu</button>
        <div ref="menuContainer">
            <nav v-for="(section, index) in sections" :key="index">
                <h2 :data-icon="section.icon" class="folder">{{ section.title }}</h2>
                <div>
                    <ul>
                        <li v-for="(link, i) in section.links" :key="i">
                            <a :href="link.href">{{ link.title }}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import menu from '@jsuites/menu';
import '@jsuites/menu/menu.css';

export default {
    props: ['sections'],
    data() {
        return {
            menuInstance: null
        };
    },
    mounted() {
        this.menuInstance = menu(this.$refs.menuContainer, {
            adjustOnLoad: true
        });
    },
    methods: {
        toggle() {
            this.menuInstance?.toggle();
        }
    }
};
</script>
```

## Usage Examples

### Documentation Sidebar

```javascript
const docsSidebar = menu(document.getElementById('sidebar'), {
    adjustOnLoad: true,
    onclick: function(instance, e) {
        // Track navigation analytics
        analytics.track('docs_navigation', {
            path: e.target.href
        });
    }
});

// Update selection when using client-side routing
window.addEventListener('popstate', () => {
    docsSidebar.update(true); // true = scroll to selected item
});
```

### Mobile Navigation with Toggle Button

```html
<button class="jmenu-icon" onclick="navigation.toggle()">
    <span class="material-icons">menu</span>
</button>

<div id="mobile-nav">
    <img src="/logo.png" class="jmenu-logo" />
    <nav>
        <h2 class="folder">Products</h2>
        <div>
            <ul>
                <li><a href="/products/software">Software</a></li>
                <li><a href="/products/services">Services</a></li>
            </ul>
        </div>
    </nav>
</div>

<script>
    const navigation = menu(document.getElementById('mobile-nav'));
</script>
```

### Nested Menu Structure

```html
<div id="nested-menu">
    <nav>
        <h2 data-icon="folder" class="folder">Components</h2>
        <div>
            <h3>Form Elements</h3>
            <ul>
                <li><a href="/components/input">Input</a></li>
                <li><a href="/components/select">Select</a></li>
                <li><a href="/components/checkbox">Checkbox</a></li>
            </ul>
            <h3>Layout</h3>
            <ul>
                <li><a href="/components/grid">Grid</a></li>
                <li><a href="/components/container">Container</a></li>
            </ul>
        </div>
    </nav>
</div>

<script>
    menu(document.getElementById('nested-menu'));
</script>
```

## API Reference

### Options

| Property       | Type     | Default | Description                                            |
|----------------|----------|---------|--------------------------------------------------------|
| `adjustOnLoad` | boolean  | true    | Auto-scroll to selected item when menu loads           |
| `onclick`      | function | null    | Callback fired when a menu link is clicked             |
| `onload`       | function | null    | Callback fired when the menu finishes initializing     |

### Methods

#### show()
Display the menu (with slide animation on mobile).

```javascript
menuInstance.show();
```

#### hide()
Hide the menu (with slide animation on mobile).

```javascript
menuInstance.hide();
```

#### toggle()
Toggle menu visibility.

```javascript
menuInstance.toggle();
```

#### update(adjustScroll)
Update the selected state based on the current URL path.

```javascript
// Update selection without scrolling
menuInstance.update();

// Update selection and scroll to selected item
menuInstance.update(true);
```

**Parameters:**
- `adjustScroll` (boolean): If true, scrolls the menu to show the selected item

#### select(element, event)
Programmatically select a menu item.

```javascript
const link = document.querySelector('.jmenu a[href="/docs/intro"]');
menuInstance.select(link, event);
```

**Parameters:**
- `element` (HTMLElement): The anchor element to select
- `event` (Event): The original event object

### HTML Structure

The menu expects this HTML structure:

```html
<div id="menu">
    <!-- Optional logo for mobile view -->
    <img src="/logo.png" class="jmenu-logo" />

    <nav>
        <!-- Collapsible folder header -->
        <h2 data-icon="icon_name" class="folder">Section Title</h2>
        <div>
            <!-- Optional subsection heading -->
            <h3>Subsection</h3>
            <ul>
                <li><a href="/path">Link Text</a></li>
            </ul>
        </div>
    </nav>
</div>
```

### CSS Classes

| Class          | Description                                      |
|----------------|--------------------------------------------------|
| `.jmenu`       | Main menu container (added automatically)        |
| `.jmenu-logo`  | Logo image, visible only on mobile               |
| `.jmenu-icon`  | Menu toggle button (hamburger icon)              |
| `.folder`      | Collapsible section header                       |
| `.selected`    | Applied to active folder and list item           |

### CSS Custom Properties

| Property              | Description                           |
|-----------------------|---------------------------------------|
| `--main-color`        | Accent color for selected item border |
| `--main-color-light`  | Background color for selected item    |

## Responsive Behavior

The menu automatically adapts for different screen sizes:

- **Desktop (>800px)**: Static sidebar, folders expand/collapse in place
- **Mobile (<800px)**:
  - Full-height slide-out panel with fixed positioning
  - Logo becomes visible
  - Close button appears in top-right corner
  - Clicking a link automatically closes the menu

## Related Projects

- **[LemonadeJS](https://lemonadejs.com)** - Reactive micro JavaScript library
- **[Jspreadsheet](https://jspreadsheet.com)** - JavaScript data grid and spreadsheet component
- **[jSuites](https://jsuites.net)** - JavaScript plugins and web components collection
- **[CalendarJS](https://calendarjs.com)** - JavaScript calendar, schedule, and date picker components

## License

MIT License

## Support & Community

- **Documentation**: [https://jsuites.net/docs/menu](https://jsuites.net/docs/menu)
- **GitHub Issues**: [https://github.com/jsuites/jsuites/issues](https://github.com/jsuites/jsuites/issues)
- **Website**: [https://jsuites.net](https://jsuites.net)

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.
