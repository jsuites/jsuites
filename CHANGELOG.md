# Changelog

## 6.0.0

## Major Changes
- Complete rewrite of the mask system with Excel-like behavior and formatting
- New `autoCasting` feature with automatic type detection (dates, currency, numbers, percentages)
- Mask and date utilities extracted into the standalone `@jsuites/utils` package

### Added
- Intelligent AutoCasting with caching for improved performance

### Changed
- Improved Excel compatibility across all mask formats
- Calendar positioning improvements when `controls` is disabled
- Optimized package structure through function reuse and code splitting
- Improved handling of non-numeric input in numeric masks
- Improved toolbar background rendering
- Extended and simplified date helper functions

### Security
- Improved Content Security Policy (CSP) compliance
- Enhanced protections against XSS and injection vulnerabilities
- Safer DOM manipulation across the codebase

### Fixed
- Context menu submenu positioning
- Material Symbols icon support
- Calendar translations for custom month and weekday names
- AutoCasting issues with localized currency formats
- HH24 time format leading zero preservation
- Locale formatting preventing NaN values
- Caret positioning in non-numeric masks
- Calendar positioning when controls are hidden
- Webpack development mode configuration


## 5.13.3

### Added
- AutoCasting feature for automatic type detection (initial implementation)

### Fixed
- Editor button scope issues

## 5.12.0

### General Improvements
- Updated ARIA attributes
- Made the focus helper more flexible across input types
- Improved `jSuites.path`

### AJAX Requests
- Added optional `X-Requested-With` header
- New events: `onerror`, `ontimeout`

### Calendar
- Added formatting support for calendar inputs

### Dropdown
- `allowEmpty` now permits empty values in multi-select dropdowns

### Mask
- Fixed time format handling (`hh`)
- Added text mask `@`
- Miscellaneous fixes

### Validations
- Added time validation
- List validation now accepts an array or comma-separated text

## 5.11.0

### Changed
- Path improvements to handle wrong addresses and edge cases

## 5.10.0

### Added
- Time validation for mask inputs

### Fixed
- Mask hour format handling

## 5.9.0

### Added
- WAI-ARIA accessibility updates across components
- Text mask with `@` symbol support

### Security
- Content Security Policy (CSP) implementation for editor, upload, player, and picker
- Security reviews for `heatmap` and `organogram` components

### Changed
- Context menu with smart positioning and submenu adjustments

## 5.8.6

### Fixed
- Mask decimal rounding precision

## 5.8.5

### Fixed
- ExtractDate hours adjustment

## 5.8.3

### Added
- Mask support for `@` symbol

## 5.8.0

### Added
- Strict argument for mask rendering (default: `true`)
- Range validation for list components

## 5.7.0

### Changed
- Ajax component updates and improvements
- Added `onerror` events to ajax calls
- Loading and animation types

## 5.6.5

### Changed
- Calendar string translation support

## 5.6.4

### Security
- HTML sanitization for paste operations in editor and tags plugins

## 5.5.2

### Changed
- Replaced `onbeforeinput` with prompt-based input handling

## 5.5.1

### Added
- `tracking.state` property for secondary jSuites instances

## 5.5.0

### Added
- `onbeforeinput` event for dropdown components
- `onremoveitem` event for tab components
- Global event system to prevent duplicate declarations

