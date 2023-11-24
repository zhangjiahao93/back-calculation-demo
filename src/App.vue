<template>
  <div class="content">
    <div>
      <div>请输入多个数字（一个数字占一行）可以直接从excel列复制</div>
      <textarea rows="15" cols="50" v-model="text"></textarea>
    </div>
    <div>
      <div>请输入上述任意（2个及以上）数的和</div>
      <input v-model="sum" placeholder="请输入上述任意数和" />
    </div>
    <div style="padding:10px 0;"><button @click="compute">计算</button></div>

    <div v-if="filterValues.length > 0">
      <div>结果：{{ filterValues.length+"个"}}</div>
      <ul>
        <li v-for="v in filterValues" :key="v.join(' + ')">{{ v.join(" + ") }} = {{ resSum }}</li>
      </ul>
    </div>
    <div v-if="filterRows.length > 0">
      <div>所在行：</div>
      <ul>
        <li v-for="v in filterRows" :key="v.join(' + ')">第 {{ v.join(" 行, 第 ") }} 行</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BC from "back-calculation";
  function compact(array) {
    let resIndex = 0;
    const result = [];

    if (array == null) {
        return result;
    }

    for (const value of array) {
        if (value) {
            result[resIndex++] = value;
        }
    }
    return result;
}
  export default {
    name: "findNum",
    data() {
      return {
        text: "1\n2\n3\n4\n5\n6\n7\n8\n9\n",
        sum: "20",
        resSum: "",
        filterValues: [],
        filterRows: [],
      };
    },
    created() {
      this.compute();
    },
    methods: {
      compute() {
        this.resSum = this.sum;
        let input = compact(this.text.split("\n")).map((v) => parseFloat(v));
        let sum = parseFloat(this.sum);
        let obj = new BC({ sum, input });
        this.filterValues = obj.getValues();
        if (this.filterValues.length === 0) {
          alert("没有找到对应和！");
        }
        console.log(this.filterValues);
      },
    },
  };
</script>
