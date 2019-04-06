<template>
    <div style="color: #505050;">
        <br/>
        <span>
            <span style="font-size: xx-large; font-weight: bold; margin-left: 30px">事务管理</span>
            <el-button type="primary" style="margin-right: 30px; float: right" @click="getBusinessInfo">查询</el-button>
            <el-button type="primary" style="margin-right: 40px; float: right" @click="handleAdd">新增事务</el-button>
        </span><br/><br/><br/><br/>
        <div style="margin-left: 30px; margin-right: 30px">
            <span style="font-weight: bold; font-size: larger">事务信息</span><br/><br/><br/>
            <div style="margin-left: 10px">
                <span>
                    <span style="font-weight: bold">学生ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-input size="small" style="width: 200px" v-model="searchData.studentId"></el-input>
                </span>
                <span style="margin-left: 250px">
                    <span style="font-weight: bold">事务类型&nbsp;&nbsp;</span>
                    <el-select size="small" v-model="searchData.businessType" clearable>
                        <el-option
                            v-for="item in businessTypeOptions"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </span>
            </div><br/>
            <div style="margin-left: 10px">
                <span>
                    <span style="font-weight: bold">开始时间&nbsp;&nbsp;</span>
                    <el-date-picker
                        size="small"
                        range-separator="-"
                        v-model="searchData.startTime"
                        value-format="timestamp"
                        type="daterange">
                    </el-date-picker>
                </span>
                <span style="margin-left: 100px">
                    <span style="font-weight: bold">结束时间&nbsp;&nbsp;</span>
                    <el-date-picker
                        size="small"
                        range-separator="-"
                        v-model="searchData.endTime"
                        value-format="timestamp"
                        type="daterange">
                    </el-date-picker>
                </span>
            </div><br/><br/>
            <el-table border :data="businessData">
                <el-table-column label="学生ID" prop="studentId"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="事务类型" prop="businessType"></el-table-column>
                <el-table-column label="事务描述" prop="description"></el-table-column>
                <el-table-column label="开始时间" prop="startTime"></el-table-column>
                <el-table-column label="结束时间" prop="endTime"></el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleUpdate(scope.row.id)">修改</el-button>
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
        <el-dialog title="新增事务" :visible.sync="addVisible">
            <span>
                <span style="font-size: medium; font-weight: bold">学生ID</span>
                <el-input style="width: 200px; margin-left: 60px" size="small" v-model="addData.studentId"></el-input>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">事务类型</span>
                <el-select size="small" style="width: 200px; margin-left: 44px" v-model="addData.businessType" clearable>
                    <el-option
                        v-for="item in businessTypeOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                    </el-option>
                </el-select>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">开始时间</span>
                <el-date-picker
                    style="margin-left: 44px; width: 200px"
                    v-model="addData.startTime"
                    size="small"
                    value-format="timestamp"
                    type="date">
                </el-date-picker>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">结束时间</span>
                <el-date-picker
                    style="margin-left: 44px; width: 200px"
                    v-model="addData.endTime"
                    size="small"
                    value-format="timestamp"
                    type="date">
                </el-date-picker>
            </span><br/><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold; display: inline-block; vertical-align: top">事务描述</span>
                <el-input type="textarea" placeholder="请输入内容" v-model="addData.description" :rows="4" style="width: 400px; margin-left: 44px"></el-input>
            </span><br/><br/><br/><br/>
            <div style="text-align: center">
                <el-button type="success" @click="handleSendAdd">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改事务" :visible.sync="updateVisible">
            <span>
                <span style="font-size: medium; font-weight: bold">学生ID</span>
                <el-input style="width: 200px; margin-left: 60px" size="small" v-model="updateData.studentId"></el-input>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">事务类型</span>
                <el-select size="small" style="width: 200px; margin-left: 44px" v-model="updateData.businessType" clearable>
                    <el-option
                        v-for="item in businessTypeOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                    </el-option>
                </el-select>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">开始时间</span>
                <el-date-picker
                    style="margin-left: 44px; width: 200px"
                    v-model="updateData.startTime"
                    size="small"
                    value-format="timestamp"
                    type="date">
                </el-date-picker>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">结束时间</span>
                <el-date-picker
                    style="margin-left: 44px; width: 200px"
                    v-model="updateData.endTime"
                    size="small"
                    value-format="timestamp"
                    type="date">
                </el-date-picker>
            </span><br/><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold; display: inline-block; vertical-align: top">事务描述</span>
                <el-input type="textarea" placeholder="请输入内容" v-model="updateData.description" :rows="4" style="width: 400px; margin-left: 44px"></el-input>
            </span><br/><br/><br/><br/>
            <div style="text-align: center">
                <el-button type="success" @click="handleSendUpdate">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                businessTypeOptions: [{}],  // 事务类型选项

                businessData: [{}],  // 事务信息表格数据
                pageNum: 1,  // 表格当前页码
                pageSize: 5,  // 每页显示条数
                pageSizes: [5, 10, 20],  // 待选择的每页显示条数
                totalCount: 0,  // 表格中数据总条数

                searchData: {  // 待查询的条件集
                    studentId: "",  // 要查询的学生ID
                    businessType: "",  // 要查询的事务类型
                    startTime: null,  // 要查询的开始时间范围
                    endTime: null,  // 要查询的结束时间范围
                },

                startTimeLowerLimit: "",
                startTimeUpperLimit: "",
                endTimeLowerLimit: "",
                endTimeUpperLimit: "",

                addData: {  // 要添加的事务信息集
                    studentId: "",  // 要添加的学生ID
                    businessType: "",  // 要添加的事务类型
                    description: "",  // 要添加的事务描述
                    startTime: "",  // 要添加的开始时间
                    endTime: "",  // 要添加的结束时间
                },

                updateData: {  // 要修改的事务信息集
                    id: "",  // 原事务的ID
                    studentId: "",  // 要修改的学生ID
                    businessType: "",  // 要修改的事务类型
                    description: "",  // 要修改的事务描述
                    startTime: "",  // 要修改的开始时间
                    endTime: "",  // 要修改的结束时间
                },

                addVisible: false,  // 控制“新增事务”对话框是否打开
                updateVisible: false,  // 控制“修改事务”对话框是否打开
            }
        },
        methods: {
            getBusinessTypeOptions () {  // 获取事务类型选项
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/business/type',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.businessTypeOptions = result.data;
                    }
                    else {
                        this.$message({
                            message: '获取事务类型失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getBusinessInfo () {  // 获取分页事务信息
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.startTimeLowerLimit = "";
                this.startTimeUpperLimit = "";
                this.endTimeLowerLimit = "";
                this.endTimeUpperLimit = "";

                if (this.searchData.startTime != null) {
                    this.startTimeLowerLimit = this.searchData.startTime[0];
                    this.startTimeUpperLimit = this.searchData.startTime[1];
                }
                if (this.searchData.endTime != null) {
                    this.endTimeLowerLimit = this.searchData.endTime[0];
                    this.endTimeUpperLimit = this.searchData.endTime[1];
                }

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/business/search',
                    params: {
                        studentId: this.searchData.studentId,
                        businessType: this.searchData.businessType,
                        startTimeLowerLimit: this.startTimeLowerLimit,
                        startTimeUpperLimit: this.startTimeUpperLimit,
                        endTimeLowerLimit: this.endTimeLowerLimit,
                        endTimeUpperLimit: this.endTimeUpperLimit,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.businessData = result.data.recordList;
                        _this.totalCount = result.data.totalCount;
                        // 将时间戳转化为日期
                        _this.businessData.map((item)=>{
                            item.startTime = _this.timestampToDate(item.startTime);
                            item.endTime = _this.timestampToDate(item.endTime);
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
                this.getBusinessInfo();  // 重新获取表格数据
            },
            handleCurrentChange (val) {  // 处理页码变化
                this.pageNum = val;  // 将更改后的当前页码赋值给pageNum
                this.getBusinessInfo();  // 重新获取表格数据
            },
            handleAdd () {  // 处理“新增事务”按钮按下
                this.addVisible = true;
            },
            handleUpdate (val) {  // 处理“修改”按钮按下
                this.updateVisible = true;
                this.getById(val);
            },
            handleSendAdd () {  // 处理“新增事务”对话框里的保存按钮按下
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$confirm("确定要保存吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(() => {
                    _this.sendAdd();
                }).catch(() => {

                });
            },
            sendAdd () {  // 发送新增事务信息到后台
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8080/business/add',
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
                        studentId: this.addData.studentId,
                        businessType: this.addData.businessType,
                        description: this.addData.description,
                        startTime: this.addData.startTime,
                        endTime: this.addData.endTime
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 弹出成功提示框
                        _this.$message({
                            message: result.message,
                            type: 'success'
                        });
                        // 清空数据
                        _this.addData = {
                            studentId: "",
                            businessType: "",
                            description: "",
                            startTime: "",
                            endTime: "",
                        };
                        // 关闭对话框
                        _this.addVisible = false;
                        // 刷新数据
                        _this.getBusinessInfo();
                    }
                    else {
                        // 弹出错误提示框
                        _this.$message({
                            message: result.message,
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getById (val) {  // 通过ID获取待修改的历史值
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/business/get',
                    params: {
                        id: val
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.updateData = result.data;
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
            handleSendUpdate () {  // 处理“修改事务”对话框里的保存按钮按下
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$confirm("确定要保存吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(() => {
                    _this.sendUpdate();
                }).catch(() => {

                });
            },
            sendUpdate () {  // 发送修改事务信息到后台
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8080/business/update',
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
                        id: this.updateData.id,
                        studentId: this.updateData.studentId,
                        businessType: this.updateData.businessType,
                        description: this.updateData.description,
                        startTime: this.updateData.startTime,
                        endTime: this.updateData.endTime
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 弹出成功提示框
                        _this.$message({
                            message: result.message,
                            type: 'success'
                        });
                        // 清空数据
                        _this.updateData = {
                            id: "",
                            studentId: "",
                            businessType: "",
                            description: "",
                            startTime: "",
                            endTime: "",
                        };
                        // 关闭对话框
                        _this.updateVisible = false;
                        // 刷新数据
                        _this.getBusinessInfo();
                    }
                    else {
                        // 弹出错误提示框
                        _this.$message({
                            message: result.message,
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            timestampToDate (timestamp) {  // 时间戳转换为日期
                let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '  ';
                return Y+M+D;
            },
        },
        mounted () {
            this.getBusinessTypeOptions();
            this.getBusinessInfo();
        }
    }
</script>

<style scoped>

</style>
