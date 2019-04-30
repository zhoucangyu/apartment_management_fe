<template>
    <div>
        <el-menu class="navbar" mode="horizontal">
            <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
            <breadcrumb />
            <span style="position: absolute; right: 10px; color: #505050">
                <span style="font-size: 15px">{{ username }}</span>
                <el-button type="text" size="mini" @click="handleLogout" style="margin-left: 5px">退出登录</el-button>
            </span>
        </el-menu>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'

    export default {
        data () {
            return {
                username: ''
            }
        },
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar'
            ])
        },
        methods: {
            toggleSideBar () {
                this.$store.dispatch('ToggleSideBar')
            },
            getUsername () {
                var _this = this;  // 将vue对象的this赋值给另一个变量，因为回调函数处于其他函数内部，this不会与任何对象绑定，为undefined

                this.$axios({
                    method: 'get',
                    url: 'http://localhost:8080/username',
                    params: {

                    }
                }).then(function(response) {
                    let result = response.data;
                    if (result.code === 1) {
                        // 赋值数据
                        _this.username = result.data;
                    }
                    else {
                        this.$message({
                            message: result.message,
                            type: 'error'
                        });
                    }
                }).catch(function(error) {

                })
            },
            handleLogout () {
                window.location.href = "http://localhost:8080/login";
            }
        },
        mounted () {
            this.getUsername();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
    .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
    .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
    }
    .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
    }
    }
    }
    }
</style>

