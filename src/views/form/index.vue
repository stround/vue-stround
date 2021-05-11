<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="Pick a time"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="切换" prop="qh">
        <el-select v-model="form.qh" @change="getqh">
          <el-option label="切换一" value="11" />
          <el-option label="切换二" value="12" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="我是一"
        prop="one"
        v-show="form.qh == 11"
        :rules="{
          required: form.qh == 11 ? true : false,
          message: 'yi',
          trigger: 'blur'
        }"
      >
        <el-input v-model="form.one" />
      </el-form-item>
      <el-form-item
        label="我是二"
        prop="tow"
        v-show="form.qh == 12"
        :rules="{
          required: form.qh == 12 ? true : false,
          message: 'er',
          trigger: 'blur'
        }"
      >
        <el-input v-model="form.tow" />
      </el-form-item>
      <el-form-item label="我是三">
        <el-input readonly v-model="three" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        qh: [{ required: true, message: "请切换", trigger: "change" }]
      }
    };
  },
  computed: {
    three() {
      return this.form.one + 100;
    }
  },
  watch: {
    // 'form.one'(newval,oldval) {
    //   console.log(newval,oldval)
    //   setTimeout(() => {
    //     this.form.tow = 123;
    //     console.log(this.form)
    //   }, 1000);
    // },
    // form:{
    //   handler: function(newval,oldval) {
    //     console.log(newval,oldval)
    //   },
    //   deep: true
    // }
  },
  methods: {
    getqh() {
      console.log(this.form.qh);
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log(this.form);
          this.$message("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
