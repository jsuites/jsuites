#!/bin/bash
set -e

case "$1" in
  base)
  # excluded mask.test.js and xss.editor.test.js because they are flaky in CI environment
    npm test -- --testPathIgnorePatterns="mask.test.js|xss.editor.test.js" --testPathPattern="tests/" --verbose=false
    ;;
  new)
    npm test -- tests/xss.editor.test.js --verbose=false
    ;;
  *)
    echo "Usage: $0 [base|new]"
    exit 1
    ;;
esac