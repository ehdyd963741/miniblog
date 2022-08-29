<template>
  <div class="list-wrap">
    <ul>        
      <li v-for="(item,index) in memodata" :key="index" class="shadow">
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

export default {
  props: ['memodata'],
  setup(props, context) {
    
    const removeMemo = (item, index) => {
      context.emit('removeitem',item, index);
    }

    const updateMemo = (item) => {
      context.emit("updateitem",item);
    }

    return {
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