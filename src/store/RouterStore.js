import pathToRegexp from 'path-to-regexp'
import { observable, action, computed, toJS } from 'mobx';
import { memoize } from 'utils/common'
import routes from '../routes';

export default class RouterStore {
    @observable activeRouter = {};
    @observable routerHistory = [routes[0]];

    @computed
    get activeTag() {
        return toJS(this.activeRouter);
    }
    @computed
    get history() {
        return toJS(this.routerHistory);
    }
    /**
     * 3钟情况处理：
     *      1、页面操作导致的路由变化，比如点击菜单，点击按钮跳转路由之类的
     *      2、标签操作
     *      3、地址栏输地址
     */
    @action addRouter = (path, callback) => {
        // 缓存函数优化
        const matchRoute = this.findRouteInRoutes(path);
        if (matchRoute && !matchRoute.exceptInTagBar) {
            this.activeRouter = {isLock: false, ...matchRoute};
            if (!this.checkPathInHistory(path)) {
                // home后一位插入tag
                this.routerHistory.splice(1, 0, this.activeRouter);
            }
            if (callback && typeof callback === 'function') {
                callback(matchRoute.path);
            }
        } else {
            this.activeRouter = {};
        }
    }

    @action closeTag = (path, index, callback) => {
        this.routerHistory.splice(index, 1);
        if (this.activeRouter.path === path) {
            const newActiveRouter = this.routerHistory[this.routerHistory.length - 1];
            this.activeRouter = newActiveRouter;
            if (callback && typeof callback === 'function') {
                callback(newActiveRouter.path);
            }
        }
    };

    @action closeAllTags = (callback) => {
        const lockTags = this.routerHistory.filter(tag => tag.isLock);
        this.routerHistory = [routes[0], ...lockTags];
        if (callback && typeof callback === 'function' && !this.activeRouter.isLock) {
            callback(routes[0].path);
        }
    }
    @action closeTagExceptCurrent = () => {
        if (this.routerHistory.length > 2) {
            const index = this.routerHistory.findIndex(v => v.path === this.activeRouter.path);
            const LeftHistory = this.routerHistory.slice(1, index);
            const rightHistory = this.routerHistory.slice(index + 1, this.routerHistory.length);
            const lockLeftTags = LeftHistory.filter(tag => tag.isLock);
            const lockRightTags = rightHistory.filter(tag => tag.isLock);
            this.routerHistory = [routes[0], ...lockLeftTags, this.activeRouter, ...lockRightTags];
        };
    }
    @action triggerLock = () => {
        if (this.history.length > 1) {
            const index = this.routerHistory.findIndex(v => v.path === this.activeRouter.path);
            const currentLockStatus = this.routerHistory[index].isLock;
            this.routerHistory[index].isLock = this.activeRouter.isLock = !currentLockStatus;
        }
    }

    checkPathInHistory = path => !!(
        this.routerHistory.find(v => v.path === path)
    )
    findRouteInRoutes = memoize(path => routes.find(
        route => pathToRegexp(route.path).test(path)
    ), rest => rest[0])
}