import { withRouter } from 'react-router-dom';

// let routeName = {};

// const route = (uri, component, name = null, hoc = null) => {
//   if(name)routeName[name] = uri;
//     let processedComponent;
//     processedComponent = withRouter(component);
//     if(hoc) {
//       for(let i in hoc) {
//         processedComponent = hoc[i](processedComponent);
//       }
//     }
//     return {uri: uri, component: processedComponent};
// }

// const groupRoute = (path, routes, hoc = null) => {
//   for (let i in routes) {
//     routes[i].uri = path + routes[i].uri;
//     let processedComponent;
//     for(let j in hoc) {
//     processedComponent = hoc[j](routes[i].component);
//     }
//     routes[i].component = processedComponent ? processedComponent : routes[i].component;
//   }
//   return routes;
// }


class Route {
  routes = []
  routeName = {};
  tempPath = false;
  tempHoc = false;
  set(uri, component, name = null, hoc = null) {
    if(this.tempPath)uri = this.tempPath + uri;
    if(name)this.routeName[name] = uri;
    else this.routeName[uri] = uri;
    let processedComponent = withRouter(component);
    if(hoc) for(let i in hoc) {
      processedComponent = hoc[i](processedComponent);
    }
    if(this.tempHoc) for(let i in this.tempHoc) {
      processedComponent = this.tempHoc[i](processedComponent);
    }
    this.routes.push({uri:uri, component:processedComponent});
  }

  setTempPath(path) {
    this.tempPath = path;
  }

  resetTempPath() {
    this.tempPath = false;
  }

  setTempHoc(hoc) {
    this.tempHoc = hoc;
  }

  resetTempHoc() {
    this.tempHoc = false;
  }
}

let routes = new Route();

class Router {
  static set(uri, component, name = null, hoc = null) {
    routes.set(uri, component, name, hoc);
  }

  static group(path, routesCallback, hoc = null) {
    routes.setTempPath(path);
    routes.setTempHoc(hoc);
    routesCallback();
    routes.resetTempPath();
    routes.resetTempHoc();
  }

}

export { routes, Router };