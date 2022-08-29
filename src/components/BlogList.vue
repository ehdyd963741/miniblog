<template>
  <div class="list-wrap">
    <ul>        
      <li v-for="(item,index) in memoItemArr" :key="index" class="shadow">
        <i class="fas fa-check-circle check-bt" @click="updateMemo(item)" :class="{memoComplete:item.complete}"></i>

        <span :class="{memoCompleteTxt:item.complete}">{{item.memotitle}}</span> 

        <span class="remove-bt" @click="removeMemo(item, index)">
          <i class="fas fa-trash"></i>
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


    // 키네임을 저장하는 배열
    const memoItemArr = reactive([]);
    
    if( total.value > 0) {
      
      for(let i = 0; i < total.value; i++) {
        // 배열에 요소를 밀어넣는다.
        // 키값도 필요하지만, 실제 내용(값)이 필요하다.
        // 추후 DB 연동 예정
        let obj = localStorage.getItem( localStorage.key(i) );
        // console.log(obj);
        memoItemArr.push(JSON.parse(obj));
      }
      // 키값을 이용해서 정렬하기(오름차순)
      // memoItemArr.sort();
    }

    const removeMemo = (item, index) => {
      // localstorage 에서 key를 통해서 지운다.
      localStorage.removeItem(item);
      // 배열(memoItemArr) 에서도 지운다.
      memoItemArr.splice(index, 1);
    }

    const updateMemo = (item) => {
      // localstorage 에서는 update 메소드를 지원하지 않습니다.
      // 그래서 key찾아서 지우고 , 다시 set한다.
      // 1.찾아서 지우는 코드
      localStorage.removeItem(item.id);
      // 3.변경하는 코드
      item.complete = !item.complete;
      // 2.다시 set 하는 코드
      localStorage.setItem(item.id, JSON.stringify(item));
    }

    return {
      memoItemArr,
      removeMemo,
      updateMemo      
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

  .check-bt {
    color: #b3adad;
    line-height: 35px;
    margin-right: 5px;
    cursor: pointer;
  }

  .memoComplete {
    color: #62acde;
   
  }

  .memoCompleteTxt{
    color: red;
    text-decoration: line-through;
  }
</style>