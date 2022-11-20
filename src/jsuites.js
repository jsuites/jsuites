import Helpers from './utils/helpers';
import animation from './plugins/animation';
import notification from './plugins/notification';
import validations from './plugins/validations';

import './style/animation.css';
import './style/notification.css';

var jSuites = {
    animation,
    notification,
    ...Helpers,
    validations,
};

// Legacy
jSuites.loading = animation.loading;

export default jSuites;