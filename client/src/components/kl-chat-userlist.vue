<template>
    <el-table
        :data="users"
        style="width: 100%"
        size="mini"
        stripe
        :show-header="false"
        @row-click="handleClick"
        v-loading="update"
    >
        <el-table-column>
            <el-avatar
                src="./koala-avatar.png"
                class="avatar"
            ></el-avatar>
        </el-table-column>
        <el-table-column prop="name"></el-table-column>
    </el-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'kl-chat-userlist',
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            update: state => state.user.userLoading,
            users: state => state.user.totalUsers,
        }),
    },
    created() {
        this.fetchUsers()
    },
    methods: {
        ...mapActions(['fetchChatHistory', 'fetchUsers']),
        handleClick(row) {
            // start conversation with `row._id`
            // update chatMessages
            this.fetchChatHistory({
                withId: row._id,
                withName: row.name,
                pageNum: 0,
            })
            // notify the click event
            this.$emit('click')
        },
    },
}
</script>

<style scoped>
.avatar {
    background-color: rgba(0, 0, 0, 0);
}
</style>
