<template>
    <div :class="message.type === 'snd' ? 'right' : 'left'">
        <el-avatar
            shape="square"
            size="large"
            src="./koala-avatar.png"
            fit="contain"
            class="avatar"
        ></el-avatar>
        <p class="content">
            <i
                class="el-icon-loading"
                v-if="message.sending"
            ></i>
            {{ message.content }}
        </p>

    </div>
</template>

<script>
export default {
    name: 'KlChatMessage',
    props: {
        message: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style scoped>
.left,
.right {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    width: 60%;
    margin: 0.5rem 0;
}
.left {
    justify-content: flex-start;
    flex-direction: row;
    margin-right: auto;
}
.left .content {
    margin-right: auto;
    margin-left: 1rem;
}
.right {
    justify-content: flex-end;
    flex-direction: row-reverse;
    margin-left: auto;
}
.right .content {
    margin-left: auto;
    margin-right: 1rem;
}
.avatar {
    flex: 0 0 auto;
    background-color: rgba(0, 0, 0, 0);
}
.content {
    position: relative;
    color: white;
    margin-top: 0;
    margin-bottom: 0;
    padding: 1rem;
    border-radius: 4px;
    background-color: #409eff;
}
/* 三角 */
.content::before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border: 0.5rem solid transparent;
}
.left .content::before {
    border-right: 0.5rem solid #409eff;
    left: -1rem;
}
.right .content::before {
    border-left: 0.5rem solid #409eff;
    right: -1rem;
}
</style>
