<template>
  <div style="color: #505050;">
      <br/>
      <span>
            <span style="font-size: xx-large; font-weight: bold; margin-left: 30px">信息总览</span>
            <el-button type="primary" style="margin-right: 30px; float: right" @click="handleRefresh">刷新</el-button>
      </span><br/><br/><br/>
      <div style="margin-left: 30px; margin-right: 30px">
          <div class="chartBox" id="accessChart"></div>
          <div class="chartBox" id="majorChart"></div>
          <div class="chartBox" id="apartmentChart"></div>
          <div class="chartBox" id="sexChart"></div><br/><br/>
      </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                accessChartData: [{}],  // 出入分布图表数据
                majorChartData: [{}],  // 专业分布图表数据
                apartmentChartData: [{}],  // 公寓人数分布图表数据
                sexChartData: [{}],  // 性别分布数据图表数据
            }
        },
        methods: {
            getAccessChartData () {
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/index/access',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.accessChartData = result.data;
                        // 描绘图表
                        _this.drawAccessChart();
                    }
                    else {
                        this.$message({
                            message: '获取出入分布图表数据失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getMajorChartData () {
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/index/major',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.majorChartData = result.data;
                        // 描绘图表
                        _this.drawMajorChart();
                    }
                    else {
                        this.$message({
                            message: '获取专业分布图表数据失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getApartmentChartData () {
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/index/apartment',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.apartmentChartData = result.data;
                        // 描绘图表
                        _this.drawApartmentChart();
                    }
                    else {
                        this.$message({
                            message: '获取公寓人数分布图表数据失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getSexChartData () {
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/index/sex',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.sexChartData = result.data;
                        // 描绘图表
                        _this.drawSexChart();
                    }
                    else {
                        this.$message({
                            message: '获取性别分布图表数据失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            drawAccessChart () {
                let accessChart = this.$echarts.init(document.getElementById('accessChart'));
                let option = {
                    title : {
                        text: '学生位置分布',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['公寓楼内','公寓楼外']
                    },
                    series : [
                        {
                            name: '学生位置分布',
                            type: 'pie',
                            radius : '65%',
                            center: ['50%', '50%'],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            data: this.accessChartData
                        }
                    ]
                };
                accessChart.setOption(option);

                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener('resize',function() {accessChart.resize()});
            },
            drawMajorChart () {
                let majorChart = this.$echarts.init(document.getElementById('majorChart'));
                let option = {
                    title : {
                        text: '专业人数分布',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['通信工程','计算机科学','软件工程']
                    },
                    series : [
                        {
                            name: '学生位置分布',
                            type: 'pie',
                            radius : '65%',
                            center: ['50%', '50%'],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            data: this.majorChartData
                        }
                    ]
                };
                majorChart.setOption(option);

                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener('resize',function() {majorChart.resize()});
            },
            drawApartmentChart () {
                let apartmentChart = this.$echarts.init(document.getElementById('apartmentChart'));
                let option = {
                    title : {
                        text: '公寓人数分布',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['学生公寓一','学生公寓二','学生公寓三']
                    },
                    series : [
                        {
                            name: '公寓人数分布',
                            type: 'pie',
                            radius : '65%',
                            center: ['50%', '50%'],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            data: this.apartmentChartData
                        }
                    ]
                };
                apartmentChart.setOption(option);

                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener('resize',function() {apartmentChart.resize()});
            },
            drawSexChart () {
                let sexChart = this.$echarts.init(document.getElementById('sexChart'));
                let option = {
                    title : {
                        text: '学生性别分布',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['男','女']
                    },
                    series : [
                        {
                            name: '学生性别分布',
                            type: 'pie',
                            radius : '65%',
                            center: ['50%', '50%'],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            data: this.sexChartData
                        }
                    ]
                };
                sexChart.setOption(option);

                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener('resize',function() {sexChart.resize()});
            },
            handleRefresh () {
                this.getAccessChartData();
                this.getMajorChartData();
                this.getApartmentChartData();
                this.getSexChartData();
            },
        },
        mounted () {
            this.handleRefresh();
        },
    }
</script>

<style scoped>
    .chartBox {
        height: 370px;
        width: 600px;
        border: 1px solid;
        display: inline-block;
    }
</style>
