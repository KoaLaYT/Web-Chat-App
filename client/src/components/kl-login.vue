<template>
    <div class="login">
        <span class="login__desc">昵称：</span>
        <el-input
            v-model="name"
            size="mini"
            class="login__input"
        ></el-input>
        <el-button
            type="primary"
            size="mini"
            class="login__btn"
            @click="handleClick"
        >
            开始
        </el-button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'kl-login',
    computed: {
        name: {
            get() {
                return this.$store.state.user.loginName
            },
            set(name) {
                this.$store.commit('setName', name)
            },
        },
    },
    methods: {
        ...mapActions(['login']),
        handleClick() {
            if (this.name) {
                this.login()
            }
        },
    },
}
</script>

<style scoped>
.login {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
}
.login__desc {
    width: 4rem;
}
.login__input {
    margin: 0 1rem;
}
</style>
