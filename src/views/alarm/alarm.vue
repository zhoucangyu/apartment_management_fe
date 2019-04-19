<template>
    <div style="color: #505050;">
        <br/>
        <span>
            <span style="font-size: xx-large; font-weight: bold; margin-left: 30px">报警平台</span>
            <el-button type="primary" style="margin-right: 30px; float: right" @click="getAlarmInfo">查询</el-button>
        </span><br/><br/><br/><br/>
        <div style="margin-left: 30px; margin-right: 30px">
            <span style="font-weight: bold; font-size: larger">报警信息</span><br/><br/><br/>
            <div style="margin-left: 10px">
                <span>
                    <span style="font-weight: bold">学生ID&nbsp;&nbsp;</span>
                    <el-input size="small" style="width: 200px" v-model="searchData.studentId"></el-input>
                </span>
                <span style="margin-left: 100px">
                    <span style="font-weight: bold">报警类型&nbsp;&nbsp;</span>
                    <el-select size="small" v-model="searchData.alarmType" clearable style="width: 200px">
                        <el-option
                            v-for="item in alarmTypeOptions"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </span>
                <span style="margin-left: 100px">
                    <span style="font-weight: bold">是否已处理&nbsp;&nbsp;</span>
                    <el-select size="small" v-model="searchData.isHandled" clearable style="width: 200px">
                        <el-option
                            v-for="item in isHandledOptions"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </span>
            </div><br/><br/>
            <el-table border :data="alarmData">
                <el-table-column label="学生ID" prop="studentId"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="报警类型" prop="alarmType"></el-table-column>
                <el-table-column label="公寓名称" prop="apartmentName"></el-table-column>
                <el-table-column label="开始时间" prop="startTime"></el-table-column>
                <el-table-column label="结束时间" prop="endTime"></el-table-column>
                <el-table-column label="是否已处理">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isHandled==='已处理'">
                            {{ scope.row.isHandled }}
                        </div>
                        <div v-if="scope.row.isHandled==='未处理'">
                            <span>
                                <span>{{ scope.row.isHandled }}/</span>
                                <el-button type="text" @click="handleAlarm(scope.row.id)">现在处理</el-button>
                            </span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                :current-page="pageNum"
                :total="totalCount"
                layout="total, sizes, prev, pager, next, jumper"
                style="float: right">
            </el-pagination><br/><br/><br/>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                alarmTypeOptions: [{}],  // 报警类型选项
                isHandledOptions: [{}],  // 是否已处理选项

                alarmData: [{}],  // 报警信息表格数据
                pageNum: 1,  // 表格当前页码
                pageSize: 5,  // 每页显示条数
                pageSizes: [5, 10, 20],  // 待选择的每页显示条数
                totalCount: 0,  // 表格中数据总条数

                searchData: {  // 待查询的条件集
                    studentId: "",  // 要查询的学生ID
                    alarmType: "",  // 要查询的报警类型
                    isHandled: "",  // 要查询的是否已处理
                }
            }
        },
        methods: {
            getAlarmTypeOptions () {  // 获取访客类型选项
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/alarm/alarmType',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.alarmTypeOptions = result.data;
                    }
                    else {
                        this.$message({
                            message: '获取报警类型失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getIsHandledOptions () {  // 获取证件类型选项
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/alarm/isHandled',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.isHandledOptions = result.data;
                    }
                    else {
                        this.$message({
                            message: '获取是否已处理失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getAlarmInfo () {  // 获取分页事务信息
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/alarm/search',
                    params: {
                        studentId: this.searchData.studentId,
                        alarmType: this.searchData.alarmType,
                        isHandled: this.searchData.isHandled,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.alarmData = result.data.recordList;
                        _this.totalCount = result.data.totalCount;
                        // 将时间戳转化为日期
                        _this.alarmData.map((item)=>{
                            item.startTime = _this.timestampToTime(item.startTime);
                            item.endTime = _this.timestampToTime(item.endTime);
                        });
                    }
                    else {
                        this.$message({
                            message: '查询失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            handleSizeChange (val) {  // 处理一页显示数变化
                this.pageSize = val;  // 将更改后的每页显示条数赋值给pageSize
                this.getAlarmInfo();  // 重新获取表格数据
            },
            handleCurrentChange (val) {  // 处理页码变化
                this.pageNum = val;  // 将更改后的当前页码赋值给pageNum
                this.getAlarmInfo();  // 重新获取表格数据
            },
            handleAlarm (val) {
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$confirm("确定处理该报警信息吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(() => {
                    _this.$axios({
                        method: 'post',
                        url: 'http://localhost:8080/alarm/handle',
                        headers: {  // 修改数据编码格式
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: [function (data) {  // 修改数据编码格式
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }],
                        data: {
                            id: val
                        }
                    }).then(function(response) {
                        let result = response.data;
                        if (result.code === 1) {
                            _this.$message({
                                message: '处理成功！',
                                type: 'success'
                            });
                            _this.getAlarmInfo();
                        }
                        else {
                            _this.$message({
                                message: result.message,
                                type: 'error'
                            });
                        }
                    }).catch(function(error) {

                    })
                }).catch(() => {

                });
            },
            timestampToTime (timestamp) {  // 时间戳转换为日期和时间
                let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '  ';
                let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
                let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
                let s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
                return Y+M+D+h+m+s;
            }
        },
        mounted () {
            this.getAlarmTypeOptions();
            this.getIsHandledOptions();
            this.getAlarmInfo();
        }
    }
</script>

<style scoped>

</style>
