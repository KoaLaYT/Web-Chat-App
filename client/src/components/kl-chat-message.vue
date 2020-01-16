<template>
    <div :class="message.type === 'snd' ? 'right' : 'left'">
        <el-avatar
            shape="square"
            size="large"
            :src="message.avatar"
            fit="contain"
            class="avatar"
        ></el-avatar>
        <p class="content">{{ message.content }}</p>
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
}
.content {
    margin-top: 0;
    margin-bottom: 0;
    padding: 1rem;
    border-radius: 4px;
    background-color: #409eff;
}
</style>
