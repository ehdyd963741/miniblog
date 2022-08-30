<template>
  <div class="input-wrap shadow">
    <input type="text" v-model="newItem" class="input-box" maxlength="30" @keyup.enter="addItem">

    <div class="option">
      <span @click="addIcon(0)" class="img1">
        이미지1
      </span>
      <span @click="addIcon(1)" class="img2">
        이미지2
      </span>
      <span @click="addIcon(2)" class="img3">
        이미지3
      </span>

      <span @click="addItem" class="add-bt">
        <i class="fas fa-plus add-bt-icon"></i>
      </span>
    </div>
    <!-- 안내창 -->
    <ModalView :show="showModal" @closemodal="showModal=false">
      <template #header>
        <h3>Warning</h3>
      </template>
      <template #body>
        <h3>내용을 작성해 주십쇼</h3>
      </template>
    </ModalView>


  </div>
</template>

<script>
  import {
    ref
  } from 'vue';

  import {
    useStore
  } from 'vuex';

  import ModalView from '@/components/common/ModalVue.vue'

  export default {
    components: {
      ModalView
    },

    setup() {
      const store = useStore();

      const newItem = ref('');
      const newIcon = ref(0);
      const showModal = ref(false);

      const addItem = () => {
        let temp = newItem.value;
        let icon = newIcon.value;
        // 앞쪽 뒷쪽 공백 제거
        temp = temp.trim();
        // 추후 업데이트 예정
        if (temp !== '') {
          // context.emit("additem", temp, icon);
          store.commit('ADD_MEMO', {item:temp, index:icon});

          resetItem();
        } else {
          showModal.value = true;
        }
      }

      const resetItem = () => {
        // 내용 재설정
        newItem.value = '';
      }

      const addIcon = (index) => {
        newIcon.value = index;
      }

      return {
        newItem,
        addItem,
        addIcon,
        showModal
      }
    }
  }
</script>

<style scoped>
  .input-wrap {
    position: relative;
    display: block;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    background-color: #fff;
    overflow: hidden;
    margin: 20px 0;
  }

  .input-wrap input {
    border-style: none;
  }

  .input-wrap input:focus {
    outline: none;
  }

  .input-box {
    width: calc(93% - 250px);
    font-size: 16px;
    margin-left: 10px;

  }

  .option {
    position: absolute;
    display: block;
    right: 0;
    top: 0;
  }

  .img1:active,
  .img2:active,
  .img3:active {
    outline: 1px solid red;
  }

  .img1 {
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: 0;
    cursor: pointer;
    background: url('@/assets/images/dog1.png') no-repeat center;
    background-size: cover;
  }

  .img2 {
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: 0;
    cursor: pointer;
    background: url('@/assets/images/dog2.png') no-repeat center;
    background-size: cover;
  }

  .img3 {
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: 0;
    cursor: pointer;
    background: url('@/assets/images/cat.png') no-repeat center;
    background-size: cover;
  }

  .add-bt {
    display: inline-block;
    background-color: hotpink;
    cursor: pointer;
  }

  .add-bt-icon {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    cursor: pointer;
    margin: 0 20px;
  }
</style>