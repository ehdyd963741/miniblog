<template>
  <div class="list-wrap">
    <ul>        
      <li v-for="(item,index) in memoItemArr" :key="index" class="shadow">
        {{item}}
        <span class="remove-bt" @click="removeMemo(item, index)">
          <i class="fa-solid fa-trash"></i>
        </span>
      </li> 
    </ul>

  </div>
</template>

<script>
import {ref, reactive} from 'vue';
export default {
  setup() {
    // localstorage 의 목록을 가지고 오기
    // console.log(localStorage);
    // 전체 개수
    const total = ref(0);
    total.value = localStorage.length;
    console.log(total.value);

    // 키네임을 저장하는 배열
    const memoItemArr = reactive([]);
    
    if( total.value > 0) {
      
      for(let i = 0; i < total.value; i++) {
        // 배열에 요소를 밀어넣는다.
        memoItemArr.push(localStorage.key(i));
      }
    }

    const removeMemo = (item, index) => {
      // localstorage 에서 key를 통해서 지운다.
      localStorage.removeItem(item);
      // 배열(memoItemArr) 에서도 지운다.
      memoItemArr.splice(index, 1);
    }
    return {
      memoItemArr,
      removeMemo      
    }

  }
}
</script>

<style scoped>
  li {
    display: flex;
    min-height: 50px;
    line-height: 50px;
    margin: 10px 0;
    background-color: #fff;
    border-radius: 5px;
    padding: 0 10px;
  }
  .remove-bt {
    cursor: pointer;
    margin-left: auto;
    color: hotpink;
    
  }
  .remove-bt i{
    font-size: 14px;
  }
</style>