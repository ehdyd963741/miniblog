<template>
  <Transition name="modal">
  <div class="modal-mask" v-if="show">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">Insert Text</slot>   
        </div>
        
        <div class="modal-body">
          <slot name="body">내용을 입력해 주세요</slot>
        </div>

        <div class="modal-footer">
          <button class="modal-default-button" @click="closeFn">OK</button>
        </div>

      </div>
    </div>
  </div>
  </Transition>
</template>

<script>
export default {
  props: ['show'],

  setup (props, context){
    const closeFn = () => {
      context.emit("closemodal")
    }
    return {
      closeFn
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.33);
  transition: all 0.3s ease;
}
.modal-header {
  margin-top: 0;
  color: skyblue;
}
.modal-body {
  margin: 20px 0;
  color: #e20303;
}
.modal-footer {
  margin: 0;
}
.modal-default-button {
  display: block;
  cursor: pointer;
  color: #e20303;
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  border-radius: 5px;
  margin: 20px auto;
  border: 1px solid #203030;
}
/* 애니메이션 관련 코드 */
.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>