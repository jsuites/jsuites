# 5.12.0

## General Improvements
- Updated ARIA attributes.
- Made the focus helper more flexible across input types.
- Improved `jSuites.path`.

## AJAX Requests
- Added optional `X-Requested-With` header.
- New events: `onerror`, `ontimeout`.

## Calendar
- Added formatting support for calendar inputs.

## Dropdown
- `allowEmpty` now permits empty values in multi-select dropdowns.

## Mask
- Fixed time format handling (`hh`).
- Added text mask `@`.
- Miscellaneous fixes.

## Validations
- Added time validation.
- List validation now accepts an array or comma-separated text.



# 5.8.0
- Added a `strict` argument for mask rendering (default: `true`).
- Enabled list validation for ranges.



# 5.6.5
- Translated calendar strings.



# 5.6.4
- Sanitized HTML pasted into the editor and tags plugins.



# 5.5.2
- Replaced `onbeforeinput` with `prompt`.



# 5.5.1
- Added `tracking.state` support for a second jSuites instance.



# 5.5.0
- Added a new event for dropdowns: `onbeforeinput`.
- Added a new event for tabs: `onremoveitem`.
- Implemented global events to prevent duplicate declarations.
