<template>
    <div style="color: #505050;">
        <br/>
        <span>
            <span style="font-size: xx-large; font-weight: bold; margin-left: 30px">公寓管理</span>
            <el-button type="primary" style="margin-right: 30px; float: right">录入数据</el-button>
        </span><br/><br/><br/><br/><br/>
        <div style="margin-left: 30px; margin-right: 30px">
            <span style="font-weight: bold; font-size: larger">入住信息</span><br/><br/><br/>
            <div style="margin-left: 10px">
                <span>
                    <span style="font-weight: bold">公寓&nbsp;&nbsp;</span>
                    <el-select size="small" style="width: 180px" v-model="searchData.apartmentId" clearable>
                        <el-option
                            v-for="item in apartmentOptions"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </span>
                <span style="margin-left: 150px">
                    <span style="font-weight: bold">房间号&nbsp;&nbsp;</span>
                    <el-input size="small" style="width: 180px;" v-model="searchData.roomName"></el-input>
                </span>
                <span style="float: right">
                    <el-button type="primary" size="small" @click="handleSearchDetail()">查询</el-button>
                </span>
            </div><br/>
            <el-table border :data="detailData">
                <el-table-column label="公寓" prop="apartmentName"></el-table-column>
                <el-table-column label="房间号" prop="roomName"></el-table-column>
                <el-table-column label="入住信息">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleAccommodation(scope.row.roomId)">查看</el-button>
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
        <el-dialog title="入住信息" :visible.sync="accommodationVisible">
            <span style="font-weight: bold; font-size: medium">当前入住</span><br/><br/>
            <el-table border :data="nowData">
                <el-table-column label="学号" prop="studentId"></el-table-column>
                <el-table-column label="姓名" prop="studentName"></el-table-column>
                <el-table-column label="入住时间" prop="moveInTime"></el-table-column>
                <el-table-column label="详细信息">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleStudent(scope.row.studentId)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table><br/>
            <span style="font-weight: bold; font-size: medium">历史入住</span><br/><br/>
            <el-table border :data="historyData">
                <el-table-column label="学号" prop="studentId"></el-table-column>
                <el-table-column label="姓名" prop="studentName"></el-table-column>
                <el-table-column label="入住时间" prop="moveInTime"></el-table-column>
                <el-table-column label="搬出时间" prop="moveOutTime"></el-table-column>
                <el-table-column label="详细信息">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleStudent(scope.row.studentId)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="学生详细信息" :visible.sync="studentVisible" width="80%">
            <div>
                <div>
                    <span style="position: absolute; left: 5%">
                        <span style="font-weight: bold">姓名&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.studentName }}</span>
                    </span>
                    <span style="position: absolute; left: 23%">
                        <span style="font-weight: bold">学号&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.studentId }}</span>
                    </span>
                    <span style="position: absolute; left: 41%">
                        <span style="font-weight: bold">性别&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.sex }}</span>
                    </span>
                </div><br/><br/>
                <div>
                    <span style="position: absolute; left: 5%">
                        <span style="font-weight: bold">学院&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.school }}</span>
                    </span>
                    <span style="position: absolute; left: 23%">
                        <span style="font-weight: bold">专业&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.major }}</span>
                    </span>
                    <span style="position: absolute; left: 41%">
                        <span style="font-weight: bold">班级&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.classId }}</span>
                    </span>
                    <span style="position: absolute; left: 59%">
                        <span style="font-weight: bold">班主任&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.teacher }}</span>
                    </span>
                    <span style="position: absolute; left: 77%">
                        <span style="font-weight: bold">辅导员&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.counselor }}</span>
                    </span>
                </div><br/><br/>
                <div>
                    <span style="position: absolute; left: 5%">
                        <span style="font-weight: bold">公寓&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.apartmentName }}</span>
                    </span>
                    <span style="position: absolute; left: 23%">
                        <span style="font-weight: bold">房间号&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.roomName }}</span>
                    </span>
                    <span style="position: absolute; left: 41%">
                        <span style="font-weight: bold">入住时间&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.moveInTime }}</span>
                    </span>
                    <span style="position: absolute; left: 59%">
                        <span style="font-weight: bold">公寓负责人&nbsp;&nbsp;</span>
                        <span>{{ studentDetail.principal }}</span>
                    </span>
                </div><br/><br/>
                <div>
                    <span style="position: absolute; left: 5%; font-weight: bold">照片&nbsp;&nbsp;</span>
                    <div><img  style="position: absolute; left: 10%" height="100px" width="100px" :src="studentDetail.pic" /></div>
                </div><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            <div>

            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                apartmentOptions: [{}],  // 公寓选项

                searchData: {  // 查询公寓详细信息的查询条件
                    apartmentId: "",
                    roomName: ""
                },

                detailData: [{}],  // 公寓详细信息数据
                pageNum: 1,  // 表格当前页码
                pageSize: 5,  // 每页显示条数
                pageSizes: [5, 10, 20],  // 待选择的每页显示条数
                totalCount: 0,  // 表格中数据总条数

                nowData: [{}],  // 当前入住信息表格数据
                historyData: [{}],  // 历史入住信息表格数据

                studentDetail: {  // 学生详细信息数据
                    studentName: "",
                    studentId: "",
                    sex: "",
                    pic: "",
                    school: "",
                    major: "",
                    classId: "",
                    teacher: "",
                    counselor: "",
                    apartmentName: "",
                    roomName: "",
                    moveInTime: "",
                    principal: ""
                },

                accommodationVisible: false,  // 入住信息对话框是否展示
                studentVisible: false,  // 学生详细信息对话框是否展示
            }
        },
        methods: {
            getApartmentOptions () {  // 获取公寓名称选项
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
                        _this.apartmentOptions = result.data;
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
            handleSearchDetail () {  // 查询公寓详细信息数据
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/apartment/detail',
                    params: {
                        apartmentId: this.searchData.apartmentId,
                        roomName: this.searchData.roomName,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        let result = response.data;
                        if (result.code === 1) {
                            // 赋值数据
                            _this.detailData = result.data.recordList;
                            _this.totalCount = result.data.totalCount;
                        }
                        else {
                            this.$message({
                                message: '查询公寓详细信息失败！',
                                type: 'error'
                            });
                        }

                    }
                }).catch(function(error) {

                })
            },
            handleSizeChange (val) {  // 处理一页显示数变化
                this.pageSize = val;  // 将更改后的每页显示条数赋值给pageSize
                this.handleSearchDetail();  // 重新获取表格数据
            },
            handleCurrentChange (val) {  // 处理页码变化
                this.pageNum = val;  // 将更改后的当前页码赋值给pageNum
                this.handleSearchDetail();  // 重新获取表格数据
            },
            handleAccommodation (val) {  // 查询该宿舍居住情况
                this.accommodationVisible = true;  // 打开入住信息对话框

                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                // 获取当前入住信息
                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/apartment/now',
                    params: {
                        roomId: val
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        let result = response.data;
                        if (result.code === 1) {
                            // 赋值数据
                            _this.nowData = result.data;
                            // 将时间戳转化为日期
                            _this.nowData.map((item)=>{
                                item.moveInTime = _this.timestampToDate(item.moveInTime);
                            });
                        }
                        else {
                            this.$message({
                                message: '获取当前入住信息失败！',
                                type: 'error'
                            });
                        }

                    }
                }).catch(function(error) {

                })

                // 获取历史入住信息
                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/apartment/history',
                    params: {
                        roomId: val
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        let result = response.data;
                        if (result.code === 1) {
                            // 赋值数据
                            _this.historyData = result.data;
                            // 将时间戳转化为日期
                            _this.historyData.map((item)=>{
                                item.moveInTime = _this.timestampToDate(item.moveInTime);
                                item.moveOutTime = _this.timestampToDate(item.moveOutTime);
                            });
                        }
                        else {
                            this.$message({
                                message: '获取历史入住信息失败！',
                                type: 'error'
                            });
                        }

                    }
                }).catch(function(error) {

                })
            },
            handleStudent (val) {
                this.studentVisible = true;  // 打开学生详细对话框

                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/student/detail',
                    params: {
                        studentId: val
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        let result = response.data;
                        if (result.code === 1) {
                            // 赋值数据
                            _this.studentDetail = result.data;
                            // 将时间戳转化为日期
                            _this.studentDetail.moveInTime = _this.timestampToDate(_this.studentDetail.moveInTime);
                        }
                        else {
                            this.$message({
                                message: '获取学生详细信息失败！',
                                type: 'error'
                            });
                        }

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
            this.getApartmentOptions();
            this.handleSearchDetail();
        }
    }
</script>

<style scoped>

</style>
