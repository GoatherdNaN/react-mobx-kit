import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const MODE = {
  maxTemp: 'maxTemp',
  minTemp: 'minTemp'
};

const defaultConfig = {
  [`${MODE.maxTemp}Color`]: '#f00000',
  [`${MODE.minTemp}Color`]: '#94ccf9',
  itemWidth: 120, // 两天之间的长度值
  drop: 80, // 最高点和最低点的差值，不设置默认为canvas高度的一般
  initX: 53, // 初始化x轴偏移量
  initY: -50, // 初始化y轴偏移量
  fontColor: '#333',
  lineWidth: 1,
  fontSize: 12,
  dotRadii: 2
};


class Temperature extends PureComponent {
  constructor(props) {
    super(props);
    this.config = { ...defaultConfig, ...props.config };
    this.temperatureCanvas = React.createRef();
  }

  componentDidMount() {
    this.showTemperature(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if (!data.length && nextProps.data.length) {
      this.showTemperature(nextProps);
    }
  }

  showTemperature = props => {
    const { data } = props;
    if (!data.length) return;

    const {
      drop,
      initX,
      initY
    } = this.config;

    // 初始化最高气温
    let maxTemp = data[0]['maxTemp'];      
    // 初始化最低气温    
    let minTemp = data[0]['minTemp'];
    // 保存每天最高（低）气温数据               
    const maxTemps = [];     
    const minTemps = [];
    // 遍历天气数据
    data.forEach(dayTemp => {
      let dayMaxTemp = dayTemp.maxTemp;
      let dayMinTemp = dayTemp.minTemp;

      // 如果当天最高气温高于最高气温，则最高气温变成当天最高气温    
      if(dayMaxTemp > maxTemp) {
        maxTemp = dayMaxTemp;
      }
      if(dayMinTemp < minTemp) {
        minTemp = dayMinTemp;
      }
      maxTemps.push(dayMaxTemp);
      minTemps.push(dayMinTemp);
    });
    //计算每度对应的px。80是自己设定的，这里画布总高是174,所以我设定这几天最高温度和最低温度之间间距为80。  
    let spacing = drop / (maxTemp - minTemp);
    //画布的偏移量，53是画布x轴从左向右方向偏移。
    //后面的值是y轴（细说一下：web里面的坐标轴和我们数学知识上学习的坐标系，y轴是相反的。
    //故这里画点为了让温度高的点显示在温度低的上面，我们要取反。
    //取反以后这个点就跑到画布以外去了，所以我们要向正方向偏移出来。
    //偏移的数值，我这里是选择了最高温度所占对应px加上每个点上要写文字的距离，从而计算出来）。
    const canvas = this.temperatureCanvas.current;
    const context = canvas.getContext("2d");
    context.translate(initX, maxTemp * spacing + initY);

    this.drawCharts(context, maxTemps, spacing, MODE.maxTemp);
    this.drawCharts(context, minTemps, spacing, MODE.minTemp);     
  }

  drawCharts = (context, lineData, spacing, mode = MODE.maxTemp) => {
    const {
      itemWidth,
      fontColor,
      lineWidth,
      fontSize,
      dotRadii,
      [`${mode}Color`]: lineColor
    } = this.config;
    const dots = [];

    lineData.forEach((item, i) => {
      //画点
      context.beginPath();            
      let y = Math.round(item * spacing);       
      let x = i * itemWidth;
      context.arc(x, -y, dotRadii, 0, 2 * Math.PI, true);          
      context.strokeStyle = lineColor;         
      context.stroke();          
      context.fillStyle = lineColor;          
      context.fill();          
      context.closePath();           //画线

      dots.push({
        x,
        y: -y
      });            //写文字
      context.beginPath();       
      context.font = `${fontSize}px 微软雅黑`;      
      context.fillStyle = fontColor;        
      context.fillText(
        `${item}°C`,
        x - 10,
        mode === MODE.maxTemps ? -y - 20 : -y + 30,
        50
      );        
      context.stroke();            
      context.closePath(); 
    });
    // 连线           
    for(let i = 0, len = dots.length; i < len; i++) {
      const dotData = dots[i];
      context.beginPath();              
      context.moveTo(dotData.x, dotData.y);
      if(i !== len - 1) {
        context.lineTo(dots[i + 1].x, dots[i + 1].y);          
      }     
      context.strokeStyle = lineColor;               
      context.lineWidth = lineWidth;          
      context.stroke();               
      context.closePath();         
    }  
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas ref={this.temperatureCanvas} width={width} height={height}></canvas>
    )
  }
}

Temperature.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number
}

Temperature.defaultProps = {
  data: [],
  width: 832,
  height: 174,
  config: {}
}

export default Temperature;
