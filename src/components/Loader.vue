<template>
    <b-row v-if="$parent.loading" class="justify-content-md-center">
        <b-col cols="2" class="m-5 p-5">
            <b-icon variant="success" icon="circle-fill" animation="throb" font-scale="4"></b-icon>
        </b-col>
    </b-row>
</template>

<script>
export default {
  name:'loader',
}
</script>
