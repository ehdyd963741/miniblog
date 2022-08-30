<template>
  <div class="list-wrap">
    <TransitionGroup name="list" tag="ul">
    <!-- <ul> -->
      <li v-for="(item,index) in memodata" :key="index" class="shadow">
        <i class="fas fa-check-circle check-bt" @click="updateMemo(item, index)"
          :class="{memoComplete:item.complete}"></i>
          <span :class="{memoCompleteTxt:item.complete}">{{item.memotitle}}</span>
        <div class="info">
          <span class="icon" :style="{backgroundImage:'url(' + require(`@/assets/images/${item.memoicon}`) + ')'}"></span>
          <span class="date">{{item.memodate}}</span>
          <span class="remove-bt" @click="removeMemo(item, index)">
            <i class="fas fa-trash"></i>
          </span>
        </div>
      </li>
    <!-- </ul> -->
    </TransitionGroup>
  </div>
</template>

<script>
  export default {
    props: ['memodata'],
    setup(props, context) {
      const removeMemo = (item, index) => {
        context.emit('removeitem', item, index);
      }

      const updateMemo = (item, index) => {
        context.emit("updateitem", item, index);
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
    padding: 0 20px;
  }

  .info {
    margin-left: auto;
  }

  .icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .date {

  }

  .remove-bt {
    cursor: pointer;
    margin-left: 10px;
    color: hotpink;

  }

  .remove-bt i {
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

  .memoCompleteTxt {
    color: red;
    text-decoration: line-through;
  }
  /* 애니메이션 */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>