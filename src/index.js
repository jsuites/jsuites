import jSuites from './jsuites';
import cropper from '../packages/cropper/cropper';
import '../packages/cropper/cropper.css';

import '../dist/jsuites.css';


cropper(document.getElementById('root'), {
    area: [ 280, 280 ],
    crop: [ 150, 150 ],
})