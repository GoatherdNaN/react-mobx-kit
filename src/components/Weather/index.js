import React, { PureComponent } from 'react'
import classNames from 'classnames'
import IconFont from 'base/IconFont'
import Temperature from './Temperature1'
import styles from './index.less'

let forecast1 = [-15,-24,-25,-19,-23];
let forecast2 = [-26,-35,-31,-29,-30];

class Weather extends PureComponent {
  render() {
    return(
      <div className={styles.weather}>
        <div className={styles.cityBar}>
          <span className={styles.province}>成都</span>
          <a className={styles.changeCityBtn}></a>
          <span className={styles.updateAt}>10:30更新</span>
        </div>
        <div className={styles.todayInfo}>
          <div className={styles.curTemperature}>
            <span className={styles.temperatureNum}>7</span>
            <span className={styles.temperatureUnit}>℃</span>
          </div>
          <div className={styles.curOther}>
            <div>
              <span>59良</span>
            </div>
            <div>
              <IconFont type="icon-feng" /> 西南风 2级
            </div>
            <div>
              <IconFont type="icon-chushi" /> 相对湿度 69%
            </div>
          </div>
        </div>
        <div className={styles.temperatureCharts}>
          <ul className={classNames(styles.chartsItem,styles.text)}>
            <li className={styles.today}>今天</li>
            <li>周三</li>
            <li>周四</li>
            <li>周五</li>
            <li>周六</li>
          </ul>
          <ul className={styles.chartsItem}>
            <li>
              <div className={styles.weatherIcon}></div>
            </li>
            <li>
              <div className={styles.weatherIcon}></div>
            </li>
            <li>
              <div className={styles.weatherIcon}></div>
            </li>
            <li>
              <div className={styles.weatherIcon}></div>
            </li>
            <li>
              <div className={styles.weatherIcon}></div>
            </li>
          </ul>
          <Temperature data={forecast1} config={{ textPosition: 'up', lineColor: '#F68D3B' }} />
          <Temperature data={forecast2} config={{ textPosition: 'down', lineColor: '#94ccf9' }} />
          <ul className={styles.chartsItem}>
            <li>
              <div className={styles.weatherIcon}></div>
            </li>
            <li>
              <div className={styles.weatherIcon}></div>
            </li>
            <li>
              <div className={styles.weatherIcon}></div>
            </li>
            <li>
              <div className={styles.weatherIcon}></div>
            </li>
            <li>
              <div className={styles.weatherIcon}></div>
            </li>
          </ul>
          <ul className={classNames(styles.chartsItem,styles.text)}>
            <li>
              <p>东风</p>
              <p>&lt;3级</p>
            </li>
            <li>
              <p>东风</p>
              <p>&lt;3级</p>
            </li>
            <li>
              <p>东风</p>
              <p>&lt;3级</p>
            </li>
            <li>
              <p>东风</p>
              <p>&lt;3级</p>
            </li>
            <li>
              <p>东风</p>
              <p>&lt;3级</p>
            </li>
          </ul>
        </div>
        <div className={styles.lifeTips}>
          <ul className={styles.tipsList}>
            <li>
              <div className={styles.lifeTipsIcon}>
              <IconFont style={{ fontSize: 30 }} type="icon-taiyang" />
              </div>
              <p className={styles.lifeTipsTitle}>紫外线指数</p>
              <p>最弱</p>
            </li>
            <li>
              <div className={styles.lifeTipsIcon}>
              <IconFont style={{ fontSize: 30 }} type="icon-shangyi" />
              </div>
              <p className={styles.lifeTipsTitle}>穿衣指数</p>
              <p>薄外套</p>
            </li>
            <li>
              <div className={styles.lifeTipsIcon}>
              <IconFont style={{ fontSize: 30 }} type="icon-qichemoshi" />
              </div>
              <p className={styles.lifeTipsTitle}>洗车指数</p>
              <p>最弱</p>
            </li>
            <li>
              <div className={styles.lifeTipsIcon}>
                <IconFont style={{ fontSize: 30 }} type="icon-yao" />
              </div>
              <p className={styles.lifeTipsTitle}>感冒指数</p>
              <p>少发</p>
            </li>
          </ul>
        </div>
      </div >
    )
  }
}

export default Weather