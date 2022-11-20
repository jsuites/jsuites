import Helpers from './utils/helpers';
import animation from './plugins/animation';
import loading from './plugins/loading';
import notification from './plugins/notification';

var jSuites = {
    animation,
    notification,
    ...Helpers
};

// Legacy
jSuites.loading = animation.loading;

export default jSuites;