<template>
    <div class="layout">
        <aside class="layout__aside">
            <slot name="sidebar"></slot>
        </aside>
        <main class="layout__main">
            <section class="layout__main__messages">
                <slot name="messages"></slot>
            </section>
            <section class="layout__main__input">
                <slot name="input"></slot>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: 'KlChatLayout',
}
</script>

<style scoped>
.layout {
    display: flex;
    flex-flow: row nowrap;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
}
.layout__aside {
    width: 25vw;
    border-right: 1px #ebeef5 solid;
    overflow: scroll;
}
.layout__main {
    width: 75vw;
    display: flex;
    flex-flow: column nowrap;
    padding: 1rem;
}
.layout__main__messages {
    flex: 10 0 0;
    overflow: scroll;
}
.layout__main__input {
    flex: 1 0 0;
}
</style>
