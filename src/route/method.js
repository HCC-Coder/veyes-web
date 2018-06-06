import { withRouter } from 'react-router-dom';

let routeName = {};

const route = (uri, component, name = null, hoc = null) => {
  if(name)routeName[name] = uri;
    let processedComponent;
    processedComponent = withRouter(component);
    if(hoc) {
      for(let i in hoc) {
        processedComponent = hoc[i](processedComponent);
      }
    }
    return {uri: uri, component: component};
}

const groupRoute = (path, routes, hoc = null) => {
  for (let i in routes) {
    routes[i].uri = path + routes[i].uri;
    let processedComponent;
    for(let j in hoc) {
    processedComponent = hoc[j](routes[i].component);
    }
    routes[i].component = processedComponent ? processedComponent : routes[i].component;
  }
  return routes;
}

export { route, groupRoute, routeName };