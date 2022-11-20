import Helpers from './utils/helpers';
import animation from './plugins/animation';
import notification from './plugins/notification';

import './style/animation.css';
import './style/notification.css';

var jSuites = {
    animation,
    notification,
    ...Helpers
};

// Legacy
jSuites.loading = animation.loading;

export default jSuites;