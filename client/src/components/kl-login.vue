<template>
    <div class="login">
        <span class="login__desc">昵称：</span>
        <el-input v-model="name" size="mini" class="login__input"></el-input>
        <el-button type="primary" size="mini" class="login__btn" @click="login">
            开始
        </el-button>
    </div>
</template>

<script>
import { SERVER } from '@/util'

export default {
    name: 'kl-login',
    data() {
        return {
            name: '',
        }
    },
    methods: {
        async login() {
            if (this.name) {
                const data = { name: this.name }
                // eslint-disable-next-line
                console.log(data)
                const res = await fetch(`${SERVER}/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                // eslint-disable-next-line
                console.log(res)
                // this.$emit('login', this.name)
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
