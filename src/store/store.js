import {
  createStore
} from "vuex";
// 데이터를 불러오는 내용
const storage = {
  getData() {
    const arr = [];
    const total = localStorage.length;
    if (total > 0) {
      for (let i = 0; i < total; i++) {
        // 추후 DB 연동 예정
        let obj = localStorage.getItem(localStorage.key(i));
        arr.push(JSON.parse(obj));
      }
      // 키 값을 이용해서 정렬하기(내림차순)
      arr.sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id === b.id) return 0;
        if (a.id < b.id) return 1;
      });
    }
    return arr;
  }
}
const timeUtil = {
  // 현재 시간값을 계산해서 중복이 되지 않는 값을 처리한다.
  // 용도는 key 와 id 를 생성해 주기 위해서 처리
  // 10보다 작은 값에 0을 붙임
  addZero(n) {
    return n < 10 ? '0' + n : n;
  },
  // 현재 시간을 리턴
  getCurrentDate() {
    let date = new Date();
    return date.getFullYear().toString() + this.addZero(date.getMonth() + 1) + this.addZero(date.getDate()) +
      this.addZero(date.getHours()) + this.addZero(date.getMinutes()) + this.addZero(date.getSeconds());
  },
  getCurrentTime() {
    let date = new Date();
    return date.getFullYear().toString() + '/' + this.addZero(date.getMonth() + 1) + '/' + this.addZero(date.getDate()) +
      '/' +
      this.addZero(date.getHours()) + '/' + this.addZero(date.getMinutes());
  }
}

export default createStore({
  state: {
    headerText: 'My Diary Memo',
    memoItemArr: storage.getData(),
    iconArr: ['dog1.png', 'dog2.png', 'cat.png']
  },

  actions: {},

  mutations: {
    // 대문자로 써주어야 함.
    // 아이템 추가 {item, index}
    ADD_MEMO(state, payload) {

      console.log(payload.item, payload.index);

      // json 저장 문자열
      // {completed:false, title:메모내용, icon:파일명 ...}
      // icon 관련 처리
      let memoTemp = {
        id: timeUtil.getCurrentDate(),
        complete: false,
        memotitle: payload.item,
        memodate: timeUtil.getCurrentTime(),
        memoicon: state.iconArr[payload.index]
      };
      // ***추후 실제 DB 연동 예정***
      localStorage.setItem(memoTemp.id, JSON.stringify(memoTemp));
      // 화면갱신을 위한 배열 요소 추가
      state.memoItemArr.push(memoTemp);
      // 키값을 이용해서 정렬하기(오름차순)
      state.memoItemArr.sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id === b.id) return 0;
        if (a.id < b.id) return 1;
      });
    },

    // 아이템 삭제 (item delete)
    DELETE_MEMO(state, payload) {
      // localstorage 에서 key를 통해서 지운다.
      localStorage.removeItem(payload.item);
      // 배열(memoItemArr) 에서도 지운다.
      state.memoItemArr.splice(payload.index, 1);
      // 키값을 이용해서 정렬하기(오름차순)
      state.memoItemArr.sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id === b.id) return 0;
        if (a.id < b.id) return 1;
      });
    },
    // 아이템 업데이트 및 변경 {item, index}
    UPDATE_MEMO(state, payload) {
      // localstorage 에서는 update 메소드를 지원하지 않습니다.
      // 그래서 key찾아서 지우고 , 다시 set한다.
      // 1.찾아서 지우는 코드
      localStorage.removeItem(payload.item.id);
      // 3.변경하는 코드
      // item.complete = !item.complete;
      // index까지 추가한 컴플리트
      state.memoItemArr[payload.index].complete = !state.memoItemArr[payload.index].complete;
      // 2.다시 set 하는 코드
      localStorage.setItem(payload.item.id, JSON.stringify(payload.item));

      // 키값을 이용해서 정렬하기(오름차순)
      state.memoItemArr.sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id === b.id) return 0;
        if (a.id < b.id) return 1;
      });
    },

    CLEAR_MEMO(state) {
      // 전체 아이템 삭제(all delete)
      // 추후 DB연동 예정
      localStorage.clear();
      state.memoItemArr.splice(0);
    }

  },

  getters: {}
})