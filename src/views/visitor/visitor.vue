<template>
    <div style="color: #505050;">
        <br/>
        <span>
            <span style="font-size: xx-large; font-weight: bold; margin-left: 30px">访客管理</span>
            <el-button type="primary" style="margin-right: 30px; float: right" @click="getVisitorInfo">查询</el-button>
            <el-button type="primary" style="margin-right: 40px; float: right" @click="handleAdd">新增访客记录</el-button>
        </span><br/><br/><br/><br/>
        <div style="margin-left: 30px; margin-right: 30px">
            <span style="font-weight: bold; font-size: larger">访客记录</span><br/><br/><br/>
            <div style="margin-left: 10px">
                <span>
                    <span style="font-weight: bold">访客姓名&nbsp;&nbsp;</span>
                    <el-input size="small" style="width: 200px" v-model="searchData.name"></el-input>
                </span>
                <span style="margin-left: 100px">
                    <span style="font-weight: bold">访客类型&nbsp;&nbsp;</span>
                    <el-select size="small" v-model="searchData.visitorType" clearable style="width: 200px">
                        <el-option
                            v-for="item in visitorTypeOptions"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </span>
                <span style="margin-left: 100px">
                    <span style="font-weight: bold">手机号码&nbsp;&nbsp;</span>
                    <el-input size="small" style="width: 200px" v-model="searchData.phoneNum"></el-input>
                </span>
            </div><br/>
            <div style="margin-left: 10px">
                <span>
                    <span style="font-weight: bold">证件类型&nbsp;&nbsp;</span>
                    <el-select size="small" v-model="searchData.idType" clearable style="width: 200px">
                        <el-option
                            v-for="item in idTypeOptions"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </span>
                <span style="margin-left: 100px">
                    <span style="font-weight: bold">证件号码&nbsp;&nbsp;</span>
                    <el-input size="small" style="width: 200px" v-model="searchData.idNum"></el-input>
                </span>
                <span style="margin-left: 100px">
                    <span style="font-weight: bold">访问公寓&nbsp;&nbsp;</span>
                    <el-select size="small" v-model="searchData.apartmentId" clearable style="width: 200px">
                        <el-option
                            v-for="item in apartmentNameOptions"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </span>
            </div><br/>
            <div style="margin-left: 10px">
                <span>
                    <span style="font-weight: bold">访问时间&nbsp;&nbsp;</span>
                    <el-date-picker
                        size="small"
                        range-separator="-"
                        v-model="searchData.time"
                        value-format="timestamp"
                        type="datetimerange">
                    </el-date-picker>
                </span>
            </div><br/><br/>
            <el-table border :data="visitorData">
                <el-table-column label="访客姓名" prop="name"></el-table-column>
                <el-table-column label="访问公寓" prop="apartmentName"></el-table-column>
                <el-table-column label="访客类型" prop="visitorType"></el-table-column>
                <el-table-column label="访问时间" prop="time"></el-table-column>
                <el-table-column label="证件类型" prop="idType"></el-table-column>
                <el-table-column label="证件号码" prop="idNum"></el-table-column>
                <el-table-column label="手机号码" prop="phoneNum"></el-table-column>
                <el-table-column label="访问原因" prop="reason"></el-table-column>
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
        <el-dialog title="新增访客记录" :visible.sync="addVisible">
            <span>
                <span style="font-size: medium; font-weight: bold">访客姓名</span>
                <el-input style="width: 200px; margin-left: 60px" size="small" v-model="addData.name"></el-input>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">访问公寓</span>
                <el-select size="small" style="width: 200px; margin-left: 60px" v-model="addData.apartmentId" clearable>
                    <el-option
                        v-for="item in apartmentNameOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                    </el-option>
                </el-select>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">访客类型</span>
                <el-select size="small" style="width: 200px; margin-left: 60px" v-model="addData.visitorType" clearable>
                    <el-option
                        v-for="item in visitorTypeOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                    </el-option>
                </el-select>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">访问时间</span>
                <el-date-picker
                    style="margin-left: 60px; width: 200px"
                    v-model="addData.time"
                    size="small"
                    value-format="timestamp"
                    type="datetime">
                </el-date-picker>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">证件类型</span>
                <el-select size="small" style="width: 200px; margin-left: 60px" v-model="addData.idType" clearable>
                    <el-option
                        v-for="item in idTypeOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                    </el-option>
                </el-select>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">证件号码</span>
                <el-input style="width: 200px; margin-left: 60px" size="small" v-model="addData.idNum"></el-input>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">手机号码</span>
                <el-input style="width: 200px; margin-left: 60px" size="small" v-model="addData.phoneNum"></el-input>
            </span><br/><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold; display: inline-block; vertical-align: top">访问事由</span>
                <el-input type="textarea" placeholder="请输入内容" v-model="addData.reason" :rows="3" style="width: 400px; margin-left: 60px"></el-input>
            </span><br/><br/><br/>
            <div style="text-align: center">
                <el-button type="success" @click="handleSendAdd">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改访客记录" :visible.sync="updateVisible">
            <span>
                <span style="font-size: medium; font-weight: bold">访客姓名</span>
                <el-input style="width: 200px; margin-left: 60px" size="small" v-model="updateData.name"></el-input>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">访问公寓</span>
                <el-select size="small" style="width: 200px; margin-left: 60px" v-model="updateData.apartmentId" clearable>
                    <el-option
                        v-for="item in apartmentNameOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                    </el-option>
                </el-select>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">访客类型</span>
                <el-select size="small" style="width: 200px; margin-left: 60px" v-model="updateData.visitorType" clearable>
                    <el-option
                        v-for="item in visitorTypeOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                    </el-option>
                </el-select>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">访问时间</span>
                <el-date-picker
                    style="margin-left: 60px; width: 200px"
                    v-model="updateData.time"
                    size="small"
                    value-format="timestamp"
                    type="datetime">
                </el-date-picker>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">证件类型</span>
                <el-select size="small" style="width: 200px; margin-left: 60px" v-model="updateData.idType" clearable>
                    <el-option
                        v-for="item in idTypeOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                    </el-option>
                </el-select>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">证件号码</span>
                <el-input style="width: 200px; margin-left: 60px" size="small" v-model="updateData.idNum"></el-input>
            </span><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold">手机号码</span>
                <el-input style="width: 200px; margin-left: 60px" size="small" v-model="updateData.phoneNum"></el-input>
            </span><br/><br/><br/>
            <span>
                <span style="font-size: medium; font-weight: bold; display: inline-block; vertical-align: top">访问事由</span>
                <el-input type="textarea" placeholder="请输入内容" v-model="updateData.reason" :rows="3" style="width: 400px; margin-left: 60px"></el-input>
            </span><br/><br/><br/>
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
                visitorTypeOptions: [{}],  // 访客类型选项
                idTypeOptions: [{}],  // 证件类型选项
                apartmentNameOptions: [{}],  // 公寓名称选项

                visitorData: [{}],  // 访客记录表格数据
                pageNum: 1,  // 表格当前页码
                pageSize: 5,  // 每页显示条数
                pageSizes: [5, 10, 20],  // 待选择的每页显示条数
                totalCount: 0,  // 表格中数据总条数

                searchData: {  // 待查询的条件集
                    name: "",  // 要查询的访客名称
                    visitorType: "",  // 要查询的访客类型
                    phoneNum: "",  // 要查询的手机号码
                    idType: "",  // 要查询的证件类型
                    idNum: "",  // 要查询的证件号码
                    apartmentId: "",  // 要查询的公寓ID
                    time: null,  // 要查询的访问时间范围
                },

                timeLowerLimit: "",
                timeUpperLimit: "",

                addData: {  // 要添加的访客记录信息集
                    name: "",  // 要添加的访客名称
                    apartmentId: "",  // 要添加的公寓ID
                    visitorType: "",  // 要添加的访客类型
                    time: "",  // 要添加的访问时间
                    idType: "",  // 要添加的证件类型
                    idNum: "",  // 要添加的证件号码
                    phoneNum: "",  // 要添加的手机号码
                    reason: ""  // 要添加的访问事由
                },

                updateData: {  // 要修改的访客记录信息集
                    id: "",  // 原访客记录的ID
                    name: "",  // 要添加的访客名称
                    apartmentId: "",  // 要添加的公寓ID
                    visitorType: "",  // 要添加的访客类型
                    time: "",  // 要添加的访问时间
                    idType: "",  // 要添加的证件类型
                    idNum: "",  // 要添加的证件号码
                    phoneNum: "",  // 要添加的手机号码
                    reason: ""  // 要添加的访问事由
                },

                addVisible: false,  // 控制“新增事务”对话框是否打开
                updateVisible: false,  // 控制“修改事务”对话框是否打开
            }
        },
        methods: {
            getVisitorTypeOptions () {  // 获取访客类型选项
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/visitor/visitorType',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.visitorTypeOptions = result.data;
                    }
                    else {
                        this.$message({
                            message: '获取访客类型失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getIdTypeOptions () {  // 获取证件类型选项
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/visitor/idType',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.idTypeOptions = result.data;
                    }
                    else {
                        this.$message({
                            message: '获取证件类型失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getApartmentNameOptions () {  // 获取事务类型选项
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/apartment/name',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.apartmentNameOptions = result.data;
                    }
                    else {
                        this.$message({
                            message: '获取公寓名称失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getVisitorInfo () {  // 获取分页事务信息
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.timeLowerLimit = "";
                this.timeUpperLimit = "";

                if (this.searchData.time != null) {
                    this.timeLowerLimit = this.searchData.time[0];
                    this.timeUpperLimit = this.searchData.time[1];
                }

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/visitor/search',
                    params: {
                        name: this.searchData.name,
                        visitorType: this.searchData.visitorType,
                        phoneNum: this.searchData.phoneNum,
                        idType: this.searchData.idType,
                        idNum: this.searchData.idNum,
                        apartmentId: this.searchData.apartmentId,
                        timeLowerLimit: this.timeLowerLimit,
                        timeUpperLimit: this.timeUpperLimit,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.visitorData = result.data.recordList;
                        _this.totalCount = result.data.totalCount;
                        // 将时间戳转化为日期
                        _this.visitorData.map((item)=>{
                            item.time = _this.timestampToTime(item.time);
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
                this.getVisitorInfo();  // 重新获取表格数据
            },
            handleCurrentChange (val) {  // 处理页码变化
                this.pageNum = val;  // 将更改后的当前页码赋值给pageNum
                this.getVisitorInfo();  // 重新获取表格数据
            },
            handleAdd () {  // 处理“新增访客记录”按钮按下
                this.addVisible = true;
            },
            handleUpdate (val) {  // 处理“修改”按钮按下
                this.updateVisible = true;
                this.getById(val);
            },
            handleSendAdd () {  // 处理“新增访客记录”对话框里的保存按钮按下
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$confirm("确定要保存吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(() => {
                    _this.sendAdd();
                }).catch(() => {

                });
            },
            sendAdd () {  // 发送新增访客记录信息到后台
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8080/visitor/add',
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
                        name: this.addData.name,
                        apartmentId: this.addData.apartmentId,
                        visitorType: this.addData.visitorType,
                        time: this.addData.time,
                        idType: this.addData.idType,
                        idNum: this.addData.idNum,
                        phoneNum: this.addData.phoneNum,
                        reason: this.addData.reason
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
                            name: "",
                            apartmentId: "",
                            visitorType: "",
                            time: "",
                            idType: "",
                            idNum: "",
                            phoneNum: "",
                            reason: ""
                        };
                        // 关闭对话框
                        _this.addVisible = false;
                        // 刷新数据
                        _this.getVisitorInfo();
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
                    url: 'http://localhost:8080/visitor/get',
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
            handleSendUpdate () {  // 处理“修改访客记录”对话框里的保存按钮按下
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$confirm("确定要保存吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(() => {
                    _this.sendUpdate();
                }).catch(() => {

                });
            },
            sendUpdate () {  // 发送修改访客记录信息到后台
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8080/visitor/update',
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
                        name: this.updateData.name,
                        apartmentId: this.updateData.apartmentId,
                        visitorType: this.updateData.visitorType,
                        time: this.updateData.time,
                        idType: this.updateData.idType,
                        idNum: this.updateData.idNum,
                        phoneNum: this.updateData.phoneNum,
                        reason: this.updateData.reason
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
                            name: "",
                            apartmentId: "",
                            visitorType: "",
                            time: "",
                            idType: "",
                            idNum: "",
                            phoneNum: "",
                            reason: ""
                        };
                        // 关闭对话框
                        _this.updateVisible = false;
                        // 刷新数据
                        _this.getVisitorInfo();
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
            this.getVisitorTypeOptions();
            this.getIdTypeOptions();
            this.getApartmentNameOptions();
            this.getVisitorInfo();
        }
    }
</script>

<style scoped>

</style>
