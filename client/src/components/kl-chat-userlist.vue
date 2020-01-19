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
import { SERVER, fetchWithLoading } from '../util'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'kl-chat-userlist',
    data() {
        return {
            users: [],
            update: false,
        }
    },
    computed: {
        ...mapState(['userInfo']),
    },
    created() {
        this.fetchUsers()
    },
    methods: {
        ...mapActions(['fetchChatHistory']),
        async fetchUsers() {
            fetchWithLoading.bind(this)(async () => {
                const res = await fetch(
                    `${SERVER}/user?self=${this.userInfo.id}`,
                    {
                        method: 'GET',
                    },
                )
                this.users = await res.json()
            })
        },
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
