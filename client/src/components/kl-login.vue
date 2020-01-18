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
            @click="login"
        >
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
                const res = await fetch(`${SERVER}/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: this.name }),
                })
                this.$emit('login', { id: await res.json(), name: this.name })
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
