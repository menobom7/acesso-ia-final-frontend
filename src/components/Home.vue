<template> 
    <div>Home
        <br>
        <button @click="deslogar">Sair</button>
    </div>
</template>

<script>
export default {
    methods: {
        deslogar()
        {
            localStorage.removeItem('dados-usuario-logado');
            this$router.push('/login');
        }
    }
}
</script>

<style></style>