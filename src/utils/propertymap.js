export default function mapPropertiesFromStudio(jsuitesConfig, pluginType) {
    const propertyMaps = {
        'contextmenu': {
            // jsuitesProp : studioProp
            'items': 'options',
        },
    };

    const map = propertyMaps[pluginType] || {};
    const lemonadeConfig = {};

    Object.keys(jsuitesConfig).forEach(key => {
        const mappedKey = map[key] || key;
        lemonadeConfig[mappedKey] = jsuitesConfig[key];
    });

    return lemonadeConfig;
}
