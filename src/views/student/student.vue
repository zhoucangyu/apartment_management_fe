<template>
    <div style="color: #505050;">
        <br/>
        <span>
            <span style="font-size: xx-large; font-weight: bold; margin-left: 30px">学生管理</span>
            <el-button type="primary" style="margin-right: 30px; float: right" @click="getStudentSummary">查询</el-button>
        </span><br/><br/><br/>
        <div style="margin-left: 30px; margin-right: 30px">
            <div style="margin-left: 10px">
                <span>
                    <span style="font-weight: bold">学院&nbsp;&nbsp;</span>
                    <el-select size="small" style="width: 180px" clearable v-model="school">
                        <el-option
                            v-for="item in schoolOptions"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </span>
                <span style="margin-left: 150px">
                    <span style="font-weight: bold">专业&nbsp;&nbsp;</span>
                    <el-select size="small" style="width: 180px" clearable v-model="major">
                        <el-option
                            v-for="item in majorOptions"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </span>
                <span style="margin-left: 150px">
                    <span style="font-weight: bold">班级&nbsp;&nbsp;</span>
                    <el-input size="small" style="width: 180px" v-model="classId"></el-input>
                </span>
            </div><br/>
            <div style="margin-left: 10px">
                <span>
                    <span style="font-weight: bold">公寓&nbsp;&nbsp;</span>
                    <el-select size="small" style="width: 180px" clearable v-model="apartmentId">
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
                    <el-input size="small" style="width: 165px" v-model="roomName"></el-input>
                </span>
                <span style="margin-left: 150px">
                    <span style="font-weight: bold">当前状态&nbsp;&nbsp;</span>
                    <el-select size="small" style="width: 145px" clearable v-model="state">
                        <el-option key="0" label="公寓楼外" value="0"></el-option>
                        <el-option key="1" label="公寓楼内" value="1"></el-option>
                    </el-select>
                </span>
            </div><br/>
            <div style="margin-left: 10px">
                <span>
                    <span style="font-weight: bold">学号&nbsp;&nbsp;</span>
                    <el-input size="small" style="width: 180px" v-model="studentId"></el-input>
                </span>
                <span style="margin-left: 150px">
                    <span style="font-weight: bold">姓名&nbsp;&nbsp;</span>
                    <el-input size="small" style="width: 180px" v-model="name"></el-input>
                </span>
                <span style="margin-left: 150px">
                    <span style="font-weight: bold">性别&nbsp;&nbsp;</span>
                    <el-select size="small" style="width: 180px" clearable v-model="sex">
                        <el-option key="0" label="男" value="0"></el-option>
                        <el-option key="1" label="女" value="1"></el-option>
                    </el-select>
                </span>
            </div><br/><br/>
            <el-table border :data="studentSummary">
                <el-table-column label="学号" prop="studentId"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="性别" prop="sex"></el-table-column>
                <el-table-column label="学院" prop="school"></el-table-column>
                <el-table-column label="专业" prop="major"></el-table-column>
                <el-table-column label="班级" prop="classId"></el-table-column>
                <el-table-column label="公寓" prop="apartmentName"></el-table-column>
                <el-table-column label="房间号" prop="roomName"></el-table-column>
                <el-table-column label="当前状态" prop="state"></el-table-column>
                <el-table-column label="详细信息">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleDetail(scope.row.studentId)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="出入信息">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleAccess(scope.row.studentId)">查看</el-button>
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
        <el-dialog title="学生详细信息" :visible.sync="detailVisible" width="70%">
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
        </el-dialog>
        <el-dialog title="出入信息" :visible.sync="accessVisible">
            <span>
                <span style="font-weight: bold; font-size: medium">时间范围&nbsp;&nbsp;</span>
                <el-date-picker
                    size="small"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    v-model="timeRange"
                    value-format="timestamp"
                    type="datetimerange">
                </el-date-picker>
                <el-button type="primary" size="small" style="margin-left: 100px" @click="getAccessData">查询</el-button>
            </span><br/><br/>
            <el-table border :data="accessData">
                <el-table-column label="时间" prop="time"></el-table-column>
                <el-table-column label="出入" prop="accessType"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleAccessSizeChange"
                @current-change="handleAccessCurrentChange"
                :page-sizes="accessPageSizes"
                :page-size="accessPageSize"
                :current-page="accessPageNum"
                :total="accessTotalCount"
                layout="total, sizes, prev, pager, next, jumper"
                style="float: right">
            </el-pagination><br/>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                studentSummary: [{}],  // 学生信息表格数据
                pageNum: 1,  // 页码
                pageSize: 5,  // 页容量
                pageSizes: [5, 10, 20],  // 页容量选项
                totalCount: 0,  // 表格中条目总数

                school: "",  // 学院
                major: "",  // 专业
                classId: "",  // 班级
                apartmentId: "",  // 公寓
                roomName: "",  // 房间号
                state: "",  // 当前状态（公寓内外）
                studentId: "",  // 学号
                name: "",  // 姓名
                sex: "",  // 性别

                apartmentOptions: [{}],  // 供选择的公寓选项
                schoolOptions: [{}],  // 供选择的学院选项
                majorOptions: [{}],  // 供选择的专业选项

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

                timeRange: null,  // 查询出入信息时选取的时间范围
                startTime: "",  // 开始时间
                endTime: "",  // 结束时间
                chosenStudentId: "",  // 查询出入信息时选取的studentId

                accessData: [{}],  // 某学生的出入信息数据
                accessPageNum: 1,  // 页码
                accessPageSize: 5,  // 页容量
                accessPageSizes: [5, 10, 20],  // 页容量选项
                accessTotalCount: 0,  // 表格中条目总数

                accessVisible: false,  // 出入信息对话框是否展示
                detailVisible: false,  // 学生详细信息对话框是否展示

            }
        },
        methods: {
            getApartmentOptions () {  // 获取公寓选项
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
            getSchoolOptions () {  // 获取学院选项
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/student/school',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.schoolOptions = result.data;
                    }
                    else {
                        this.$message({
                            message: '获取学院名称失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getMajorOptions () {  // 获取专业选项
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/student/major',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.majorOptions = result.data;
                    }
                    else {
                        this.$message({
                            message: '获取专业名称失败！',
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            getStudentSummary () {  // 查询符合条件的学生信息
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/student/summary',
                    params: {
                        school: this.school,
                        major: this.major,
                        classId: this.classId,
                        apartmentId: this.apartmentId,
                        roomName: this.roomName,
                        state: this.state,
                        studentId: this.studentId,
                        name: this.name,
                        sex: this.sex,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.studentSummary = result.data.recordList;
                        _this.totalCount = result.data.totalCount;
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
            getStudentDetail (val) {
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
                        // 赋值数据
                        _this.studentDetail = result.data;
                        // 将时间戳转化为日期
                        _this.studentDetail.moveInTime = _this.timestampToDate(_this.studentDetail.moveInTime);
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
            getAccessData () {
                let _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                // 获取开始时间和结束时间
                this.startTime = "";
                this.endTime = "";

                if (this.timeRange != null) {
                    this.startTime = this.timeRange[0];
                    this.endTime = this.timeRange[1];
                }

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/student/access',
                    params: {
                        studentId: this.chosenStudentId,
                        startTime: this.startTime,
                        endTime: this.endTime,
                        pageNum: this.accessPageNum,
                        pageSize: this.accessPageSize
                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.accessData = result.data.recordList;
                        _this.accessTotalCount = result.data.totalCount;
                        // 将时间戳转化为日期
                        _this.accessData.map((item)=>{
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
            handleDetail (val) {  // 处理查看详细按钮操作
                this.detailVisible = true;
                this.getStudentDetail(val);
            },
            handleAccess (val) {  // 处理查看出入信息按钮操作
                this.accessVisible = true;
                this.chosenStudentId = val;
                this.getAccessData();

            },
            handleSizeChange (val) {  // 处理一页显示数变化
                this.pageSize = val;  // 将更改后的每页显示条数赋值给pageSize
                this.getStudentSummary();  // 重新获取表格数据
            },
            handleCurrentChange (val) {  // 处理页码变化
                this.pageNum = val;  // 将更改后的当前页码赋值给pageNum
                this.getStudentSummary();  // 重新获取表格数据
            },
            handleAccessSizeChange (val) {  // 处理一页显示数变化
                this.accessPageSize = val;  // 将更改后的每页显示条数赋值给accessPageSize
                this.getAccessData();  // 重新获取表格数据
            },
            handleAccessCurrentChange (val) {  // 处理页码变化
                this.accessPageNum = val;  // 将更改后的当前页码赋值给accessPageNum
                this.getAccessData();  // 重新获取表格数据
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
            this.getSchoolOptions();
            this.getMajorOptions();
            this.getStudentSummary();
        }
    }
</script>

<style scoped>

</style>
