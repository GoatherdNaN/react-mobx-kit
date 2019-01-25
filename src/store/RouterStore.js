import pathToRegexp from 'path-to-regexp'
import { observable, action, computed, toJS } from 'mobx';
import routes from '../routes';

export default class RouterStore {
    @observable activeRouter = {};
    @observable routerHistory = [routes[0]];

    @computed
    get activeTag() {
        return toJS(this.activeRouter).path;
    }
    @computed
    get history() {
        return toJS(this.routerHistory);
    }

    @action addRouter = (path, callback) => {
        const matchRoute = routes.find(
            route => pathToRegexp(route.path).test(path)
        );
        if (matchRoute) {
            this.activeRouter = matchRoute;
            if (!this.routerHistory.find(v => v.path === path)) {
                // home后一位插入tag
                this.routerHistory.splice(1, 0, matchRoute);
            }
            if (callback && typeof callback === 'function') {
                callback(newActiveRouter.path);
            }
        }
    }

    @action closeTag = (path, callback) => {
        const index = this.routerHistory.findIndex(v => v.path === path);
        if (index > -1) {
            this.routerHistory.splice(index, 1);
            if (this.activeTag === path) {
                const newActiveRouter = this.history[this.history.length - 1];
                this.activeRouter = newActiveRouter;
                if (callback && typeof callback === 'function') {
                    callback(newActiveRouter.path);
                }
            }
        }
    };

    @action closeTagExceptCurrent = () => {
        if (this.activeRouter.code) {
            this.routerHistory = [routes[0], this.activeRouter];
        }
    }
}