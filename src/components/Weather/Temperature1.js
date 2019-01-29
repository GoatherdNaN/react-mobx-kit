/*
 * @Author: Edlan
 * @Date: 2019-01-16 09:17:27
 * @Description: 温度折线
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// 文本在上还是在下
const TEXT_POSITION = {
  up: 'up',
  down: 'down'
};
// 默认配置
const defaultConfig = {
  drop: 28, // 可以理解为文字显示所占高度
  margin: 4, // 文字对立边的边距
  lineWidth: 1, // 线宽
  fontSize: 12, // 字体大小
  dotRadii: 3, // 节点半径
  fontColor: '#333', // 字体颜色
  lineColor: '#F68D3B', // 线的颜色
  textPosition: TEXT_POSITION.up, // 文字方向
  unit: '℃'
};
// 点
function DotTemp({ dots, config }) {
  if (!dots) return null;
  const mode = config.textPosition === TEXT_POSITION.up ? 1 : -1;
  const paddingTextToDot = mode === 1 ? 0 : 8;
  return dots.map((dot, i) => ([
    <circle
      key={'circle' + i}
      r={config.dotRadii}
      stroke={null}
      fill={config.lineColor}
      cx={dot.x}
      cy={dot.y}
      strokeWidth={config.lineWidth}
    />,
    <text
      key={'text' + i}
      x={dot.x}
      y={dot.y - mode * (config.fontSize + paddingTextToDot)}
      fill={config.fontColor}
      fontSize={config.fontSize}
      textAnchor='middle'
    >
      {`${dot.data}${config.unit}`}
    </text>
  ]))
}

function getPathInfo(data) {
  let d = '', pathLength = 0;
  try {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const preItem = data[i - 1];
      // 计算path标签的d值
      if(i === 0) {
        d = `M${item.x} ${item.y}`
      } else {
        d += ` L ${item.x} ${item.y}`
        // 计算路径长度
        let diffX = item.x - preItem.x;
        let diffY = item.y - preItem.y;
        pathLength += Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2));
      }
    }
    pathLength = Math.ceil(pathLength);
  } finally {
    return {
      d,
      pathLength
    };
  }
}
class LineTemp extends PureComponent {
  constructor(props) {
    super(props);
    const { d, pathLength } = getPathInfo(props.dots);
    this.state = {
      d,
      dashArray: pathLength,
      dashOffset: pathLength,
    }
  }

  componentDidMount() {
    this.draw(); // 执行动画
  }

  componentWillUnmount() {
    this.setState = () => { };
  }

  componentWillReceiveProps(nextProps) {
    const { dots } = this.props;
    if (JSON.stringify(dots) !== JSON.stringify(nextProps.dots)) {
      const { d, pathLength } = getPathInfo(nextProps.dots);
      this.setState({
        d,
        dashArray: pathLength,
        dashOffset: pathLength,
      }, this.draw);
    }
  }

  draw = () => {
    let currnet = this.state.dashOffset;
    const animate = () => {
      if (currnet > 0) {
        currnet = currnet - 3 < 0 ? 0 : currnet - 3;
        this.setState({
          dashOffset: currnet
        });
        timer = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(timer);
      }
    };
    let timer = requestAnimationFrame(animate);
  }

  render() {
    const { config } = this.props;
    const { d, dashArray, dashOffset } = this.state;
    return (
      <path
        ref={this.line}
        fill="transparent"
        stroke={config.lineColor}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        strokeWidth={config.lineWidth}
        d={d}
      />
    )
  }
}

class Temperature extends PureComponent {
  constructor(props) {
    super(props);
    this.config = { ...defaultConfig, ...props.config };
    this.svgEle = React.createRef();
    this.state = {
      width: 0
    }
  }

  componentDidMount() {
    const { width } = this.svgEle.current.getBoundingClientRect();
    this.setState({ width });
  }

  getDots = data => {
    const { drop, margin, textPosition, dotRadii } = this.config;
    const { height } = this.props;
    const { width } = this.state;

    if (!width) return;
    const itemWidth = width / (data.length);
    const initX = itemWidth / 2;
    const max = Math.max.apply(null, data);
    const min = Math.min.apply(null, data);

    // 温差
    const tempRange = max - min;
    //计算单位像素
    let spacing = (height - drop - margin) / tempRange;
    const rule = textPosition === TEXT_POSITION.up ? margin : drop;

    return data.map((item, i) => ({
      x: Math.floor(i * itemWidth + initX),
      y: Math.floor(height - rule - (dotRadii / 2) - spacing * (item - min)),
      data: item
    }));
  }

  render() {
    const { data, height } = this.props;
    if (!data.length) {
      return null;
    }

    const dots = this.getDots(data);
    const props = {
      dots,
      config: this.config
    };

    return (
      <svg height={height} width="100%" ref={this.svgEle}>
        <DotTemp {...props} />
        {
          // 两点才能成线
          data && data.length > 1 && (
            <LineTemp {...props} />
          )
        }
      </svg>
    )
  }
}

Temperature.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object,
  height: PropTypes.number
}

Temperature.defaultProps = {
  data: [],
  config: {},
  height: 60,
}

export default Temperature;
