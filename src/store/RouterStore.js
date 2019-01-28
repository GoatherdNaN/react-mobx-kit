import { observable, action, computed, toJS } from 'mobx';
import routes, { findRouteInRoutes } from '../routes';

export default class RouterStore {
    @observable activeTag = routes[0];
    @observable routerHistory = [routes[0]];

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
    @action addRouter = (path) => {
        // 缓存函数优化
        const matchRoute = findRouteInRoutes(path);
        if (matchRoute && !matchRoute.exceptInTagBar) {
            const index = this.getIndexInHistory(path);
            if (index < 0) {
                // home后一位插入tag
                const currentRouter = {isLock: false, ...matchRoute}
                this.routerHistory.splice(1, 0, currentRouter);
                this.activeTag = {index: 1, ...currentRouter};
            } else {
                this.triggerRouter(this.routerHistory[index], index);
            }
        } else {
            this.activeTag = {};
        }
    }

    @action triggerRouter = (router, index, callback) => {
        this.activeTag = { index, ...router };
        if (typeof callback === 'function') {
            callback(router.path);
        }
    }

    @action closeTag = (path, index, callback) => {
        this.routerHistory.splice(index, 1);
        if (this.activeTag.path === path) {
            const newactiveTag = this.routerHistory[this.routerHistory.length - 1];
            this.activeTag = newactiveTag;
            if (typeof callback === 'function') {
                callback(newactiveTag.path);
            }
        }
    };

    @action closeAllTags = (callback) => {
        if (this.activeTag.isLock) {
            this.closeTagExceptCurrent();
        }
        else if(typeof callback === 'function') {
            const lockTags = this.routerHistory.filter(tag => tag.isLock);
            this.routerHistory = [routes[0], ...lockTags];
            this.activeTag = { index: 0, isLock: true, ...routes[0] };
            callback(routes[0].path);
        }
    }
    @action closeTagExceptCurrent = () => {
        if (this.routerHistory.length > 2) {
            const current = this.activeTag.index;
            const LeftHistory = this.routerHistory.slice(1, current);
            const rightHistory = this.routerHistory.slice(current + 1, this.routerHistory.length);
            const lockLeftTags = LeftHistory.filter(tag => tag.isLock);
            const lockRightTags = rightHistory.filter(tag => tag.isLock);
            this.activeTag.index = lockLeftTags.length + 1;
            this.routerHistory = [routes[0], ...lockLeftTags, this.activeTag, ...lockRightTags];
        };
    }

    @action triggerLock = () => {
        if (this.history.length > 1) {
            const index = this.routerHistory.findIndex(v => v.path === this.activeTag.path);
            const currentLockStatus = this.routerHistory[index].isLock;
            this.routerHistory[index].isLock = this.activeTag.isLock = !currentLockStatus;
        }
    }

    getIndexInHistory = path => this.routerHistory.findIndex(v => v.path === path);
}